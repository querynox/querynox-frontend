import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "@/router/route";
import Chat from "@/pages/chat/Chat";

export const chatRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/chat',
  component: Chat
});