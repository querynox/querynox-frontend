import { createRoute } from "@tanstack/react-router";
import { rootRoute } from  "@/router/route";
import Chat from "@/pages/newchat/Chat";

export const chatRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/chat',
  component: Chat
  },
);