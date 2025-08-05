import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "@/router/route";
import Chat from "@/pages/chat/Chat";
import { SidebarProvider } from "@/components/ui/sidebar";

export const chatRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/chat',
  component: () =>   <SidebarProvider><Chat/></SidebarProvider>,
});