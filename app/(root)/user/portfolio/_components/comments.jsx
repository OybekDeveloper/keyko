import { Button } from "@/components/ui/button";
import { Check, Play } from "@/lib/functions";
import Image from "next/image";
import React from "react";

const Comments = () => {
  return (
    <div className="bg-primary  lg:max-h-[712px] py-10xl relative overflow-hidden">
      <div className="container flex flex-col relative">
        <Image
          src="/icons/dotSmoke.svg"
          alt="quote"
          width={115}
          height={74}
          className="absolute z-50 right-0 bottom-0 -top-[116px] lg:right-[620px] md:-top-[46px] opacity-50"
        />
        <article className="w-full md:w-2/3 flex flex-col gap-5 pb-5 lg:p-0">
          <p className="font-Open_Sans font-normal text-[15px] leading-5 tracking-[0.15px] uppercase text-text-secondary">
            sharhlar
          </p>
          <h1 className="font-Open_Sans font-normal text-[25px] leading-6 md:text-4xl md:leading-[60px] text-background">
            Har bir sharh men uchun juda muhim
          </h1>
        </article>
        <div className="bg-accent w-full lg:absolute right-0 h-full lg:w-1/3 rounded-3xl p-[50px] flex flex-col justify-start gap-5">
          <Image
            src="/icons/quoteLeft.svg"
            alt="quote"
            width={40}
            height={45}
          />

          <h4 className="font-Open_Sans font-semibold italic text-[22px] leading-7 text-background w-[300px]">
            “ Hozirgacha men olgan eng yaxshi kurs. "
          </h4>
          <p className="font-Open_Sans font-normal terxt-lg leading-7 text-popover tracking-[0.15em]">
            Aziza talaba
          </p>

          <div className="flex flex-col gap-4">
            <p className="font-Open_Sans font-normal text-lg leading-7 tracking-[0.15em] text-popover flex items-center gap-4">
              <span>
                <Check />
              </span>
              Kurs 1
            </p>
            <p className="font-Open_Sans font-normal text-lg leading-7 tracking-[0.15em] text-popover flex items-center gap-4">
              <span>
                <Check />
              </span>
              3 oy
            </p>
            <p className="font-Open_Sans font-normal text-lg leading-7 tracking-[0.15em] text-popover flex items-center gap-4">
              <span>
                <Check />
              </span>
              O‘qishni imtiyozli diplom bilan tamomlagan
            </p>
          </div>
        </div>

        <div className="w-full lg:w-2/3 h-[326px] overflow-hidden pt-3xl relative">
          <Image
            src="/images/reviewHome.webp"
            alt="image"
            width={500}
            height={100}
            className="w-full h-full object-cover object-center rounded-3xl border-[12px] border-background"
          />
          <Button
            className="rounded-full bg-text-secondary hover:bg-primary absolute top-0 bottom-0 left-0 right-0 m-auto"
            size="play"
          >
            <Play />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Comments;
