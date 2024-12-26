"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { APPWRITE_PROJECT, REVIEWS_COLLECTION_ID } from "@/lib/utils";
import { deleteEntry, fetchEntries } from "@/lib/api";
import CustomImage from "@/components/shared/customImage";
import { Client, Storage } from "appwrite";

const Reviews = () => {
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(APPWRITE_PROJECT);

  const storage = new Storage(client);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchEntries(REVIEWS_COLLECTION_ID);
        setReviews(data);
      } catch (err) {
        setError("Failed to load reviews.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleDelete = async (id, imageUrl) => {
    try {
      if (imageUrl) {
        const urlParts = imageUrl.split("/");
        const fileId = urlParts[urlParts.length - 2];

        await storage.deleteFile("67518f5b0030f28c87a5", fileId);
      }

      await deleteEntry(REVIEWS_COLLECTION_ID, id);

      setReviews(reviews.filter((review) => review.$id !== id));
    } catch (error) {
      console.error("Failed to delete review and image:", error);
    }
  };

  if (loading)
    return (
      <p className="container pt-24 px-4 w-full text-center">
        Loading reviews...
      </p>
    );
  if (error)
    return <p className="container pt-24 px-4 w-full text-center">{error}</p>;

  return (
    <div className="px-4 container pt-24">
      <button
        onClick={() => router.push("/admin/reviews/add")}
        className="mb-6 px-6 py-3 bg-primary text-white rounded-md font-bold hover:bg-brown-600"
      >
        Добавить новый отзыв
      </button>
      <div className="flex flex-wrap gap-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.$id}
              className="space-y-2 bg-primary text-white rounded-xl p-5 max-w-xs text-center shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-3">
                <strong>Заголовок:</strong> {review.Name}
              </h2>
              <p className="text-sm mb-3">
                <strong>Описание:</strong> {review.Description}
              </p>
              <p className="text-sm mb-3">
                <strong>Дата:</strong> {review.Data}
              </p>
              {review.Image && (
                <div className="relative h-40">
                  <CustomImage
                    src={review.Image}
                    alt={review.Name || "Xizmat rasmi"}
                    className="object-cover"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                </div>
              )}
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => router.push(`/admin/reviews/${review.$id}`)}
                  className="px-4 py-2 bg-white text-brown-700 rounded-md font-bold text-text"
                >
                  Изменить
                </button>
                <button
                  onClick={() => handleDelete(review.$id, review.Image)}
                  className="px-4 py-2 bg-white text-brown-700 rounded-md font-bold text-text"
                >
                  Удалить
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-lg">No reviews available.</p>
        )}
      </div>
    </div>
  );
};

export default Reviews;
