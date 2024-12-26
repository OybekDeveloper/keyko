"use client";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Navbar from "./navbar";
import React, { useEffect, useLayoutEffect, useState } from "react";
import NavbarAdmin from "./navbarAdmin";
import axios from "axios";
import Link from "next/link";

const Header = () => {
  const pathname = usePathname();
  const [updateNavbar, setUpdateNavbar] = useState(false);
  const [screenSize, setScreenSize] = useState(1550);

  function scrollHandler() {
    if (window.scrollY >= 20) {
      setUpdateNavbar(true);
    } else {
      setUpdateNavbar(false);
    }
  }

  function resizeHandler() {
    setScreenSize(window.innerWidth);
  }

  useLayoutEffect(() => {
    setScreenSize(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
      window.removeEventListener("resize", scrollHandler);
    };
  }, []);
  return (
    <header
      className={cn(
        pathname.startsWith("/login") || pathname.startsWith("/register")
          ? "relative bg-primary bg-[url('/images/headerLogin.webp')] bg-cover bg-center"
          : pathname == "/user/stream"
          ? "bg-primary w-full fixed top-0 left-0 z-[998]"
          : `${
              updateNavbar && "backdrop-blur bg-[#588157]/50"
            } w-full fixed top-0 left-0 z-[998]`
      )}
    >
      {(pathname.startsWith("/login") || pathname.startsWith("/register")) &&
        pathname !== "/user/stream" && (
          <>
            <div className="absolute inset-0 bg-header-gradient"></div>
            <div className="container relative z-10">
              <Link href="/user" className="flex items-center p-4 h-24">
                <h1 className="text-background font-bold textBig3">
                  keykomania
                </h1>
                <sup className="text-background textNormal2 font-bold ml-1">
                  ®
                </sup>
              </Link>
            </div>
          </>
        )}
      {pathname.startsWith("/user") && <Navbar updateNavbar={updateNavbar} />}
      {pathname.startsWith("/admin") && (
        <NavbarAdmin updateNavbar={updateNavbar} />
      )}
    </header>
  );
};

export default Header;
