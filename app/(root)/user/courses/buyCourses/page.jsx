import React from "react";
import { data } from "../page";
import DynamicHeader from "@/components/shared/dynamicHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";


const Page = () => {
  
  return (
    <div>
      <DynamicHeader
        src="/images/CoursesHeader.webp"
        title="Sotib olingan kurslar"
        description="Sotib olingan kurslar"
        
      />
      <div className="container flex flex-col gap-6 justify-center py-9">
        {data.map((item) => (
          <Card
            key={item.id}
            className="flex flex-col lg:items-start max-w-[892px] "
          >
            <CardHeader>
              <CardTitle className="font-Inter font-normal text-accent-foreground text-xl leading-8">
                {item.title}
              </CardTitle>
              <CardDescription className="font-Inter font-normal text-accent-foreground text-lg leading-8">
                {item.text}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex min-h-[300px] flex-col lg:flex-row items-start ">
              <Image
                src="/images/speaker.webp"
                alt=""
                width={500}
                height={100}
                className="w-[500px] h-[133px] lg:h-[300px] rounded-3xl object-cover object-center blur-[2px]"
              />
              <CardFooter className="flex flex-col p-0 pt-4 justify-between md:h-[300px] lg:px-4 lg:pt-0">
                <div className="flex flex-col gap-5">
                  <p className="font-Inter font-normal text-[10px] leading-3 text-accent-foreground">
                    Batafsil:
                  </p>
                  <article className="flex flex-col ">
                    <p className="font-Inter font-normal text-xs leading-5 text-accent-foreground min-h-10 border-b-[2px] border-[#0000001A] py-3">
                      {item.textOne}
                    </p>
                    <p className="font-Inter font-normal text-xs leading-5 text-accent-foreground min-h-10  border-b-[2px] border-[#0000001A] py-3 tracking-tight">
                      {item.textTwo}
                    </p>
                  </article>
                </div>
                <div className="flex items-center justify-end w-full relative bottom-0 pt-4 lg:pt-0">
                  <Link
                    href={`/user/courses/buyCourses/${item.id}`}
                    className="bg-secondary h-14 w-20 flex items-center justify-center rounded-3xl font-Inter font-normal text-[15px] leading-6 text-background"
                  >
                    Ko’rish
                  </Link>
                </div>
              </CardFooter>
            </CardContent>
          </Card>
        ))}
      </div>    
    </div>
  );
};

export default Page;
