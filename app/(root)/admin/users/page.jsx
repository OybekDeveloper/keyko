"use client"

import { fetchEntries } from "@/lib/api";
import { COLLECTION_ID_USERS } from "@/lib/utils";
import React, { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchEntries(COLLECTION_ID_USERS);
        const transformedUsers = data.map((user) => ({
          id: user.$id,
          name: `${user.FirstName} ${user.LastName}`,
          phoneNumber: user.PhoneNumber,
          registrationDate: user.$createdAt,
          purchasedCourses: user.purchasedCourses || [],
        }));
        setUsers(transformedUsers);
      } catch (err) {
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const toggleAccordion = (userId) => {
    setExpandedUserId((prevId) => (prevId === userId ? null : userId));
  };

  if (loading) return <p className="container px-4 pt-24 text-center mt-4">Loading users...</p>;
  if (error) return <p className="container px-4 pt-24 text-center text-red-500 mt-4">{error}</p>;

  return (
    <div className="pt-24 container px-4">
      <h2 className="text-center text-2xl mb-6 font-semibold">Пользователи</h2>
      <div className="overflow-hidden rounded-lg shadow-lg">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-brown-600 text-text">
              <th className="py-3 px-4 text-left font-semibold">Пользователь</th>
              <th className="py-3 px-4 text-left font-semibold">Куплено курсов</th>
              <th className="py-3 px-4 text-left font-semibold">Телефон</th>
              <th className="py-3 px-4 text-left font-semibold">Дата регистрации</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <React.Fragment key={user.id}>
                <tr
                  onClick={() => toggleAccordion(user.id)}
                  className={`border-b hover:bg-gray-100 cursor-pointer ${
                    expandedUserId === user.id ? "bg-blue-50" : "bg-white"
                  }`}
                >
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.purchasedCourses.length}</td>
                  <td className="py-3 px-4">{user.phoneNumber}</td>
                  <td className="py-3 px-4">
                    {new Date(user.registrationDate).toLocaleDateString()}
                  </td>
                </tr>
                {expandedUserId === user.id && (
                  <tr>
                    <td colSpan="4" className="py-4 px-6 bg-gray-50">
                      <div>
                        <h4 className="mb-4 text-lg font-semibold text-gray-700">
                          Купленные курсы
                        </h4>
                        {user.purchasedCourses.length > 0 ? (
                          user.purchasedCourses.map((course, index) => (
                            <div
                              key={index}
                              className="mb-4 p-4 bg-brown-500 text-text rounded-lg shadow-md inline-block mr-4 w-72"
                            >
                              <p className="mb-2">
                                <strong>Курс:</strong> {course.courses.Name}
                              </p>
                              <p className="mb-2">
                                <strong>Способ оплаты:</strong> {course.PaymentMethod}
                              </p>
                              <p className="mb-2">
                                <strong>Дата покупки:</strong> {new Date(
                                  course.$createdAt
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-600">Нет купленных курсов.</p>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
