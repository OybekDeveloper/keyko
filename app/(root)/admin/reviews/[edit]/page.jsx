"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT,
  REVIEWS_COLLECTION_ID,
} from "@/lib/utils";
import { fetchEntries, updateEntry } from "@/lib/api";
import { CircleX } from "lucide-react";
import { Client, Storage } from "appwrite";

const EditReview = ({ params }) => {
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(APPWRITE_PROJECT);

  const storage = new Storage(client);

  const resolvedParams = React.use(params); // Unwrap the Promise
  const reviewId = resolvedParams.edit;
  const [formData, setFormData] = useState({
    Name: "",
    Description: "",
    Date: "",
    Image: null,
  });
  const [oldImage, setOldImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const loadReview = async () => {
    try {
      const reviews = await fetchEntries(REVIEWS_COLLECTION_ID);
      const review = reviews.find((review) => review.$id === reviewId);
      if (review) {
        setFormData({
          Name: review.Name,
          Description: review.Description,
          Date: review.Data,
        });
        setOldImage(review.Image);
      }
    } catch (err) {
      console.error("Failed to load review:", err);
      setError("Failed to load review details.");
    }
  };

  useEffect(() => {
    loadReview();
  }, [reviewId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, Image: e.target.files[0] });
  };

  const handleUpdate = async () => {
    const { Name, Description, Date, Image } = formData;

    if (!Name.trim() || !Description.trim() || !Date.trim()) {
      console.error("Please provide valid inputs.");
      return;
    }

    let newImageUrl = oldImage;

    try {
      setLoading(true);

      if (Image) {
        const uniqueFileId = ID.unique();

        const uploadedFile = await storage.createFile(
          "67518f5b0030f28c87a5",
          uniqueFileId,
          Image
        );
        newImageUrl = uploadedFile.$id
          ? `${APPWRITE_ENDPOINT}/storage/buckets/67518f5b0030f28c87a5/files/${uploadedFile.$id}/view?project=${APPWRITE_PROJECT}`
          : newImageUrl;

        if (oldImage) {
          const oldFileId = oldImage.split("/").at(-2);
          await storage.deleteFile("67518f5b0030f28c87a5", oldFileId);
        }
      }

      const updatedReview = {
        Name,
        Description,
        Data: Date,
        Image: newImageUrl,
      };

      await updateEntry(REVIEWS_COLLECTION_ID, reviewId, updatedReview);
      router.push("/admin/reviews");
    } catch (error) {
      console.error("Failed to update review:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/reviews");
  };

  return (
    <div className="container px-4 pt-24 flex flex-col items-center">
      <div className="flex w-full mb-6">
        <button
          onClick={handleUpdate}
          className="px-6 py-2 bg-white text-text rounded-md cursor-pointer disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Подождите..." : "Изменить"}
        </button>
        <button
          onClick={handleCancel}
          className="flex gap-3 px-5 py-2 bg-primary text-white border-2 border-brown-600 rounded ml-8"
        >
          <CircleX /> Отмена
        </button>
      </div>

      <div className="w-full bg-brown-700 text-text rounded p-6">
        <div className="flex justify-between items-start gap-4">
          <div className="w-1/2 pr-4">
            <div className="mb-4">
              <label className="block mb-1 font-bold">Название отзыва</label>
              <input
                type="text"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                placeholder="Enter name"
                className="w-full p-2 rounded text-black"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-bold">Описание</label>
              <textarea
                name="Description"
                value={formData.Description}
                onChange={handleChange}
                placeholder="Enter description"
                className="w-full p-2 h-24 rounded resize-none text-black"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-bold">Дата</label>
              <input
                type="text"
                name="Date"
                value={formData.Date}
                onChange={handleChange}
                placeholder="Enter date (e.g., 2024year)"
                className="w-full p-2 rounded text-black"
              />
            </div>
          </div>

          <div className="w-1/2 bg-gray-300 rounded flex justify-center items-center relative h-80 mt-6">
            <input
              type="file"
              onChange={handleFileChange}
              className="absolute w-full h-full opacity-0 cursor-pointer"
            />
            <span className="font-bold text-brown-700">Загрузить фото</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditReview;
