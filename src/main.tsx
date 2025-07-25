
import './styles.css'

import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals.ts'
import App from './App.tsx'


const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<App />)
}

reportWebVitals()
