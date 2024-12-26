"use client";

import { fetchEntries } from "@/lib/api";
import {
  COLLECTION_ID,
  COLLECTION_ID_SERVICES,
  REVIEWS_COLLECTION_ID,
} from "@/lib/utils";
import { useEffect, useState } from "react";

const Home = () => {
  const [counts, setCounts] = useState({
    courses: 0,
    reviews: 0,
    services: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const courses = await fetchEntries(COLLECTION_ID);
        const reviews = await fetchEntries(REVIEWS_COLLECTION_ID);
        const services = await fetchEntries(COLLECTION_ID_SERVICES);

        setCounts({
          courses: courses.length,
          reviews: reviews.length,
          services: services.length,
        });
      } catch (error) {
        console.error("Failed to fetch counts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="container pt-24">
      <div className="flex flex-wrap gap-10 justify-center max-w-4xl">
        {loading ? (
          <p className="text-center text-lg text-gray-500">Loading...</p>
        ) : (
          <>
            <Card title="Курсы" count={counts.courses} />
            <Card title="Услуги" count={counts.services} />
            <Card title="Отзывы" count={counts.reviews} />
          </>
        )}
      </div>
    </div>
  );
};

const Card = ({ title, count }) => (
  <div className="bg-white text-black rounded-lg p-10 text-center w-72 h-48 shadow-lg flex flex-col justify-center">
    <h2 className="mb-3 text-xl font-medium">{title}</h2>
    <p className="text-4xl font-bold">{count}</p>
    <p className="text-sm mt-2">Количество добавленных {title.toLowerCase()}</p>
  </div>
);

export default Home;
