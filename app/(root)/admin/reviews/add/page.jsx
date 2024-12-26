
"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT,
  REVIEWS_COLLECTION_ID,
} from "@/lib/utils";
import { CircleX } from "lucide-react";
import { Client, Storage } from "appwrite";
import { addEntry } from "@/lib/api";

const AddReview = () => {
  const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(APPWRITE_PROJECT);

const storage = new Storage(client);

  const [formData, setFormData] = useState({
    Name: "",
    Description: "",
    Date: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    const { Name, Description, Date } = formData;

    if (!Name || !Description || !Date) {
      alert("Please fill in all fields.");
      return;
    }

    if (!imageFile) {
      alert("Please upload an image.");
      return;
    }

    try {
      setLoading(true);

      const bucketId = "67518f5b0030f28c87a5";
      const fileId = "unique()";

      const uploadResponse = await storage.createFile(
        bucketId,
        fileId,
        imageFile
      );

      const imageUrl = `${APPWRITE_ENDPOINT}/storage/buckets/${bucketId}/files/${uploadResponse.$id}/view?project=${APPWRITE_PROJECT}`;

      const newReview = {
        Name,
        Description,
        Data: Date,
        Image: imageUrl,
      };

      await addEntry(REVIEWS_COLLECTION_ID, newReview);
      router.push("/admin/reviews");
    } catch (error) {
      console.error("Failed to add review:", error);
      alert("Failed to add review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/admin/reviews");
  };

  return (
    <div className="flex flex-col items-center container px-4 pt-24">
      <div className="flex w-full mb-8">
        <button
          onClick={handleAdd}
          className={`bg-white px-6 py-3 bg-brown-600 text-text rounded-md ${
            loading ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {loading ? "Подождите..." : "Добавить отзыв"}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="px-5 text-white flex gap-3 py-2 bg-primary justify-center items-center text-brown-700 border-2 border-brown-700 rounded ml-7 cursor-pointer"
        >
          <CircleX /> Отмена
        </button>
      </div>

      <div className="w-full bg-brown-600 rounded-xl p-8 text-text">
        <div className="flex justify-between gap-4">
          <div className="w-1/2">
            <div className="mb-6">
              <label className="block mb-2 font-bold">Название отзыва</label>
              <input
                type="text"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                placeholder="Введите текст"
                className="w-full p-3 rounded-md border-none text-black"
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-bold">Описание</label>
              <textarea
                name="Description"
                value={formData.Description}
                onChange={handleChange}
                placeholder="Введите текст"
                className="w-full h-24 p-3 rounded-md border-none text-black resize-none"
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-bold">Дата</label>
              <input
                type="text"
                name="Date"
                value={formData.Date}
                onChange={handleChange}
                placeholder="Введите дату"
                className="w-full p-3 rounded-md border-none text-black"
              />
            </div>
          </div>

          <div className="w-1/2 bg-gray-300 rounded-md flex justify-center items-center relative h-72 mt-6">
            <input
              type="file"
              onChange={handleFileChange}
              className="absolute w-full h-full opacity-0 cursor-pointer"
            />
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="max-w-full max-h-full object-cover rounded-lg"
              />
            ) : (
              <span className="font-bold text-brown-600 text-lg">
                Загрузить фото
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
