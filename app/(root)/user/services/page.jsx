import CustomImage from "@/components/shared/customImage";
import DynamicHeader from "@/components/shared/dynamicHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getData } from "@/lib/server/appwrite";
import { COLLECTION_ID_SERVICES } from "@/lib/utils";
// import { fetchEntries } from "@/lib/api";
// import { COLLECTION_ID_SERVICES } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
// import React, { useEffect, useState } from "react";

const ServicesPage = async () => {
  const { documents: services } = await getData(COLLECTION_ID_SERVICES);
  console.log(services);

  return (
    <div>
      <DynamicHeader
        src="/images/ServicesHeader.webp"
        title="Xizmatlar"
        text="Bu yerda siz mening  xizmatlarimni bilib olishingiz va hatto buyurtma qilishingiz mumkin."
      />
      <div className="container flex flex-col gap-6 justify-center py-9">
        {services?.map((item) => (
          <Card
            key={item.$id}
            className="flex flex-col lg:items-start max-w-[892px] "
          >
            <CardHeader>
              <CardTitle className="font-Inter font-normal text-accent-foreground text-xl leading-8">
                {item.Name}
              </CardTitle>
              <CardDescription className="font-Inter font-normal text-accent-foreground text-lg leading-8">
                {item.Description}
              </CardDescription>
            </CardHeader>
            <CardContent className="w-full flex min-h-[300px] flex-col lg:flex-row items-start ">
              <div className="relative h-60 w-full">
                <CustomImage
                  src={item.Image}
                  alt={item.Name || "Xizmat rasmi"}
                  className="object-cover h-full"
                />
              </div>
              <CardFooter className="w-full flex flex-col p-0 pt-4 justify-between md:h-[300px] lg:px-4 lg:pt-0">
                <div className="flex flex-col justify-start w-full gap-5">
                  <p className="font-Inter font-normal text-[10px] leading-3 text-accent-foreground">
                    Batafsil:
                  </p>
                  <article className="flex flex-col ">
                    <p className="font-Inter font-normal text-xs leading-5 text-accent-foreground min-h-10 border-b-[2px] border-[#0000001A] py-3">
                      {item.Details}
                    </p>
                    <p className="font-Inter font-normal text-xs leading-5 text-accent-foreground min-h-10  border-b-[2px] border-[#0000001A] py-3 tracking-tight">
                      {item.Details}
                    </p>
                  </article>
                </div>
                <div className="flex items-center justify-between w-full relative bottom-0 pt-4 lg:pt-0">
                  <p className="font-Inter font-normal text-[10px] text-accent-foreground leading-3">
                    Sotib oling:
                  </p>
                  <Link
                    href={`/user/services/${item.$id}`}
                    className="bg-secondary h-14 w-20 flex items-center justify-center rounded-3xl font-Inter font-normal text-[15px] leading-6 text-background"
                  >
                    {item.Price}$
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

export default ServicesPage;
