// Smart navigation state management
export const hasPlayedIntro = (): boolean => {
  if (typeof window === 'undefined') return false
  return sessionStorage.getItem('introPlayed') === 'true'
}

export const setIntroPlayed = (): void => {
  if (typeof window === 'undefined') return
  sessionStorage.setItem('introPlayed', 'true')
}

export const clearIntroState = (): void => {
  if (typeof window === 'undefined') return
  sessionStorage.removeItem('introPlayed')
  sessionStorage.removeItem('heroPlayed')
}

export const hasPlayedHero = (): boolean => {
  if (typeof window === 'undefined') return false
  return sessionStorage.getItem('heroPlayed') === 'true'
}

export const setHeroPlayed = (): void => {
  if (typeof window === 'undefined') return
  sessionStorage.setItem('heroPlayed', 'true')
}
