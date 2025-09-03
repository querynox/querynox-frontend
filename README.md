# QueryNOX

 **Next-Generation AI Chat Platform** - Where cutting-edge technology meets beautiful design

![First Image](https://github.com/SohamJoshi25/QueryNOX/raw/main/firstimage.png)
![Second Image](https://github.com/SohamJoshi25/QueryNOX/raw/main/secondimage.png)
![Third Image](https://github.com/SohamJoshi25/QueryNOX/raw/main/thirdimage.png)


QueryNOX is a sophisticated, multi-modal AI chat application that brings together the latest in web technology to deliver an unparalleled conversational AI experience. Built with modern React architecture and mobile-first design principles.

## What Makes QueryNOX Special

**Multi-Provider AI Integration** - Seamlessly switch between OpenAI, Claude, Gemini, and more  
**Real-Time Streaming** - Watch AI responses unfold in real-time with Server-Sent Events  
**Mobile-First Design** - Pixel-perfect experience across all devices and browsers  
**Dynamic Theming** - Beautiful dark/light modes with smooth transitions  
**Advanced File Support** - Upload and process documents, images, and multimedia  
**Web Search Integration** - AI-powered responses with real-time web data  
**Lightning Fast** - Optimized performance with advanced caching and lazy loading  

## Technical Architecture

### **Core Framework Stack**
- **React 19** - Latest features with concurrent rendering
- **TypeScript 5.7** - Full type safety with advanced inference  
- **Vite 6** - Lightning-fast development with HMR
- **Tailwind CSS v4** - Next-gen utility-first styling

### **State Management & Routing**
- **TanStack Router v1.121** - Type-safe routing
- **TanStack Query v5** - Server state management
- **React Context API** - Multi-layered global state
- **Custom Hooks** - Advanced dependency management

### **Design System & UI**
- **Radix UI Primitives** - Accessible component foundation
- **Custom Component Library** - 15+ purpose-built components
- **CSS Custom Properties** - Dynamic theming system
- **Advanced Animations** - Smooth CSS transitions

## Mobile Excellence

QueryNOX implements industry-leading mobile optimizations:

### **Advanced Mobile Detection**
```typescript
const checkMobile = () => {
  const userAgent = navigator.userAgent || navigator.vendor
  const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
  const isMobileScreen = window.innerWidth < MOBILE_BREAKPOINT
  const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  
  return isMobileUserAgent || (isMobileScreen && hasTouchScreen) || isMobileScreen
}
```

### **Mobile-Specific Features**
- **Touch Optimization** - `-webkit-touch-callout`, `touch-action`, tap highlight removal
- **Viewport Handling** - Dynamic viewport height (`100dvh`) for mobile browsers
- **Safe Area Support** - iPhone notch and Android navigation bar compatibility
- **Orientation Handling** - Seamless landscape/portrait transitions
- **Performance Tuning** - `-webkit-overflow-scrolling: touch` for smooth scrolling

## Advanced Browser Compatibility

### **Universal UUID Generation**
```typescript
export const generateUUID = (): string => {
  // Native support (modern browsers)
  if (hasNativeCryptoUUID()) return crypto.randomUUID()
  
  // Crypto fallback (most mobile browsers)
  if (crypto.getRandomValues) return generateCryptoUUID()
  
  // Math.random fallback (universal compatibility)
  return generateFallbackUUID()
}
```

### **Progressive Enhancement**
- **Feature Detection** - Graceful degradation for older browsers
- **Error Boundaries** - Comprehensive error handling with user-friendly fallbacks
- **Mobile Debug Tools** - Real-time error tracking and device info display

## Performance Engineering

### **Code Splitting & Lazy Loading**
```typescript
const Chat = lazy(() => import('@/pages/chat/Chat'))
const Home = lazy(() => import('@/pages/home/Home'))
```

### **Advanced Caching**
- **TanStack Query** - Intelligent cache invalidation and background updates
- **React Suspense** - Smooth loading states with fallback components
- **Memoization** - Strategic use of `useMemo` and `useCallback`

### **Bundle Optimization**
- **Tree Shaking** - Eliminate dead code automatically
- **Asset Optimization** - Automatic image compression
- **HTTP/2 Push** - Preload critical resources

## Advanced Styling Architecture

### **CSS-in-JS with Tailwind**
```css
/* Dynamic viewport handling */
.h-screen {
  height: 100vh;
  height: 100dvh; /* Mobile-optimized */
}

/* Custom scrollbars */
.thin-scrollbar::-webkit-scrollbar {
  width: 8px;
}
```

### **Design Token System**
- **CSS Custom Properties** - 50+ design tokens for consistent theming
- **Color Space Optimization** - OKLCH color space for better accuracy
- **Responsive Typography** - Fluid type scales with clamp() functions

## Real-Time Features

### **Server-Sent Events**
```typescript
export const useStreamSSE = () => {
  const eventSource = new EventSource(streamEndpoint)
  
  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data)
    setStreamingResponse(prev => prev + data.content)
  }
}
```

### **Features**
- **SSE Implementation** - Lightweight streaming without WebSocket complexity
- **Automatic Reconnection** - Robust connection handling
- **Message Queuing** - Handle connection drops gracefully

---

**Built by the QueryNOX Team**

*Where AI meets exceptional engineering*
