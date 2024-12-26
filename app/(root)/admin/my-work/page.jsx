"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { APPWRITE_PROJECT, MY_WORK_COLLECTION_ID } from "@/lib/utils";
import { deleteEntry, fetchEntries } from "@/lib/api";
import CustomImage from "@/components/shared/customImage";
import { Client, Storage } from "appwrite";

const MyWork = () => {
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(APPWRITE_PROJECT);

  const storage = new Storage(client);
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = (await fetchEntries(MY_WORK_COLLECTION_ID)) || [];
        console.log(data);

        setWorks(data);
      } catch (err) {
        console.error("Error loading works:", err);
        setError("Xizmatlarni yuklashda xatolik yuz berdi.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleDelete = async (id, imageUrl) => {
    try {
      if (imageUrl) {
        const fileId = imageUrl.split("/").pop();
        if (fileId) {
          await storage.deleteFile("674fe4980016f22565b8", fileId);
        }
      }
      await deleteEntry(MY_WORK_COLLECTION_ID, id);
      setWorks((prevServices) =>
        prevServices.filter((service) => service.$id !== id)
      );
    } catch (err) {
      console.error("Error deleting service and image:", err);
      alert("Xizmatni o‘chirishda xatolik yuz berdi. Qaytadan urinib ko‘ring.");
    }
  };

  if (loading)
    return <p className="text-center container pt-24">Loading my work...</p>;
  if (error)
    return <p className="text-center text-red-500 container pt-24">{error}</p>;

  return (
    <div className="container pt-24 px-4">
      <button
        onClick={() => router.push("/admin/services/add")}
        className="mb-5 px-5 py-3 bg-primary text-white rounded-md font-bold hover:bg-opacity-90"
      >
        Yangi ish qo‘shish
      </button>
      <div className="flex flex-wrap gap-5">
        {works.length > 0 ? (
          works.map((service) => (
            <div
              key={service.$id}
              className="bg-primary text-white rounded-lg p-5 max-w-sm shadow-md text-center space-y-2"
            >
              <h2>
                <strong>Sarlavha:</strong> {service.Name || "Noma’lum"}
              </h2>
              <p>
                <strong>Tavsif:</strong> {service.Description || "Tavsif yo‘q"}
              </p>
              <p>
                <strong>Batafsil:</strong>{" "}
                {service.Details || "Ma’lumotlar yo‘q"}
              </p>
              <p className="text-sm mb-2">
                <strong>Цена:</strong> ${service.Price}
              </p>
              {service.Image ? (
                <div className="relative h-40">
                  <CustomImage
                    src={service.Image}
                    alt={service.Name || "Xizmat rasmi"}
                    className="object-cover"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                </div>
              ) : (
                <p>Rasm mavjud emas</p>
              )}
              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => router.push(`/admin/services/${service.$id}`)}
                  className="px-4 py-2 bg-white text-primary rounded-md font-bold hover:bg-gray-100"
                >
                  Tahrirlash
                </button>
                <button
                  onClick={() => handleDelete(service.$id, service.Image)}
                  className="px-4 py-2 bg-white text-primary rounded-md font-bold hover:bg-gray-100"
                >
                  O‘chirish
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-lg">Xizmatlar mavjud emas.</p>
        )}
      </div>
    </div>
  );
};

export default MyWork;
