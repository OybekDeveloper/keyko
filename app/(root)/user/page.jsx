import React from "react";
import Page2 from "./_components/page2";
import Page3 from "./_components/page3";
import Navbar from "@/components/shared/navbar";
import Page4 from "./_components/page4";
import Reviews from "./_components/reviews";
import Stream from "./_components/stream";
import MyWork from "@/components/shared/myWork";
import Header from "@/components/shared/header";
import Page1 from "./_components/page1";

const page = () => {
  return (
    <div>
      <Page1/>
      <Page2 />
      <Page3/>
      <Page4/>
      <Reviews/>
      <Stream/>
      <MyWork title="Mening ishlarim " text="mening ishlarim"/>
    </div>
  );
};

export default page;
