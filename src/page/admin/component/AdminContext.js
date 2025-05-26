
import React, { createContext, useContext, useState } from "react";

// ✅ สร้าง Context
const AdminContext = createContext();

// ✅ สร้าง Provider ที่ใช้ใน App
export const AdminProvider = ({ children }) => {
  const [adminId, setAdminId] = useState(null);

  return (
    <AdminContext.Provider value={{ adminId, setAdminId }}>
      {children}
    </AdminContext.Provider>
  );
};

// ✅ สร้าง Hook เพื่อใช้ adminId ได้ง่าย
export const useAdmin = () => useContext(AdminContext);

