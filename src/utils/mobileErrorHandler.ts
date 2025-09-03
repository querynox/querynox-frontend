// Mobile error handler to catch and display errors on mobile devices
export const initMobileErrorHandler = () => {
  // Only enable in development when client is actual phone
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (import.meta.env.DEV && isMobile) {
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;
    
    // Create error display element
    const createErrorDisplay = () => {
      const errorDiv = document.createElement('div');
      errorDiv.id = 'mobile-error-display';
      errorDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: red;
        color: white;
        padding: 10px;
        font-size: 12px;
        z-index: 10000;
        max-height: 200px;
        overflow-y: auto;
        display: none;
      `;
      document.body.appendChild(errorDiv);
      return errorDiv;
    };
    
    let errorDisplay: HTMLElement | null = null;
    let errorCount = 0;
    
    const showError = (message: string, type: 'error' | 'warn' = 'error') => {
      if (!errorDisplay) {
        errorDisplay = createErrorDisplay();
      }
      
      errorCount++;
      const timestamp = new Date().toLocaleTimeString();
      const errorMsg = `[${timestamp}] ${type.toUpperCase()}: ${message}`;
      
      if (errorDisplay) {
        errorDisplay.style.display = 'block';
        errorDisplay.innerHTML += `<div style="border-bottom: 1px solid rgba(255,255,255,0.3); padding: 5px 0;">${errorMsg}</div>`;
        errorDisplay.scrollTop = errorDisplay.scrollHeight;
        
        // Auto-hide after 10 seconds if no new errors
        setTimeout(() => {
          if (errorDisplay && errorCount <= 5) {
            errorDisplay.style.display = 'none';
          }
        }, 10000);
      }
    };
    
    // Override console methods
    console.error = (...args) => {
      originalConsoleError.apply(console, args);
      showError(args.join(' '), 'error');
    };
    
    console.warn = (...args) => {
      originalConsoleWarn.apply(console, args);
      const message = args.join(' ');
      // Filter out expected development warnings
      if (!message.includes('Clerk has been loaded with development keys') && 
          !message.includes('development instances have strict usage limits')) {
        showError(message, 'warn');
      }
    };
    
    // Global error handler
    window.addEventListener('error', (event) => {
      showError(`${event.message} at ${event.filename}:${event.lineno}:${event.colno}`, 'error');
    });
    
    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      showError(`Unhandled Promise Rejection: ${event.reason}`, 'error');
    });
    

  }
};
