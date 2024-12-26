import { ArrowSvg, Calendar, Certificate } from "@/lib/functions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Reviews() {
  return (
    <div className="bg-background md:py-10xl">
      <div className="container flex flex-col justify-center items-center 2xl:flex-row md:justify-between">
        <div className="min-w-[322px] flex 2xl:w-1/2 relative h-[401px] md:h-[661px]">
          <Image
            src="/icons/dotSmoke.svg"
            alt="quote"
            width={115}
            height={74}
            className="hidden lg:flex md:absolute z-30 left-[428px] top-[133px]"
          />
          <Image
            src="/images/reviewHome.webp"
            alt="buterbrot"
            height={100}
            width={390}
            className="w-[206px] h-[269px] md:w-[390px] md:h-[561px] rounded-3xl object-cover object-center"
          />
          <Image
            src="/images/reviewsKebap.webp"
            alt="buterbrot"
            height={100}
            width={390}
            className="absolute z-10 left-[98px] top-[38] md:left-[200] md:top-[162px] w-[226px] h-[289px] md:w-[390px] md:h-[499px] rounded-3xl object-cover object-center border-[12px] border-background"
          />
          <div className="bg-primary w-[234px] h-[171px] flex flex-col items-center justify-center rounded-3xl absolute left-[60px] bottom-16 z-20">
            <p className="flex items-start font-Abril font-normal text-4xl leading-[60px] text-text-secondary">
              99{" "}
              <span className="font-Open_Sans font-normal text-popover text-lg leading-7 ml-[3px]">
                %
              </span>
            </p>
            <p className="font-Abril font-normal text-[21px] leading-7 text-background">
              Ijobiy sharhlar
            </p>
          </div>
        </div>

        <article className="min-w-[333px] flex flex-col gap-4 md:gap-3xl justify-center 2xl:w-1/2 relative h-[489px] md:h-[661px] py-[60px]">
          <Image
            src="/icons/dotSmoke.svg"
            alt="quote"
            width={115}
            height={74}
            className="absolute left-0 top-[92px] md:left-[339px] md:top-0 z-0"
          />
          <p className="font-Open_Sans font-semibold text-[15px] leading-5 text-text-secondary letter-spacing tracking-[0.15em]">Sharhlar</p>
          <h1 className="relative z-10 font-Abril font-normal text-[25px] leading-8 md:text-4xl md:leading-[60px] text-text md:w-[90%]">Mijozlarimiz va talabalarimizga g'amxo'rlik qilish.</h1>
          <p className="font-Open_Sans font-normal text-[15px] md:text-lg md:leading-[29px] letter-spacing tracking-[0.15em]">
            Mijozlarimiz va talabalarimizdan ijobiy fikrlar va qoniqishi bizning
            ishimizda eng muhimidir!
          </p>
          <p className="flex items-center font-Abril font-normal text-[15px] leading-5 md:text-[21px] md:leading-7 text-text"> <span className="mr-5"><Certificate/></span>Sifat kafolati</p>
          <p className="flex items-center font-Abril font-normal  text-[15px] leading-5 md:text-[21px] md:leading-7 text-text"> <span className="mr-5"><Calendar/></span>Uchrashuv muddatlari</p>

          <Link
            href="/user/reviews"
            className="h-[60px] w-[202px] py-5 px-10 gap-ten bg-secondary flex justify-center items-center rounded-3xl "
          >
            <span className="text-background duration-500 ">
            Sharhlar
            </span>
            <ArrowSvg color="#f3ecdc" />
          </Link>
        </article>
      </div>
    </div>
  );
}

export default Reviews;
