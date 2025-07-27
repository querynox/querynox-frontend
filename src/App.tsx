import { StrictMode } from 'react'
import { RouterProvider } from '@tanstack/react-router'
import { Provider as TanStackQueryProvider } from "@/integrations/tanstack-query/root-provider.tsx"
import { router } from "@/router/route.tsx"

import { ClerkProvider } from '@clerk/clerk-react'
import { SidebarProvider } from './components/ui/sidebar.tsx'
import { ChatProvider } from './contexts/ChatContext.tsx'
import { SystemProvider, useSystemContext } from './contexts/SystemContext.tsx'
import { dark } from '@clerk/themes'

import { Toaster } from 'react-hot-toast';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const InnerApp = () => {
  const { darkmode } = useSystemContext();

  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      appearance={{ baseTheme: darkmode ? dark : undefined }}
    >
      <ChatProvider>
        <SidebarProvider>
          <RouterProvider router={router} />
        </SidebarProvider>
      </ChatProvider>
    </ClerkProvider>
  );
};

const App = () => (
  <StrictMode>
    <SystemProvider>
      <TanStackQueryProvider>
        <Toaster />
        <InnerApp />
      </TanStackQueryProvider>
    </SystemProvider>
  </StrictMode>
);

export default App;
