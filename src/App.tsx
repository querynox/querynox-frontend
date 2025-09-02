import { StrictMode } from 'react'
import { RouterProvider } from '@tanstack/react-router'
import { Provider as TanStackQueryProvider } from "@/integrations/tanstack-query/root-provider.tsx"
import { router } from "@/router/route.tsx"

import { ClerkProvider } from '@clerk/clerk-react'
import { ChatProvider } from './contexts/ChatContext.tsx'
import { SystemProvider, useSystemContext } from './contexts/SystemContext.tsx'
import { dark } from '@clerk/themes'
import { UserProvider } from './contexts/UserContext.tsx'
import MobileDebug from './components/MobileDebug.tsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const InnerApp = () => {
  const { darkmode } = useSystemContext();

  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      appearance={{ baseTheme: darkmode ? dark : undefined }}
    >
      <ChatProvider>
        <UserProvider>
          <RouterProvider router={router} />
          <MobileDebug />
        </UserProvider>
      </ChatProvider>
    </ClerkProvider>
  );
};

const App = () => (
  <StrictMode>
    <SystemProvider>
      <TanStackQueryProvider>
        <InnerApp />
      </TanStackQueryProvider>
    </SystemProvider>
  </StrictMode>
);

export default App;
