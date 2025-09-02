
import './styles.css'

import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals.ts'
import App from './App.tsx'
import { initMobileErrorHandler } from './utils/mobileErrorHandler.ts'

// Initialize mobile error handler for debugging
initMobileErrorHandler();


const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<App />)
}

reportWebVitals()
