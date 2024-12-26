import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Page1() {
  
  return (
    <div className="h-[300px] md:h-[651px] relative overflow-hidden">
      <div className="absolute w-full h-full overflow-hidden top-0 z-20">
        <div className="bg-header-gradient inset-0 h-full w-full absolute z-20"></div>
        <Image
          src="/images/reviewsKebap.webp"
          alt="Kebap"
          width={2000}
          height={100}
          className="w-full h-full object-cover object-bottom absolute top-0 z-10"
        />
      </div>

      <div className="container relative top-[100px] md:top-[161px] z-50">
        <article className="flex flex-col gap-[25px]">
          <h1 className="font-Open_Sans font-normal min-w-[288px] text-xl leading-7 md:text-[35px] lg:text-[55px] md:w-[712px] md:leading-[75px] text-background">
            O’zbekistondagi top foodmobilogrof Ziyoda Inomkxo’jayeva web-saytiga
            xush kelibsiz
          </h1>
          <Link href="user/portfolio"><Button className="bg-secondary uppercase w-[180px] md:w-[280px] hover:bg-secondary rounded-3xl h-[40px] md:h-[60px]" ><span className="font-Open_Sans font-semibold text-[8px] leading-[10px] md:text-[15px] md:leading-5 letter-spacing tracking-[0.15em]">ko’proq ma’lumot olish</span></Button></Link>
        </article>
      </div>
    </div>
  );
}

export default Page1;
