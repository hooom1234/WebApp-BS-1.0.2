import React, { createContext, useContext, useState } from "react";

// ✅ สร้าง Context
const UserContext = createContext();

// ✅ สร้าง Provider ที่ใช้ใน App
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

// ✅ สร้าง Hook เพื่อใช้ userId ได้ง่าย
export const useUser = () => useContext(UserContext);
