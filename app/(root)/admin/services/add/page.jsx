"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT,
  COLLECTION_ID_SERVICES,
} from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { addEntry } from "@/lib/api";
import { CircleX } from "lucide-react";
import { Client, Storage } from "appwrite";

const AddService = () => {
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(APPWRITE_PROJECT);

  const storage = new Storage(client);

  const [formData, setFormData] = useState({
    Name: "",
    Description: "",
    Details: "",
    Price: 0,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
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
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.Name ||
      !formData.Price ||
      !formData.Description ||
      !formData.Details
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

      const bucketId = "674fe4980016f22565b8";
      const fileId = "unique()";
      const uploadResponse = await storage.createFile(
        bucketId,
        fileId,
        imageFile
      );

      console.log(uploadResponse);
      if (!uploadResponse) return;

      // Ensure APPWRITE_ENDPOINT is a valid URL
      if (!APPWRITE_ENDPOINT || !APPWRITE_ENDPOINT.startsWith("http")) {
        throw new Error("Invalid APPWRITE_ENDPOINT.");
      }

      const imageUrl = `${APPWRITE_ENDPOINT}/storage/buckets/674fe4980016f22565b8/files/${uploadResponse.$id}/view?project=${APPWRITE_PROJECT}`;
      console.log("Generated Image URL:", imageUrl);

      const updatedFormData = {
        ...formData,
        Image: imageUrl,
        Price: parseFloat(formData.Price),
      };
      console.log(updatedFormData);

      await addEntry(COLLECTION_ID_SERVICES, updatedFormData);

      router.push("/admin/services");
    } catch (error) {
      console.error("Failed to add service:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/admin/services");
  };

  return (
    <div className="container px-4 pt-24 flex flex-col items-center">
      <div className="flex w-full mb-7">
        <button
          onClick={handleSubmit}
          className={`px-5 py-2 bg-white text-text rounded cursor-pointer ${
            loading ? "cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Подождите..." : "Добавить услугу"}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="px-5 text-white flex gap-3 py-2 bg-primary text-brown-700 border-2 border-brown-700 rounded ml-7 cursor-pointer"
        >
          <CircleX /> Отмена
        </button>
      </div>

      <div className="w-full bg-brown-600 rounded-xl p-5 text-text">
        <div className="flex justify-between pr-12">
          <div className="w-1/2">
            <div className="mb-5">
              <label className="block mb-2 font-semibold">
                Название услуги
              </label>
              <input
                type="text"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                placeholder="введите текст"
                className="w-full p-3 rounded border-none text-text"
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 font-semibold">Описание</label>
              <textarea
                name="Description"
                value={formData.Description}
                onChange={handleChange}
                placeholder="введите текст"
                className="w-full h-24 p-3 rounded border-none text-text resize-none"
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 font-semibold">Детали</label>
              <textarea
                name="Details"
                value={formData.Details}
                onChange={handleChange}
                placeholder="введите текст"
                className="w-full h-24 p-3 rounded border-none text-text resize-none"
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 font-semibold">Детали</label>
              <input
                type="number"
                name="Price"
                value={formData.Price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full p-3 rounded border-none text-text resize-none"
              />
            </div>
          </div>

          <div className="w-2/5 text-center mt-6">
            <div className="bg-gray-300 rounded-xl h-[355px] flex justify-center items-center relative overflow-hidden">
              <input
                type="file"
                onChange={handleFileChange}
                className="absolute w-full h-full opacity-0 cursor-pointer"
              />
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-w-full max-h-full object-cover"
                />
              ) : (
                <span className="font-semibold text-brown-700">
                  Загрузить фото
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddService;
