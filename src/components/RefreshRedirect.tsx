'use client'

import { useEffect } from 'react'

export default function RefreshRedirect() {
  useEffect(() => {
    // Handle page refresh and navigation
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Save current scroll position
      sessionStorage.setItem('scrollPosition', window.scrollY.toString())
    }

    const handleLoad = () => {
      // Restore scroll position if exists
      const savedPosition = sessionStorage.getItem('scrollPosition')
      if (savedPosition) {
        const position = parseInt(savedPosition, 10)
        window.scrollTo(0, position)
        sessionStorage.removeItem('scrollPosition')
      }
    }

    // Handle navigation entries
    const handleNavigation = () => {
      const navEntries = performance.getEntriesByType('navigation')
      const navigationType = navEntries.length > 0 
        ? (navEntries[0] as PerformanceNavigationTiming).type 
        : null

      // Clear session storage on fresh page load (not reload)
      if (navigationType === 'navigate') {
        const pathname = window.location.pathname
        
        // Only clear intro state for homepage
        if (pathname === '/') {
          sessionStorage.removeItem('introPlayed')
          sessionStorage.removeItem('heroPlayed')
        }
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('load', handleLoad)
    
    // Run navigation check after load
    if (document.readyState === 'complete') {
      handleNavigation()
    } else {
      window.addEventListener('load', handleNavigation)
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('load', handleLoad)
    }
  }, [])

  return null // This component doesn't render anything
}
