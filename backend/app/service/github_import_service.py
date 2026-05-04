import base64
import re
from urllib.parse import urlparse
import httpx
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from ..core.config import get_settings
from ..schema.github_import import GitHubImportRequest
from ..schema.project import ProjectCreate
from .project_service import ProjectService


class GitHubImportService:
    def __init__(self) -> None:
        self.project_service = ProjectService()

    def import_project(self, db: Session, payload: GitHubImportRequest):
        owner, repo = self._parse_repo_url(str(payload.repo_url))
        readme = self._fetch_readme(owner, repo)
        project_payload = self._parse_readme(owner, repo, readme)
        return self.project_service.create(db, project_payload)

    def _parse_repo_url(self, repo_url: str) -> tuple[str, str]:
        parsed = urlparse(repo_url)
        parts = [part for part in parsed.path.strip("/").split("/") if part]
        if parsed.netloc.lower() != "github.com" or len(parts) < 2:
            raise HTTPException(status_code=422, detail="repoUrl must be a GitHub repository URL.")
        return parts[0], parts[1].removesuffix(".git")

    def _fetch_readme(self, owner: str, repo: str) -> str:
        settings = get_settings()
        headers = {"Accept": "application/vnd.github+json"}
        if settings.github_token:
            headers["Authorization"] = f"Bearer {settings.github_token}"

        try:
            response = httpx.get(f"https://api.github.com/repos/{owner}/{repo}/readme", headers=headers, timeout=10)
        except httpx.HTTPError as exc:
            raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="Failed to fetch GitHub README.") from exc

        if response.status_code == 404:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="README not found for this repository.")
        if response.status_code >= 400:
            raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="GitHub API returned an error.")

        content = response.json().get("content")
        if not content:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="README content is empty.")
        return base64.b64decode(content).decode("utf-8", errors="replace")

    def _parse_readme(self, owner: str, repo: str, readme: str) -> ProjectCreate:
        title_match = re.search(r"^#\s+(.+)$", readme, flags=re.MULTILINE)
        title = title_match.group(1).strip() if title_match else repo
        lines = [line.strip() for line in readme.splitlines() if line.strip() and not line.startswith("#")]
        summary = lines[0][:240] if lines else f"Imported from GitHub repository {owner}/{repo}."
        tech_stack = self._parse_list_section(readme, ["tech stack", "技术栈", "technologies"]) or ["GitHub README"]
        features = self._parse_list_section(readme, ["features", "功能", "core features"]) or ["README imported project draft"]

        return ProjectCreate(
            slug=repo.lower().replace("_", "-"),
            title=title,
            type="GitHub Imported Project",
            summary=summary,
            overview=summary,
            role=[],
            features=features,
            stack=tech_stack,
            challenges=[],
            result="Imported from GitHub README. Edit details through the write API.",
            coverDoodle="/images/doodles/browser-plant.png",
            githubUrl=f"https://github.com/{owner}/{repo}",
            featured=False,
            sortOrder=0,
            isPublished=True,
        )

    def _parse_list_section(self, readme: str, headings: list[str]) -> list[str]:
        pattern = r"^#{2,3}\s+(.+)$"
        matches = list(re.finditer(pattern, readme, flags=re.MULTILINE | re.IGNORECASE))
        for index, match in enumerate(matches):
            heading = match.group(1).strip().lower()
            if not any(label in heading for label in headings):
                continue
            start = match.end()
            end = matches[index + 1].start() if index + 1 < len(matches) else len(readme)
            section = readme[start:end]
            items = re.findall(r"^\s*[-*]\s+(.+)$", section, flags=re.MULTILINE)
            return [item.strip() for item in items[:8]]
        return []
