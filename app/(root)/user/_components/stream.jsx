import { ArrowSvg } from "@/lib/functions";
import Image from "next/image";
import Link from "next/link";
import React from "react";


const Stream = () => {
  return (
    <div className="bg-primary  md:h-[603px] relative">
      <div className="bg-header-gradient absolute inset-0"></div>
      <div className="container py-3xl md:py-10xl ">
        <div className="w-full h-[251px] md:h-[403px] rounded-3xl overflow-hidden ">
          <Image
            src="/icons/dotSmoke.svg"
            alt="quote"
            width={99}
            height={64}
            className="hidden lg:flex md:absolute z-30 left-[264px] top-[150px] opacity-70"
          />
          <Image
            src="/icons/dotSmoke.svg"
            alt="quote"
            width={99}
            height={64}
            className="absolute z-30 top-4 right-0 md:left-[820px] md:top-[46px] opacity-70"
          />
          <Image
            src="/images/streamImage.webp"
            alt="stream"
            height={100}
            width={500}
            className="w-full h-full object-cover object-center"
          />
          <div className="flex flex-col w-full h-full justify-center items-center absolute left-0 top-0 gap-5">
            <h1 className="font-Abril font-normal text-[25px] leading-8 text-background md:text-[55px] md:leading-[75px]">
              Jonli efir mavjud
            </h1>
            <p className="font-Open_Sans font-normal text-lg leading-7 text-popover letter-spacing tracking-[0.15em]">
              Jonli efirni ko’ring
            </p>
            <Link
              href="/user/stream"
              className="h-[60px] w-[152px] py-5 px-10 gap-ten bg-secondary flex justify-center items-center rounded-3xl font-Open_Sans font-semibold text-[15px] letter-spacing tracking-[0.15em] text-background"
            >
            Ko’rish
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stream;
