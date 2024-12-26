import { NextResponse } from "next/server";

export function middleware(request) {
  const url = new URL(request.url);
  const authCookie = request.cookies.get("auth")?.value;
  const extraTimeCookie = request.cookies.get("extraTime")?.value;

  // If auth cookie is missing and not on login or register page, redirect to login
  if (!authCookie) {
    if (
      url.pathname !== "/login" &&
      url.pathname !== "/register" &&
      !url.pathname.startsWith("/user")
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  try {
    // Check if extraTime exists and validate expiration
    if (extraTimeCookie) {
      const extraTime = new Date(extraTimeCookie).getTime();
      if (Date.now() > extraTime) {
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("auth");
        response.cookies.delete("extraTime");
        return response;
      }
    }

    // Extract role from auth cookie
    const { Role: role } = JSON.parse(authCookie);

    // Redirect based on role
    if (url.pathname === "/login") {
      if (role === "admin") {
        return NextResponse.redirect(new URL("/admin", request.url));
      } else if (role === "user") {
        return NextResponse.redirect(new URL("/user", request.url));
      }
    }

    if (url.pathname === "/") {
      if (role === "admin") {
        return NextResponse.redirect(new URL("/admin", request.url));
      } else if (role === "user") {
        return NextResponse.redirect(new URL("/user", request.url));
      } else {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }

    if (url.pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } catch (error) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("auth");
    response.cookies.delete("extraTime");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/admin/:path*", "/user/:path*", "/"],
};
