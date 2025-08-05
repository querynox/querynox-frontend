import { createRoute } from "@tanstack/react-router";
import { chatRoute } from "@/router/routes/chat.route";
import Chat from "@/pages/chat/Chat";

export const chatIdRoute = createRoute({
  getParentRoute: () => chatRoute,
  path: '$chatId',
  component: Chat,
});
