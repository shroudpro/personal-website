import { computed, ref } from 'vue'
import { messages, type Locale } from '../i18n/messages'

const LOCALE_STORAGE_KEY = 'portfolio-locale'
const locale = ref<Locale>(readInitialLocale())

function readInitialLocale(): Locale {
  if (typeof window === 'undefined') {
    return 'zh'
  }

  const savedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY)
  return savedLocale === 'en' ? 'en' : 'zh'
}

export function useLocale() {
  const t = computed(() => messages[locale.value])

  function toggleLocale(): void {
    locale.value = locale.value === 'zh' ? 'en' : 'zh'
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale.value)
  }

  return {
    locale,
    t,
    toggleLocale,
  }
}
