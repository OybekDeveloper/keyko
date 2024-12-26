"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchEntries } from "@/lib/api";
import { APPWRITE_PROJECT, COLLECTION_ID } from "@/lib/utils";
import CustomImage from "@/components/shared/customImage";
import { Client, Storage } from "appwrite";

// Replace with the appropriate bucket ID for courses
const COURSES_BUCKET_ID = "67517cf0003612a28451";

const Courses = () => {
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(APPWRITE_PROJECT);

  const storage = new Storage(client);

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchEntries(COLLECTION_ID);
        setCourses(data);
      } catch (err) {
        setError("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const handleDelete = async (id, imageUrl) => {
    try {
      if (imageUrl) {
        const urlParts = imageUrl.split("/");
        const fileId = urlParts[urlParts.length - 2];
        await storage.deleteFile(COURSES_BUCKET_ID, fileId);
      }

      await deleteEntry(COLLECTION_ID, id);
      setCourses(courses.filter((course) => course.$id !== id));
    } catch (error) {
      console.error("Failed to delete course and image:", error);
    }
  };

  if (loading)
    return (
      <p className="px-4 pt-24 container text-center mt-4">
        Loading courses...
      </p>
    );
  if (error)
    return (
      <p className="px-4 pt-24 container text-center text-red-500 mt-4">
        {error}
      </p>
    );

  return (
    <div className="container px-4 pt-24">
      <button
        onClick={() => router.push("/admin/courses/add")}
        className="bg-primary mb-6 px-4 py-2 text-white rounded-lg font-bold"
      >
        Добавить новый курс
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course.$id}
              className="bg-primary text-white rounded-lg p-4 shadow-lg flex justify-between items-center flex-col"
            >
              <h2 className="text-lg font-bold mb-2">
                <strong>Заголовок:</strong> {course.Name}
              </h2>
              <p className="text-sm mb-2">
                <strong>Описание:</strong> {course.Description}
              </p>
              <p className="text-sm mb-2">
                <strong>Детали:</strong> {course.Details}
              </p>
              <p className="text-sm mb-2">
                <strong>Цена:</strong> ${course.Price}
              </p>
              {course.Image && (
                <img
                  src={course.Image}
                  alt={course.Name || "Xizmat rasmi"}
                  className="h-40 pb-4 object-cover rounded-md "
                />
              )}
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => router.push(`/admin/courses/${course.$id}`)}
                  className="px-3 py-1 bg-white text-text rounded-lg font-bold hover:bg-gray-200"
                >
                  Изменить
                </button>
                <button
                  onClick={() => handleDelete(course.$id, course.Image)}
                  className="px-3 py-1 bg-white text-text rounded-lg font-bold hover:bg-gray-200"
                >
                  Удалить
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-lg">No courses available.</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
