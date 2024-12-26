"use client";
import { menuItems } from "@/lib/utils";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className="sticky top-20 w-1/5 mt-20 h-[calc(100vh-80px)] bg-white border-r border-gray-200 p-5 shadow-md">
      {menuItems.map((item, index) => (
        <div
          key={index}
          onClick={() => router.push(item.path)}
          className={`flex items-center mb-5 cursor-pointer p-3 ${
            index < menuItems.length - 1 ? "border-b border-gray-100" : ""
          }`}
        >
          <div className="w-10 h-10 flex justify-center items-center bg-gray-100 rounded-lg text-xl text-[#8B5E3C] mr-4">
            {item.icon}
          </div>

          <div>
            <h3 className="m-0 text-lg font-bold text-gray-800">
              {item.title}
            </h3>
            <p className="m-0 mt-1 text-sm text-gray-500">{item.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
