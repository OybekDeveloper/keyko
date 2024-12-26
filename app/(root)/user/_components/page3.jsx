import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page3 = () => {
  return (
    <div className="bg-background pt-[58px] h-[800px] md:h-[745px] md:pt-[100px] pb-5">
      <div className="container">
        <div className="flex flex-col items-start md:flex-row md:items-center md:justify-between relative">
          <Image
            src="/icons/dotSmoke.svg"
            alt="quote"
            width={83}
            height={53}
            className="hidden lg:flex md:absolute right-[369px]"
          />
          <article className=" flex flex-col gap-5 md:w-2/3">
            <p className="font-Open_Sans text-text-secondary font-semibold text-[15px] leading-5 flex gap-[10px] letter-spacing tracking-[0.15em] uppercase">
              Mening ishlarim
            </p>
            <h1 className="font-normal font-Abril text-text text-[25px] leading-8 md:text-4xl lg:text-[45px] md:leading-[60px]">
              Har bir rasm mehr bilan <br /> olingan
            </h1>
          </article>
          <div className="flex justify-end w-full md:w-2/6">
            <Link
              href="/user/portfolio"
              className="font-Open_Sans text-secondary font-semibold text-[15px] leading-5 flex gap-[10px] letter-spacing tracking-[0.15em] uppercase"
            >
              Portfolio
              <Image src="/icons/next.svg"  width={18} height={16} alt="next"/>
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center md:flex-row w-full mt-[35px] relative">
            <div className="flex flex-col gap-[10px] md:gap-5 bg-primary pt-[35px] pl-[50px] max-w-[348px] rounded-[30px] md:w-[417px] h-[305px] md:pl-[29px]">
              <Image
                src="/icons/quoteLeft.svg"
                alt="quote"
                width={40}
                height={45}
              />
              <p className="max-w-[279px] text-background font-semibold italic text-xl leading-[29px] md:max-w-[239px] md:text-[22px]">
                “Indivudal yondashuv va takrorlanmas go’yalar .. “
              </p>
              <p className="text-background font-semibold text-[11px] leading-[15px] pt-[23px] md:p-0">
                <span className="text-[25px] md:text-[11px]">Ziyoda</span>{" "}
                Keykomania asoschisiman
              </p>
            </div>
          <div className="flex flex-row-reverse justify-center absolute  mt-[230px] md:flex-row md:left-[311px] md:top-[30px] md:m-0 md:gap-[4px] re">
            <div className="relative shadow-box right-8 md:sticky md:right-0 z-20 w-[172px] h-[270px] md:w-[307px] md:h-[415px] border-background border-[10px] box-border rounded-[10px] bg-background">
              <Image
                src="/images/portfolio.webp"
                alt="image"
                width={300}
                height={100}
                priority
                className="w-full h-full object-cover object-center rounded-[10px]"
              />
            </div>
            <div className="mt-[30px] shadow-box
             relative md:hidden lg:flex left-8 md:sticky md:left-0 z-10 md:m-0 w-[173px] h-[270px] md:w-[307px] md:h-[376px] border-background border-[10px] box-border rounded-[10px] bg-background">
              <Image
                src="/images/portfolio.webp"
                alt="image"
                width={300}
                height={100}
                className="w-full h-full object-cover object-center rounded-[10px]"
              />
            </div>
            <div className="hidden shadow-box md:hidden 2xl:flex w-[173px] h-[270px] md:w-[307px] md:h-[376px] border-background border-[10px] box-border rounded-[10px] bg-background">
              <Image
                src="/images/portfolio.webp"
                alt="image"
                width={300}
                height={100}
                className="w-full h-full object-cover object-center rounded-[10px]"
              />
            </div>
            <Image
              src="/icons/dotSmoke.svg"
              alt="quote"
              width={83}
              height={53}
              className="hidden md:flex md:absolute -right-8 top-[180px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page3;
