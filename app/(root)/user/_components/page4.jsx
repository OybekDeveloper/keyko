import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { ArrowSvg } from "@/lib/functions";

const Page4 = () => {
  return (
    <div className="container flex flex-col justify-center py-7 md:py-10xl">
      <div className="flex flex-col items-center relative ">
        <Image
                    src="/icons/dotSmoke.svg"
                    alt="quote"
                    width={83}
                    height={53}
                    className="hidden lg:flex md:absolute -top-[37px] left-[194px]"
                  />
        <p className="font-Open_Sans font-semibold text-secondary">
          Kurs va xizmatlarini taqdim qilamiz
        </p>
        <h1 className="font-Abril font-normal text-[25px] leading-[33px] lg:text-4xl text-text lg:leading-5 pt-5">
          Kurs va Xizmatlar
        </h1>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-3xl pt-9">
        <Card className="md:w-[605px] md:h-[369px] flex flex-col items-center py-[50px] rounded-3xl duration-500 hover:bg-primary group">
          <CardHeader className="flex flex-col items-center gap-ten">
            <Image src="/icons/homework.svg" alt="homework" height={86} width={96}/>
            <CardTitle className="font-Abril font-normal text-[25px] leading-[33px] text-text group-hover:text-background">Kurslar</CardTitle>
            <CardDescription className="font-Open_Sans font-normal text-lg leading-[29px] text-text-thin group-hover:text-popover">Kursni sotib olish</CardDescription>
          </CardHeader>
          <CardFooter>
            <Link
              href="/user/courses"
              className="h-[60px] py-5 px-10 gap-ten bg-secondary flex justify-center items-center rounded-3xl "
            >
              <span className="hidden -left-9 text-background duration-500 group-hover:flex group-hover:left-0 ">
                Kurslarga o’ting
              </span>
              <ArrowSvg color="#f3ecdc" />
            </Link>
          </CardFooter>
        </Card>
        <Card className="md:w-[605px] md:h-[369px] flex flex-col items-center py-[50px] rounded-3xl duration-500 hover:bg-primary group">
          <CardHeader className="flex flex-col items-center gap-ten">
            <Image src="/icons/camera.svg" alt="camera" height={86} width={96}/>
            <CardTitle className="font-Abril font-normal text-[25px] leading-[33px] text-text group-hover:text-background">Xizmatlar</CardTitle>
            <CardDescription className="font-Open_Sans font-normal text-lg leading-[29px] text-text-thin group-hover:text-popover">Xizmatga buyurtma berish</CardDescription>
          </CardHeader>
          <CardFooter>
            <Link
              href="/user/services"
              className="h-[60px] py-5 px-10 gap-ten bg-secondary flex justify-center items-center rounded-3xl "
            >
              <span className="hidden -left-9 text-background duration-500 group-hover:flex group-hover:left-0 ">
                Xizmatlarga o’ting
              </span>
              <ArrowSvg color="#f3ecdc" />
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Page4;
