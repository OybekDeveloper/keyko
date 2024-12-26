import Image from "next/image";
import React from "react";

const Learners = () => {
  return (
    <div className="py-[50px]">
      <div className="container flex flex-col">
        <article className="flex flex-col w-full items-start h-[290px] xl:h-[499px] relative gap-3xl pt-0 xl:pt-[160px]">
          <p className="font-Open_Sans font-normal text-[15px] leading-5 text-text-secondary tracking-[0.15em] uppercase">
            Mening shogirdlarim
          </p>
          <h1 className="font-Open_Sans font-normal text-xl leading-7 md:text-4xl md:leading-[62px] text-text tracking-[0.15em] ">
            Mening kurslarimdan keyin ishi keskin o'zgargan talabalar.
          </h1>
        </article>

        <div className="grid grid-rows-2 grid-cols-2 xl:grid-cols-3 gap-3 md:gap-9">
          <Image
            src="/images/reviewHome.webp"
            alt="image"
            width={500}
            height={100}
            loading="lazy"
            className="rounded-3xl h-[104px] md:h-[281px] object-cover object-center"
          />
          <div className="rounded-tr-[141px] h-[218px] md:h-full row-span-2 flex flex-col overflow-hidden">
            <Image
              src="/images/reviewHome.webp"
              alt="image"
              width={500}
              height={100}
              loading="lazy"
              className="w-full h-[152px] md:h-[412px] object-cover object-center"
            />
            <div className="bg-secondary h-16 md:h-[182px] flex items-center justify-center">
              <h3 className="font-Abril font-normal text-center text-background text-xs leading-4 md:text-[25px] lg:text-[32px] md:leading-10">
                Men bilan mashg'ulotdan oldin va keyin farqni ko'rishingiz
                mumkin.
              </h3>
            </div>
          </div>
          <Image
            src="/images/reviewHome.webp"
            alt="image"
            width={500}
            height={100}
            loading="lazy"
            className="lg:hidden rounded-3xl h-[104px] md:h-[281px] object-cover object-center"
          />
          <Image
            src="/images/reviewHome.webp"
            alt="image"
            width={500}
            height={100}
            loading="lazy"
            className="col-span-2 rounded-3xl w-full h-[157px] md:h-[281px] lg:h-full row-span-2 lg:col-span-1 object-cover object-center"
          />
          <Image
            src="/images/reviewHome.webp"
            alt="image"
            width={500}
            height={100}
            loading="lazy"
            className="hidden lg:flex rounded-3xl h-[104px] md:h-[281px] object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
};

export default Learners;
