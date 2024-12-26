import DynamicHeader from "@/components/shared/dynamicHeader";
import React from "react";
import { data } from "../page";
import Image from "next/image";
import Link from "next/link";
import { COLLECTION_ID } from "@/lib/utils";
import { getData } from "@/lib/server/appwrite";

const Course = async ({ params }) => {
  const { id } = await params;
  const { documents: courses } = await getData(COLLECTION_ID);
  const courseData = courses.find((course) => course.$id === id);
  console.log(courses);
  

  return (
    <div>
      <DynamicHeader
        src={courseData?.Image}
        title={courseData?.Name}
        text={courseData?.Description}
      />

      <div className="container flex flex-col mx-auto px-4">
        <div className="grid grid-cols-3 gap-5 py-12">
          <Image
            src={courseData?.Image}
            alt=""
            width={500}
            height={100}
            className="w-full h-[226px] lg:h-[413px] object-cover object-center col-span-2"
          />
          <Image
            src={courseData?.Image}
            alt=""
            width={500}
            height={100}
            className="w-full h-[226px] lg:h-[413px] object-cover object-center"
          />
        </div>
        <div className="flex flex-col py-12">
          <article className="flex flex-col lg:w-1/2">
            <h1 className="font-Abril font-normal text-3xl lg:text-4xl lg:leading-[56px] text-accent-foreground">
              {courseData?.Name}
            </h1>
            <p className="font-Inter font-normal text-base leading-7">
              {courseData?.Description}
            </p>
            <p className="font-Inter font-normal text-base leading-7 pt-14">
              {courseData?.Details}
            </p>
            <p className="font-Inter font-normal text-base leading-7 pt-10">
              {courseData?.Details}
            </p>
          </article>
          <div className="flex justify-end pt-[200px]">
            <Link
              href="https://t.me/callcenterkeykomania"
              className="bg-secondary p-1 lg:p-3 rounded-[12px] text-background text-Abril text-xl font-normal h-16 flex items-center"
            >
              Xizmatga buyurtma bering{" "}
              <span className="hidden lg:flex font-Abril text-4xl ml-2">
                {courseData?.Price}$
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
