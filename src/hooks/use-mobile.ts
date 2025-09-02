import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const checkMobile = () => {
      // Multiple detection methods for better accuracy
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
      const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
      const isMobileScreen = window.innerWidth < MOBILE_BREAKPOINT
      const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      
      // Consider it mobile if any of these conditions are true
      return isMobileUserAgent || (isMobileScreen && hasTouchScreen) || isMobileScreen
    }

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(checkMobile())
    }
    
    mql.addEventListener("change", onChange)
    setIsMobile(checkMobile())
    
    // Also listen for orientation changes on mobile
    const handleOrientationChange = () => {
      setTimeout(() => {
        setIsMobile(checkMobile())
      }, 100)
    }
    
    window.addEventListener("orientationchange", handleOrientationChange)
    
    return () => {
      mql.removeEventListener("change", onChange)
      window.removeEventListener("orientationchange", handleOrientationChange)
    }
  }, [])

  return !!isMobile
}
