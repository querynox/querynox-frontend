import { createRoute } from '@tanstack/react-router'
import { shareRoute } from './share.route'
import ShareChat from '@/pages/share/ShareChat'

export const shareIdRoute = createRoute({
  getParentRoute: () => shareRoute,
  path: '$chatId',
  component: () => <ShareChat />,
})
