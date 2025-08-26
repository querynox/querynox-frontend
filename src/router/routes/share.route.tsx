import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '@/router/route'

export const shareRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'share',
})
