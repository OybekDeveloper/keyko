import DynamicHeader from "@/components/shared/dynamicHeader";
import React from "react";

import Image from "next/image";
import Link from "next/link";
import { data } from "../../page";
import VideoPlayer from "@/components/shared/videoPlayer";

const page = async ({ params }) => {
  const { id } = await params;
  const item = data.find((item) => item.id === Number(id));
  
  return (
    <div>
      <DynamicHeader
        src={item.image}
        title="SHIRCHOYMOBI"
        text="Mobilografiya sohasida 0 dan Pro gacha!"
      />

      <div className="container w-full flex justify-center py-10xl ">
            <VideoPlayer video={"/video/Doggie.mp4"} poster={item.image}/>
      </div>
    </div>
  );
};

export default page;

