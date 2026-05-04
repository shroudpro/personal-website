import { fetchJson } from './client'
import type { AchievementItem } from '../data/achievements'
import type { ExperienceItem } from '../data/experiences'
import type { ProjectItem } from '../data/projects'

export async function fetchExperiences(): Promise<ExperienceItem[]> {
  return fetchJson<ExperienceItem[]>('/api/experiences')
}

export async function fetchProjects(): Promise<ProjectItem[]> {
  return fetchJson<ProjectItem[]>('/api/projects')
}

export async function fetchProject(slug: string): Promise<ProjectItem> {
  return fetchJson<ProjectItem>(`/api/projects/${slug}`)
}

export async function fetchAchievements(): Promise<AchievementItem[]> {
  return fetchJson<AchievementItem[]>('/api/achievements')
}
