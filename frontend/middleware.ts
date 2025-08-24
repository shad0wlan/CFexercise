import { withAuth } from "@/lib/middlewares/withAuth";
import { stackMiddlewares } from "@/lib/middlewares/stackedMiddlewares";

const middleware = [withAuth];
export default stackMiddlewares(middleware);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.png (favicon file)
     * - images (image files)
     * - manifest.json (PWA manifest)
     * - sw.js (service worker)
     * - workbox-*.js (PWA files)
     * - icon (icon files)
     */
    "/((?!api|_next/static|_next/image|favicon.png|images|manifest.json|sw.js|workbox-.*|icon).*)",
  ],
};
