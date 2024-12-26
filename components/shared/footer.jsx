"use client";

import {
  CaretRight,
  Facebook,
  Instagram,
  Mail,
  MapMark,
  Telegram,
  YouTube,
} from "@/lib/functions";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Footer = () => {
  const pathname = usePathname();
  if (
    pathname.startsWith("/user") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register")
  )
    return (
      <footer className="w-full bg-primary h-[284px] pt-[25px] md:h-[331px] md:pt-[67px]">
        <div className="container relative flex flex-col gap-4 md:flex-row md:gap-3xl">
          <div className="flex flex-col gap-[7px] md:gap-[25px] md:w-[391px]">
            <h4 className="font-Poppins font-normal text-background text-xl leading-3xl md:text-3xl md:leading-4xl uppercase ">
              KEykomania.
            </h4>
            <p className="font-Open_Sans font-normal text-popover text-sm md:text-lg leading-[29px]">
              Ijtimoiy tarmoqlar
            </p>
            <div className="absolute right-6 top-0  md:sticky flex items-center flex-col gap-4 md:flex-row">
              <Link
                href="https://www.facebook.com/profile.php?id=61565971798542"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook />
              </Link>
              <Link
                href="https://t.me/+_zn8VcLnJnxiN2My"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Telegram />
              </Link>
              <Link
                href="https://www.instagram.com/keykomania/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram />
              </Link>
              <YouTube />
            </div>
          </div>

          <div className="flex flex-col gap-[7px] md:gap-[25px] md:w-[391px]">
            <h4 className="font-Abril font-normal text-background text-xl leading-3xl md:text-2xl md:leading-3xl">
              Aloqa
            </h4>
            <p className="flex items-start font-Open_Sans font-normal text-popover text-sm md:text-lg leading-[29px]">
              <span className="mr-[9px]">
                <MapMark />
              </span>
              Tashkent, Uzbekistan
            </p>
            <p className="flex items-center font-Open_Sans font-normal text-popover text-sm md:text-lg leading-[29px]">
              <span className="mr-[9px]">
                <Mail />
              </span>
              islamovaziyodakhon@gmail.com
            </p>
          </div>

          <div className="hidden md:flex flex-col gap-[7px] md:gap-[25px] md:w-[391px]">
            <h4 className="font-Abril font-normal text-background text-xl leading-3xl md:text-2xl md:leading-3xl  ">
              Linklar
            </h4>
            <div className="flex flex-col gap-[15px]">
              <Link
                href="/user/courses"
                className="flex items-center font-Open_Sans font-normal text-popover text-sm md:text-lg leading-[29px]"
              >
                <span className="mr-[9px]">
                  <CaretRight />
                </span>
                Kurslar
              </Link>
              <Link
                href="/user/services"
                className="flex items-center font-Open_Sans font-normal text-popover text-sm md:text-lg leading-[29px]"
              >
                <span className="mr-[9px]">
                  <CaretRight />
                </span>
                Xizmatlar
              </Link>
              <Link
                href="/user/portfolio"
                className="flex items-center font-Open_Sans font-normal text-popover text-sm md:text-lg leading-[29px]"
              >
                <span className="mr-[9px]">
                  <CaretRight />
                </span>
                Portfolio
              </Link>
              <Link
                href="/user/reviews"
                className="flex items-center font-Open_Sans font-normal text-popover text-sm md:text-lg leading-[29px]"
              >
                <span className="mr-[9px]">
                  <CaretRight />
                </span>
                Sharhlar
              </Link>
            </div>
          </div>
        </div>
      </footer>
    );
};

export default Footer;
