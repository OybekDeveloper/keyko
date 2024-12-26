"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Client, ID, Storage } from "appwrite";
import { fetchEntries, updateEntry } from "@/lib/api";
import {
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT,
  COLLECTION_ID,
} from "@/lib/utils";
import { CircleX } from "lucide-react";

const EditCourse = ({ params }) => {
  const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(APPWRITE_PROJECT);

const storage = new Storage(client);

  const resolvedParams = React.use(params); // Unwrap the Promise
  const courseId = resolvedParams.edit;
  const [formData, setFormData] = useState({
    Name: "",
    Description: "",
    Details: "",
    Price: "",
    Image: null,
  });
  const [oldImage, setOldImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const loadCourse = async () => {
    try {
      const courses = await fetchEntries(COLLECTION_ID);
      const course = courses.find((course) => course.$id === courseId);
      if (course) {
        setFormData({
          Name: course.Name,
          Description: course.Description,
          Details: course.Details,
          Price: course.Price,
        });
        setOldImage(course.Image);
      }
    } catch (err) {
      console.error("Failed to load course:", err);
      setError("Failed to load course details.");
    }
  };

  useEffect(() => {
    if (courseId) {
      loadCourse();
    }
  }, [courseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, Image: e.target.files[0] });
  };

  const handleUpdate = async () => {
    const { Name, Description, Details, Price, Image } = formData;

    if (
      !Name.trim() ||
      !Description.trim() ||
      !Details.trim() ||
      isNaN(Price) ||
      Price <= 0
    ) {
      console.error("Please provide valid inputs.");
      return;
    }

    let newImageUrl = oldImage;

    try {
      setLoading(true);

      if (Image) {
        const uniqueFileId = ID.unique();
        const bucketId = "67517cf0003612a28451";
        const uploadedFile = await storage.createFile(
          bucketId,
          uniqueFileId,
          Image
        );
        newImageUrl = uploadedFile.$id
          ? `${APPWRITE_ENDPOINT}/storage/buckets/${bucketId}/files/${uploadedFile.$id}/view?project=${APPWRITE_PROJECT}`
          : newImageUrl;

        if (oldImage) {
          const oldFileId = oldImage.split("/").at(-2);
          await storage.deleteFile(bucketId, oldFileId);
        }
      }

      const updatedData = {
        Name,
        Description,
        Details,
        Price: parseFloat(Price),
        Image: newImageUrl,
      };

      await updateEntry(COLLECTION_ID, courseId, updatedData);
      router.push("/admin/courses");
    } catch (error) {
      console.error("Failed to update course:", error);
      setError("Failed to update course.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/admin/courses");
  };

  return (
    <div className="flex flex-col items-center pt-24 px-4 container">
      <div className="flex w-full mb-8">
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

      <div className="w-full bg-brown-600 rounded-xl p-6 text-text">
        <div className="flex justify-between gap-4">
          <div className="w-1/2">
            <div className="mb-5">
              <label className="block mb-2 font-bold">Название курса</label>
              <input
                type="text"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                placeholder="Enter text"
                className="w-full p-3 rounded-md border-none text-black text-lg"
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 font-bold">Описание</label>
              <textarea
                name="Description"
                value={formData.Description}
                onChange={handleChange}
                placeholder="Enter text"
                className="w-full h-28 p-3 rounded-md border-none resize-none text-black text-lg"
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 font-bold">Детали</label>
              <textarea
                name="Details"
                value={formData.Details}
                onChange={handleChange}
                placeholder="Enter text"
                className="w-full h-28 p-3 rounded-md border-none resize-none text-black text-lg"
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 font-bold">Цена</label>
              <input
                type="number"
                name="Price"
                value={formData.Price}
                onChange={handleChange}
                placeholder="Enter price"
                className="w-full p-3 rounded-md border-none text-black text-lg"
              />
            </div>
          </div>

          <div className="w-1/2 bg-gray-300 rounded-xl flex justify-center items-center relative mt-5">
            <input
              type="file"
              onChange={handleFileChange}
              className="absolute w-full h-full opacity-0 cursor-pointer"
            />
            <span className="font-bold text-brown-600 text-lg">
              Загрузить фото
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
