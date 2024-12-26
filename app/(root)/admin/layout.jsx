import React from "react";
import Sidebar from "./_components/Sidebar";

const AdminRoot = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow">{children}</div>
    </div>
  );
};

export default AdminRoot;
