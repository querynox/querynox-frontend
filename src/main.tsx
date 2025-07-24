import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { Provider as TanStackQueryProvider } from "@/integrations/tanstack-query/root-provider.tsx"
import { router } from "@/router/route.tsx"
import { ClerkProvider } from '@clerk/clerk-react'
import './styles.css'
import reportWebVitals from './reportWebVitals.ts'
import { SidebarProvider } from './components/ui/sidebar.tsx'

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <TanStackQueryProvider>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <SidebarProvider >
              <RouterProvider router={router} />
            </SidebarProvider>
        </ClerkProvider>
      </TanStackQueryProvider>
    </StrictMode>,
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
