import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface DeviceInfo {
  userAgent: string;
  screenWidth: number;
  screenHeight: number;
  windowWidth: number;
  windowHeight: number;
  isMobile: boolean;
  hasTouchScreen: boolean;
  platform: string;
  orientation: string;
}

const MobileDebug = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const updateDeviceInfo = () => {
      setDeviceInfo({
        userAgent: navigator.userAgent,
        screenWidth: screen.width,
        screenHeight: screen.height,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        isMobile: isMobile,
        hasTouchScreen: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
        platform: navigator.platform,
        orientation: screen.orientation ? screen.orientation.type : 'unknown'
      });
    };

    updateDeviceInfo();

    // Update on resize and orientation change
    window.addEventListener('resize', updateDeviceInfo);
    window.addEventListener('orientationchange', updateDeviceInfo);

    return () => {
      window.removeEventListener('resize', updateDeviceInfo);
      window.removeEventListener('orientationchange', updateDeviceInfo);
    };
  }, [isMobile]);

  // Show debug panel with triple tap (mobile) or Ctrl+Shift+D (desktop)
  useEffect(() => {
    let tapCount = 0;
    let tapTimer: NodeJS.Timeout;

    const handleTap = () => {
      tapCount++;
      clearTimeout(tapTimer);
      tapTimer = setTimeout(() => {
        if (tapCount >= 3) {
          setIsVisible(!isVisible);
        }
        tapCount = 0;
      }, 500);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        setIsVisible(!isVisible);
      }
    };

    document.addEventListener('touchstart', handleTap);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('touchstart', handleTap);
      document.removeEventListener('keydown', handleKeyDown);
      clearTimeout(tapTimer);
    };
  }, [isVisible]);

  if (!isVisible || !deviceInfo) return null;

  return (
    <div className="fixed top-4 right-4 z-[9999] bg-black/90 text-white p-4 rounded-lg text-xs max-w-[300px] max-h-[400px] overflow-auto">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">Mobile Debug</h3>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-white hover:text-red-300"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-1">
        <div><strong>Is Mobile:</strong> {deviceInfo.isMobile ? 'Yes' : 'No'}</div>
        <div><strong>Touch Screen:</strong> {deviceInfo.hasTouchScreen ? 'Yes' : 'No'}</div>
        <div><strong>Window:</strong> {deviceInfo.windowWidth} x {deviceInfo.windowHeight}</div>
        <div><strong>Screen:</strong> {deviceInfo.screenWidth} x {deviceInfo.screenHeight}</div>
        <div><strong>Platform:</strong> {deviceInfo.platform}</div>
        <div><strong>Orientation:</strong> {deviceInfo.orientation}</div>
        <div><strong>User Agent:</strong> 
          <div className="text-xs mt-1 break-all">{deviceInfo.userAgent}</div>
        </div>
      </div>
      
      <div className="mt-3 text-xs text-gray-300">
        Desktop: Ctrl+Shift+D to toggle<br/>
        Mobile: Triple tap to toggle
      </div>
    </div>
  );
};

export default MobileDebug;
