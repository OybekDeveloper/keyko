import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star } from "@/lib/functions";
import Image from "next/image";
import CustomImage from "@/components/shared/customImage";

const Students = ({ reviews }) => {
  return (
    <div className="bg-primary md:py-10xl">
      <div className="container flex flex-col py-12 relative">
        <Image
          src="/icons/dotSmoke.svg"
          alt="quote"
          width={115}
          height={74}
          className="hidden md:flex absolute z-50  lg:left-[820px] md:top-[46px]"
        />
        <article className="flex flex-col gap-5">
          <p className="text-text-secondary font-Open_Sans font-semibold text-[15px] leading-5 tracking-[0.15em] uppercase">
            Talabalarimning sharhlari
          </p>
          <h2 className="text-3xl text-background font-Abril font-normal md:text-4xl md:leading-[60px]">
            Talabalar sharhlari
          </h2>
        </article>

        <div className="pt-16 grid grid-cols-1 lg:grid-cols-2 gap-3xl">
          {reviews.map((review) => (
            <Card key={review?.$id} className="bg-background">
              <CardHeader className="flex flex-col gap-5">
                <CardTitle className="flex gap-ten">
                  <Star /> <Star /> <Star /> <Star /> <Star />
                </CardTitle>
                <CardDescription className="font-Open_Sans font-semibold text-thin italic text-xl md:text-[22px] leading-7">
                  {`"${review?.Description}"`}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-6 lg:pb-20">
                <div className="relative h-[75px] w-[75px] rounded-3xl ">
                  <CustomImage
                    src={review?.Image}
                    alt=""
                    width={500}
                    height={100}
                    className="object-cover object-center"
                  />
                </div>
                <article className="flex flex-col gap-3 ">
                  <h3 className="text-text font-Abril font-normal text-[15px] leading-5">
                    {review?.Name}
                  </h3>
                  <p className="text-text-secondary font-Open_Sans font-semibold tracking-[0.15em] uppercase">
                    “KitKAt”
                  </p>
                </article>
              </CardContent>
            </Card>
          ))}
          {/* <Card className="bg-background">
            <CardHeader className="flex flex-col gap-5">
              <CardTitle className="flex gap-ten">
                <Star /> <Star /> <Star /> <Star /> <Star />
              </CardTitle>
              <CardDescription className="font-Open_Sans font-semibold text-thin italic text-xl md:text-[22px] leading-7">
                "Ishga yondashuv juda yoqdi"
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-6 lg:pb-20">
              <Image
                src="/images/person.webp"
                alt=""
                width={500}
                height={100}
                className="h-[75px] w-[75px] rounded-3xl object-cover object-center"
              />
              <article className="flex flex-col gap-3 ">
                <h3 className="text-text font-Abril font-normal text-[15px] leading-5">
                  Xamid Xamidov
                </h3>
                <p className="text-text-secondary font-Open_Sans font-semibold tracking-[0.15em] uppercase">
                  “KitKAt”
                </p>
              </article>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </div>
  );
};

export default Students;
