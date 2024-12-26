import DynamicHeader from "@/components/shared/dynamicHeader";
import React from "react";
import Client from "./_components/client";
import Students from "./_components/students";
import { REVIEWS_COLLECTION_ID } from "@/lib/utils";
import { getData } from "@/lib/server/appwrite";

const ReviewsPage = async () => {
  const { documents: reviews } = await getData(REVIEWS_COLLECTION_ID);
  console.log(reviews);

  return (
    <div>
      <DynamicHeader
        src="/images/reviewsHeader.webp"
        title="Sharhlar"
        text="Har bir fikr-mulohaza biz uchun muhimdir."
      />
      <Client reviews={reviews} />
      <Students reviews={reviews} />
      <div className="bg-background h-16"></div>
    </div>
  );
};

export default ReviewsPage;
