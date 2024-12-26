import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CustomImage from "./customImage";

function DynamicHeader({ src, title, text, link, videoSee }) {
  return (
    <div className="h-[300px] md:h-[517px] relative overflow-hidden">
      <div className="absolute w-full h-full overflow-hidden top-0 z-20">
        <div className="bg-header-gradient inset-0 h-full w-full absolute z-20"></div>
        <CustomImage
          src={src}
          alt="image"
          width={1000}
          height={100}
          priority
          className="w-full h-full object-cover object-center absolute top-0 z-10"
        />
      </div>

      <div className="container relative top-[100px] md:top-[215px] z-50">
        <article className="flex flex-col gap-4">
          <h1 className="font-Open_Sans font-normal w-[288px] text-xl leading-7 md:text-[35px] lg:text-[55px] md:w-[650px] md:leading-[75px] text-background">
            {title}
          </h1>
          <p className="font-Open_Sans font-normal text-popover text-sm md:text-lg leading-7">
            {text}
          </p>
          {link && videoSee ? (
            <Link
              href="/user/courses/buyCourses"
              className="bg-primary py-2 px-3 text-background font-Open_Sans font-normal text-lg rounded-md w-52"
            >
              {link}
            </Link>
          ) : (
            ""
          )}
        </article>
      </div>
    </div>
  );
}

export default DynamicHeader;
