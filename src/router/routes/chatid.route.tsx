import { createRoute } from "@tanstack/react-router";
import Chat from "@/pages/chat/Chat";
import { rootRoute } from "../route";

export const chatIdRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/chat/$chatId',
  component: Chat
  },
);