import MyWork from "@/components/shared/myWork";
import React from "react";
import Victory from "./_components/victory";
import DynamicHeader from "@/components/shared/dynamicHeader";
import Individual from "./_components/individual";
import Learners from "./_components/learners";
import Comments from "./_components/comments";

const PortfolioPage = () => {
  return (
    <div>
      <DynamicHeader src="/images/reviewHome.webp" title="Har bir rasm mehr bilan olingan" text="Mening ishlarim"/>
      <Individual/>
      <Learners/>
      <MyWork text="ishlar galereyasi" title="Mening ishlarim galereyasi" />
      <Comments/>
      <Victory />
    </div>
  );
};

export default PortfolioPage;
