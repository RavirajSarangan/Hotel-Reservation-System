import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/api/webhooks/(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/about',
  '/contact',
  '/rooms',
  '/services',
  '/gallery',
  '/blog(.*)',
  '/home-video',
  '/home-1',
  '/home-2',
  '/home-3',
  '/home-4',
  '/home-5',
  '/home-6',
  '/home-7',
  '/home-dark',
  '/api/chatbot',
])

const isAdminRoute = createRouteMatcher([
  '/admin(.*)',
])

const isClerkRoute = createRouteMatcher([
  '/clerk(.*)',
])

export default clerkMiddleware((auth, req) => {
  // Allow access to public routes without authentication
  if (isPublicRoute(req)) return

  // Protect clerk routes
  if (isClerkRoute(req)) {
    auth().protect()
    return
  }

  // Protect admin routes - require admin, manager, or receptionist role
  if (isAdminRoute(req)) {
    auth().protect((has) => {
      return has({ role: 'super_admin' }) || 
             has({ role: 'manager' }) || 
             has({ role: 'receptionist' }) ||
             has({ role: 'admin' })
    })
    return
  }

  // Protect all other routes
  auth().protect()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}