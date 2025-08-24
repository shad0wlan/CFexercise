import { cookies } from "next/headers";
import { routes } from "@/lib/constants/routes";
import { jwtDecode } from "jwt-decode";

import {
  NextFetchEvent,
  NextResponse,
  NextMiddleware,
  NextRequest,
} from "next/server";

import { MiddlewareFactory } from "@/lib/types/middleware";
import { DecodedToken } from "@/app/login/_lib/types/token";
import userRoleAction from "@/lib/actions/user/user-role-action";
import isAuthenticatedAction from "@/lib/actions/user/is-authenticated-action";

const notAccessibleRoutes = [routes.login];

function logout(request: NextRequest) {
  request.cookies.delete("accessToken");
  request.cookies.delete("user");
  const response = NextResponse.redirect(new URL(routes.login, request.url));

  response.cookies.delete("accessToken");
  response.cookies.delete("user");
  return response;
}

export const withAuth: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const isAuthenticated = await isAuthenticatedAction();
    // Check if user is logged in
    if (isAuthenticated) {
      const userRole = await userRoleAction();
      // Check if user is trying to access a route that is not accessible when logged in
      if (userRole && notAccessibleRoutes.includes(request.nextUrl.pathname)) {
        // Redirect to home page based on user role
        return NextResponse.redirect(new URL(routes.home, request.url));
      }
    }

    // Check if user is not logged in and trying to access a route that requires authentication
    if (!isAuthenticated && request.nextUrl.pathname !== routes.login) {
      return NextResponse.redirect(new URL(routes.login, request.url));
    }

    const accessToken = cookies().get("accessToken")?.value;

    if (accessToken) {
      try {
        const decodedToken: DecodedToken = jwtDecode(accessToken);
        // Check if token is expired and logoutAction if it is
        if (decodedToken.exp * 1000 < Date.now()) {
          return logout(request);
        }
      } catch (error) {
        // If token is invalid, logoutAction
        return logout(request);
      }
    }
  };
};
