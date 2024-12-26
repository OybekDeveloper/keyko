import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Play } from "@/lib/functions";

const MyWork = ({text, title }) => {
  return (
    <div className="bg-background h-[845px] md:h-[966px] py-10xl">
      <div className="container flex flex-col items-center">
        <article className="w-full flex flex-col justify-center items-center gap-5">
          <p className="font-Open_Sans font-semibold text-[15px] leading-5 letter-spacing tracking-[0.15em] uppercase">
            {text}
          </p>
          <h1 className="font-Abril font-norrmal text-text text-3xl md:text-4xl md:leading-[60px]">
            {title}
          </h1>
        </article>

        <div className="flex flex-col gap-[30px] w-full pt-[35px]">
          {/* Birinchi grid */}
          <div className="grid grid-cols-4 gap-6">
            <div className="w-full h-[300px] col-span-4 md:col-span-2 rounded-3xl overflow-hidden relative">
              <div className="w-full h-full bg-reels-gradient absolute inset-0 top-0 z-40"></div>
                <Image
                  src="/images/reviewHome.webp"
                  alt="Reels preview"
                  width={500}
                  height={100}
                  className="w-full h-full object-cover object-center relative z-10"
                />
              <div className="absolute bottom-[35px] flex justify-between items-center z-50 w-full px-9">
                <p className="font-Abril font-noprmal text-[35px] text-background leading-[48px]">Reels</p>
                <Button className="rounded-full bg-text-secondary hover:bg-primary" size="play" >
                        <Play />
                </Button>
              </div>
            </div>

            <Image
              src="/images/reviewHome.webp"
              alt="reels"
              width={500}
              height={100}
              className="hidden md:flex w-full h-[300px] rounded-3xl object-cover object-center"
            />
            <Image
              src="/images/reviewHome.webp"
              alt="reels"
              width={500}
              height={100}
              className="hidden md:flex w-full h-[300px] rounded-3xl object-cover object-center"
            />
          </div>

          {/* Ikkinchi grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <Image
              src="/images/reviewHome.webp"
              alt="reels"
              width={500}
              height={100}
              className="w-full h-[131px] md:h-[300px] rounded-3xl object-cover object-center"
            />
            <Image
              src="/images/reviewHome.webp"
              alt="reels"
              width={500}
              height={100}
              className="w-full h-[131px] md:h-[300px] rounded-3xl object-cover object-center"
            />
            <Image
              src="/images/reviewHome.webp"
              alt="reels"
              width={500}
              height={100}
              className="w-full h-[131px] md:h-[300px] rounded-3xl object-cover object-center"
            />
            <Image
              src="/images/reviewHome.webp"
              alt="reels"
              width={500}
              height={100}
              className="flex md:hidden w-full h-[131px] rounded-3xl object-cover object-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyWork;
