"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { navLink } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

const Navbar = ({ updateNavbar }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <div className="container flex justify-between items-center h-20">
      <div className="flex items-center">
        <Link
          href="/user"
          className={`font-Poppins font-medium md:text-[25px] md:leading-[37px] text-white md:mr-[95px]`}
        >
          Keykomania.
        </Link>
        <div className="hidden lg:flex gap-12">
          {navLink.map((nav, idx) => {
            return (
              <Link
                key={idx}
                href={nav?.href}
                className={`${
                  pathname.startsWith(nav?.href) ? "opacity-1" : "opacity-[0.6]"
                } font-Open_Sans font-semibold text-[15px] leading-[20px] text-white duration-300 hover:opacity-100`}
              >
                {nav?.text}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="space-x-2">
        <Button
          className="bg-background font-Open_Sans font-semibold text-[15px] leading-[20px]"
          size="xl"
          variant="keyko"
        >
          <Link href="/login">Kirish</Link>
        </Button>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              className="lg:hidden bg-background font-Open_Sans font-semibold text-[15px] leading-[20px]"
              variant="keyko"
            >
              <Image src="/icons/menu.svg" alt="menu" height={14} width={22} />
            </Button>
          </SheetTrigger>
          <SheetContent onClose={() => setOpen(false)} className="z-[999]">
            <SheetHeader>
              <SheetTitle className="text-start text-3xl">
                Keykomania
              </SheetTitle>
              <SheetDescription className="hidden">
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col items-end gap-2 mt-2">
              {navLink.map((nav, idx) => {
                return (
                  <Link
                    onClick={() => setOpen(false)}
                    key={idx}
                    href={nav?.href}
                    className={`${
                      pathname.startsWith(nav?.href)
                        ? "opacity-1"
                        : "opacity-[0.6]"
                    } font-Open_Sans font-semibold text-[15px] leading-[20px] text-primary`}
                  >
                    {nav?.text}
                  </Link>
                );
              })}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Navbar;
