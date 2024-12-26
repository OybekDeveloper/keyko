"use client";

import React, { useState, useEffect } from "react";
import { Client, ID, Storage } from "appwrite";
import {
  APPWRITE_PROJECT,
  APPWRITE_ENDPOINT,
  COLLECTION_ID_SERVICES,
} from "@/lib/utils";
import { fetchEntries, updateEntry } from "@/lib/api";
import { useRouter } from "next/navigation";
import { CircleX } from "lucide-react";

const EditService = ({ params }) => {
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(APPWRITE_PROJECT);

  const storage = new Storage(client);

  const resolvedParams = React.use(params); // Unwrap the Promise
  const serviceId = resolvedParams.edit;
  const [formData, setFormData] = useState({
    Name: "",
    Description: "",
    Details: "",
    Image: null,
    Price: 0,
  });
  const [oldImage, setOldImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const loadService = async () => {
    try {
      const services = await fetchEntries(COLLECTION_ID_SERVICES);
      const service = services.find((service) => service.$id === serviceId);
      if (service) {
        setFormData({
          Name: service.Name,
          Description: service.Description,
          Details: service.Details,
          Price: service.Price,
        });
        setOldImage(service.Image);
      }
    } catch (err) {
      console.error("Failed to load service:", err);
      setError("Failed to load service details.");
    }
  };

  useEffect(() => {
    if (serviceId) loadService();
  }, [serviceId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, Image: e.target.files[0] });
  };

  const handleUpdate = async () => {
    const { Name, Description, Details, Image } = formData;

    if (!Name.trim() || !Description.trim() || !Details.trim()) {
      console.error("Please provide valid inputs.");
      return;
    }

    let newImageUrl = oldImage;

    try {
      setLoading(true);

      if (Image) {
        const uniqueFileId = ID.unique();

        const uploadedFile = await storage.createFile(
          "674fe4980016f22565b8",
          uniqueFileId,
          Image
        );
        newImageUrl = uploadedFile.$id
          ? `${APPWRITE_ENDPOINT}/storage/buckets/674fe4980016f22565b8/files/${uploadedFile.$id}/view?project=${APPWRITE_PROJECT}`
          : newImageUrl;

        if (oldImage) {
          const oldFileId = oldImage.split("/").at(-2);
          await storage.deleteFile("674fe4980016f22565b8", oldFileId);
        }
      }

      const updatedData = {
        Name,
        Description,
        Details,
        Image: newImageUrl,
        Price: parseFloat(formData.Price),
      };

      await updateEntry(COLLECTION_ID_SERVICES, serviceId, updatedData);
      router.push("/admin/services");
    } catch (error) {
      console.error("Failed to update service:", error);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/admin/services");
  };

  return (
    <div className="container px-4 pt-24 flex flex-col items-center p-5">
      <div className="flex w-full mb-8">
        <button
          onClick={handleUpdate}
          className={`px-5 py-2 bg-white text-text rounded ${
            loading ? "cursor-not-allowed" : "cursor-pointer"
          }`}
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

      <div className="w-full bg-brown-800 rounded p-5 text-text">
        <div className="flex justify-between">
          <div className="w-[48%]">
            <div className="mb-5">
              <label className="block mb-2 font-bold">Название услуги</label>
              <input
                type="text"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                placeholder="введите текст"
                className="w-full p-2 rounded border-none text-black"
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 font-bold">Описание</label>
              <textarea
                name="Description"
                value={formData.Description}
                onChange={handleChange}
                placeholder="введите текст"
                className="w-full h-24 p-2 rounded border-none resize-none text-black"
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 font-bold">Детали</label>
              <textarea
                name="Details"
                value={formData.Details}
                onChange={handleChange}
                placeholder="введите текст"
                className="w-full h-24 p-2 rounded border-none resize-none text-black"
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

          <div className="w-[48%] bg-gray-300 rounded flex items-center justify-center relative h-[353px] mt-6">
            <input
              type="file"
              onChange={handleFileChange}
              className="absolute w-full h-full opacity-0 cursor-pointer"
            />
            <span className="font-bold text-brown-800 text-lg">
              Загрузить фото
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditService;
