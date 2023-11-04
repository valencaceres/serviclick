import { authMiddleware, redirectToSignIn } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

type UserRole = "user" | "moderator" | "admin";

const roles: Record<UserRole, RegExp[]> = {
  user: [/^\/$/, /^\/case(\/.*)?$/, /^\/assistance(\/.*)?$/],
  moderator: [/^\/$/, /^\/case(\/.*)?$/, /^\/$/, /^\/assistance(\/.*)?$/],
  admin: [
    /^\/$/,
    /^\/case(\/.*)?$/,
    /^\/assistance(\/.*)?$/,
    /^\/masters(\/.*)?$/,
    /^\/entities(\/.*)?$/,
    /^\/dashboard(\/.*)?$/,
    /^\/uploads-insured(\/.*)?$/,
  ],
};

export default authMiddleware({
  publicRoutes: ["/sign-in/[[...index]]", "/unauthorized"],
  afterAuth(auth, req, evt) {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    if (auth.isPublicRoute) {
      return NextResponse.next();
    }

    const userRoles = (auth.sessionClaims as any).publicMeta?.roles;
    if (!userRoles) {
      if (req.nextUrl.pathname !== "/unauthorized") {
        const redirectURL = new URL("/unauthorized", req.url);
        return NextResponse.redirect(redirectURL);
      }
    } else {
      // Check if user has the "operaciones" role and the required permission for it
      const userRoleInOperaciones = userRoles["operaciones"];
      if (userRoleInOperaciones && roles[userRoleInOperaciones as UserRole]) {
        const rolePermissions = roles[userRoleInOperaciones as UserRole];
        for (const permission of rolePermissions) {
          if (permission.test(req.nextUrl.pathname)) {
            return NextResponse.next();
          }
        }
      }
    }

    // If user's role doesn't provide access to the route, redirect to unauthorized page
    if (req.nextUrl.pathname !== "/unauthorized") {
      const redirectURL = new URL("/unauthorized", req.url);
      return NextResponse.redirect(redirectURL);
    }
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
