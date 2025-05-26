
// // ✅ สร้าง Context
// const ParentContext = createContext();

// // ✅ สร้าง Provider ที่ใช้ใน App
// export const ParentProvider = ({ children }) => {
//   const [parentId, setParentId] = useState("");

//   useEffect(() => {
//     const loadParentId = async () => {
//       const storedParentId = await AsyncStorage.getItem("parentId");
//       if (storedParentId) setParentId(storedParentId);
//     };
//     loadParentId();
//   }, []);

//   const saveParentId = async (id) => {
//     await AsyncStorage.setItem("parentId", id);
//     setParentId(id);
//   };

//   return (
//     <ParentContext.Provider value={{ parentId, setParentId: saveParentId }}>
//       {children}
//     </ParentContext.Provider>
//   );
// };

// // ✅ สร้าง Hook เพื่อใช้ parentId ได้ง่าย
// export const useParent = () => useContext(ParentContext);

import React, { createContext, useContext, useState } from "react";

// ✅ สร้าง Context
const ParentContext = createContext();

// ✅ สร้าง Provider ที่ใช้ใน App
export const ParentProvider = ({ children }) => {
  const [parentId, setParentId] = useState(null);

  return (
    <ParentContext.Provider value={{ parentId, setParentId }}>
      {children}
    </ParentContext.Provider>
  );
};

// ✅ สร้าง Hook เพื่อใช้ parentId ได้ง่าย
export const useParent = () => useContext(ParentContext);

