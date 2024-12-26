import Image from "next/image";
import React from "react";

const Individual = () => {
  return (
    <div className="container grid grid-cols-1 place-items-center xl:place-items-start xl:grid-cols-2 ">
      <div className="flex w-[313px] lg:w-1/2 h-[351px] md:h-[499px] items-start lg:items-center relative -top-12 z-50">
        <Image
          src="/images/streamImage.webp"
          alt="image"
          width={500}
          height={100}
          className="w-[219px] h-[142px] md:w-[390px] md:h-[251px] object-cover object-center rounded-3xl"
        />
        <Image
          src="/images/portfolio.webp"
          alt="image"
          width={500}
          height={100}
          className="w-[219px] h-[281px] md:w-[390px] md:h-full object-cover object-center rounded-3xl border-background border-[12px] shadow-box absolute left-[94px] top-2 md:left-[200]"
        />

        <div className="bg-primary w-[234px] h-[120px] md:h-[149px] flex flex-col items-center justify-center rounded-3xl absolute left-[60px] bottom-[74px] md:left-[125px] md:bottom-[60px] z-20">
          <p className="flex items-start font-Abril font-normal text-3xl md:text-4xl leading-[60px] text-text-secondary">
            100
            <span className="font-Open_Sans font-normal text-popover text-lg leading-7 ml-[3px]">
              %
            </span>
          </p>
          <p className="font-Abril font-normal text-[15px] md:text-[21px] leading-7 text-background">
            Ijobiy sharhlar
          </p>
        </div>
        <Image
          src="/icons/dotSmoke.svg"
          alt="quote"
          width={115}
          height={74}
          className="absolute z-50 right-0 bottom-0 md:left-[428px] md:top-[281px]"
        />
      </div>
      <article className="flex flex-col w-full items-start h-[290px] xl:h-[499px] relative gap-3xl pt-0 xl:pt-[160px] ">
                    <p className="font-Open_Sans font-normal text-[15px] leading-5 text-text-secondary tracking-[0.15em] uppercase">G'oyalar</p>
                    <h1 className="font-Open_Sans font-normal text-xl leading-7 md:text-4xl md:leading-[62px] text-text">Har bir mijoz uchun individual g'oya!</h1>
                    <p className="font-Open_Sans text-normal text-base  md:text-lg leadin-7">Bu yangilar uchun takrorlanmaydi</p>
      
      </article>
    </div>
  );
};

export default Individual;
