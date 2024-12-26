"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT,
  COLLECTION_ID,
} from "@/lib/utils";
import { addEntry } from "@/lib/api";
import { CircleX } from "lucide-react";
import { Client, Storage } from "appwrite";

const AddCourse = () => {
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(APPWRITE_PROJECT);

  const storage = new Storage(client);

  const [formData, setFormData] = useState({
    Name: "",
    Description: "",
    Details: "",
    Price: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.Name ||
      !formData.Description ||
      !formData.Details ||
      !formData.Price
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (!imageFile) {
      alert("Please upload an image.");
      return;
    }

    try {
      setLoading(true);

      const bucketId = "67517cf0003612a28451";
      const fileId = "unique()";

      console.log("Uploading file...");
      const uploadResponse = await storage.createFile(
        bucketId,
        fileId,
        imageFile
      );
      console.log("Upload Response:", uploadResponse);

      const imageUrl = `${APPWRITE_ENDPOINT}/storage/buckets/${bucketId}/files/${uploadResponse.$id}/view?project=${APPWRITE_PROJECT}`;
      console.log("Image URL:", imageUrl);

      const updatedFormData = {
        ...formData,
        Price: parseFloat(formData.Price),
        Image: imageUrl,
      };

      console.log("Adding entry to database:", updatedFormData);
      await addEntry(COLLECTION_ID, updatedFormData);

      router.push("/admin/courses");
    } catch (error) {
      console.error("Failed to add course:", error);
      alert("Failed to add course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/admin/courses");
  };

  return (
    <div className="flex flex-col items-center container px-4 pt-24">
      <div className="flex w-full  mb-8">
        <button
          onClick={handleSubmit}
          className={`px-5 py-2 bg-white text-text  border-none rounded cursor-pointer ${
            loading ? "cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Подождите..." : "Добавить курс"}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="px-5 text-white flex gap-3 py-2 bg-primary justify-center items-center text-brown-700 border-2 border-brown-700 rounded ml-7 cursor-pointer"
        >
          <CircleX /> Отмена
        </button>
      </div>

      <div className="w-full  bg-brown-500 rounded-lg p-5 text-text">
        <div className="flex justify-between gap-4 items-center">
          <div className="w-1/2">
            <div className="mb-5">
              <label className="block mb-2 font-bold">Название курса</label>
              <input
                type="text"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                placeholder="введите текст"
                className="w-full p-3 rounded border-none text-black text-lg"
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 font-bold">Описание</label>
              <textarea
                name="Description"
                value={formData.Description}
                onChange={handleChange}
                placeholder="введите текст"
                className="w-full h-24 p-3 rounded border-none text-black text-lg resize-none"
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 font-bold">Детали</label>
              <textarea
                name="Details"
                value={formData.Details}
                onChange={handleChange}
                placeholder="введите текст"
                className="w-full h-24 p-3 rounded border-none text-black text-lg resize-none"
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 font-bold">Цена</label>
              <input
                type="number"
                name="Price"
                value={formData.Price}
                onChange={handleChange}
                placeholder="введите цену"
                className="w-full p-3 rounded border-none text-black text-lg"
              />
            </div>
          </div>

          <div className="w-1/2 bg-gray-300 rounded-lg flex justify-center items-center relative h-80 mt-6 overflow-hidden">
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="absolute w-full h-full opacity-0 cursor-pointer"
            />
            {imageFile ? (
              <div className="w-full h-full">
                {imageFile.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(imageFile)}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={URL.createObjectURL(imageFile)}
                    controls
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            ) : (
              <span className="font-bold text-brown-700 text-lg">
                Загрузить фото или видео
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
