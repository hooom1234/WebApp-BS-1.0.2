import React, { createContext, useContext, useState } from "react";

// ✅ สร้าง Context
const StudentContext = createContext();

// ✅ สร้าง Provider ที่ใช้ใน App
export const StudentProvider = ({ children }) => {
  const [studentId, setStudentId] = useState(null);

  return (
    <StudentContext.Provider value={{ studentId, setStudentId }}>
      {children}
    </StudentContext.Provider>
  );
};

// ✅ ใช้ useStudent() ได้ถูกต้อง
export const useStudent = () => useContext(StudentContext);
