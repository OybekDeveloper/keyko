import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star } from "@/lib/functions";
import Image from "next/image";
import CustomImage from "@/components/shared/customImage";

const Client = ({ reviews }) => {
  return (
    <div className="container flex flex-col py-12">
      <article>
        <h2 className="text-3xl font-bold text-primary">
          Mijozlarning sharhlari
        </h2>
        <p className="text-secondary">
          Mening xizmatlarim bo'yicha mijozlarning sharhlari.
        </p>
      </article>

      <div className="pt-16 grid grid-cols-1 lg:grid-cols-2 gap-3xl">
        {reviews.map((review) => (
          <Card key={review?.$id} className="bg-primary">
            <CardHeader className="flex flex-col gap-5">
              <CardTitle className="flex gap-ten">
                {" "}
                <Star /> <Star /> <Star /> <Star /> <Star />
              </CardTitle>
              <CardDescription className="font-Open_Sans font-semibold text-background italic text-xl md:text-[22px] leading-7">
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
                <h3 className="text-background font-Abril font-normal text-[15px] leading-5">
                  {review?.Name}
                </h3>
                <p className="text-text-secondary font-Open_Sans font-semibold tracking-[0.15em] uppercase">
                  “Snickers”
                </p>
              </article>
            </CardContent>
          </Card>
        ))}
        {/* <Card className="bg-primary">
          <CardHeader className="flex flex-col gap-5">
            <CardTitle className="flex gap-ten"> <Star/> <Star/> <Star/> <Star/> <Star/></CardTitle>
            <CardDescription className="font-Open_Sans font-semibold text-background italic text-xl md:text-[22px] leading-7">"Chiroyli va tez"</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-6 lg:pb-20">
              <Image src="/images/person.webp" alt="" width={500} height={100} className="h-[75px] w-[75px] rounded-3xl object-cover object-center"/>
              <article className="flex flex-col gap-3 ">
                  <h3 className="text-background font-Abril font-normal text-[15px] leading-5">Avaz Majidov</h3>
                  <p className="text-text-secondary font-Open_Sans font-semibold tracking-[0.15em] uppercase">“Snickers”</p>
              </article>
          </CardContent>
        </Card>
        <Card className="bg-primary">
          <CardHeader className="flex flex-col gap-5">
            <CardTitle className="flex gap-ten"> <Star/> <Star/> <Star/> <Star/> <Star/></CardTitle>
            <CardDescription className="font-Open_Sans font-semibold text-background italic text-xl md:text-[22px] leading-7">"Chiroyli va tez"</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-6 lg:pb-20">
              <Image src="/images/person.webp" alt="" width={500} height={100} className="h-[75px] w-[75px] rounded-3xl object-cover object-center"/>
              <article className="flex flex-col gap-3 ">
                  <h3 className="text-background font-Abril font-normal text-[15px] leading-5">Avaz Majidov</h3>
                  <p className="text-text-secondary font-Open_Sans font-semibold tracking-[0.15em] uppercase">“Snickers”</p>
              </article>
          </CardContent>
        </Card>
        <Card className="bg-primary">
          <CardHeader className="flex flex-col gap-5">
            <CardTitle className="flex gap-ten"> <Star/> <Star/> <Star/> <Star/> <Star/></CardTitle>
            <CardDescription className="font-Open_Sans font-semibold text-background italic text-xl md:text-[22px] leading-7">"Chiroyli va tez"</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-6 lg:pb-20">
              <Image src="/images/person.webp" alt="" width={500} height={100} className="h-[75px] w-[75px] rounded-3xl object-cover object-center"/>
              <article className="flex flex-col gap-3 ">
                  <h3 className="text-background font-Abril font-normal text-[15px] leading-5">Avaz Majidov</h3>
                  <p className="text-text-secondary font-Open_Sans font-semibold tracking-[0.15em] uppercase">“Snickers”</p>
              </article>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
};

export default Client;
