import React, { useState,useEffect } from "react";
import { API_URL } from '@env';
import { View, Text, TextInput, Button, Alert, ActivityIndicator, TouchableOpacity, 
  SafeAreaView, ScrollView, Image, StyleSheet, Dimensions } from "react-native";
import { useParent } from "./component/ParentContext"; // ✅ Import useParent


import GraphButton from "./button/graph-Button-std";

import StudentButton from "./button/student-Button";
import MessageButton from "./button/message-Button";
import axios from "axios";

import { LineChart } from "react-native-chart-kit";
const severityMapping = {
  High: 3,
  Medium: 2,
  Low: 1,
};

const { width, height } = Dimensions.get('window');


const StudentHistory = ({ route, navigation }) => {
  const { parentId } = useParent();
  const { studentId, fname, lname } = route.params;
  const [data, setData] = useState([]);
  
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  


  useEffect(() => {
    if (!parentId || !studentId) return;
  
    setLoading(true); // เริ่มโหลดข้อมูล
  
    // ดึงข้อมูลจากทั้งสอง API พร้อมกัน
    const fetchData = async () => {
      try {
        // ดึงข้อมูลกราฟ
        const graphResponse = await axios.get(
          `${API_URL}/Parent-System/student-graph.php?parent=${parentId}&student=${studentId}`
        );
  
        if (!graphResponse.data || graphResponse.data.error) {
          Alert.alert("Error", graphResponse.data.error || "Failed to fetch data");
          return;
        }
  
        let fixedData = graphResponse.data.map((item) => {
          const dateObj = new Date(item.time);
          return {
            level: severityMapping[item.level] || 0, // แปลง level
            date: dateObj.toLocaleDateString(), // แปลงเป็นวันที่
            time: dateObj.toLocaleTimeString(), // แปลงเป็นเวลา
          };
        });
  
        if (fixedData.length > 0) {
          fixedData = [{ level: 0, date: "Start", time: "" }, ...fixedData];
        }
  
        setData(fixedData);
  
        // ดึงข้อมูลประวัติ
        const historyResponse = await axios.get(
          `${API_URL}/Parent-System/student-history.php?parent=${parentId}&student=${studentId}`
        );
  
        if (!historyResponse.data || historyResponse.data.error) {
          setAccessDenied(true);
        } else {
          setHistory(historyResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        Alert.alert("ผิดพลาด", "ไม่สามารถโหลดข้อมูลได้");
      } finally {
        setLoading(false); // เสร็จสิ้นการโหลดข้อมูล
      }
    };
  
    fetchData(); // เรียกใช้ฟังก์ชันดึงข้อมูล
  
  }, [parentId, studentId]);
  
  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  

 const chartConfig = {
  backgroundColor: "#ffffff",
  backgroundGradientFrom: "#f0f0f0",  // เปลี่ยนสีพื้นหลังของกราฟ
  backgroundGradientTo: "#f0f0f0",  // เปลี่ยนสีพื้นหลังของกราฟ
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,  // เปลี่ยนสีเส้นกราฟให้ฟ้า
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,  // สีข้อความบนแกน X และ Y
  style: {
    borderRadius: 16, // เพิ่มความมนมุมของกราฟ
    paddingRight: 10, // เพิ่มการเว้นระยะจากขอบขวา
  },
  propsForDots: {
    r: "6",  // ทำให้จุดในกราฟใหญ่ขึ้น
    strokeWidth: "3",  // เพิ่มความหนาของเส้นรอบจุด
    stroke: "#007bff",  // เปลี่ยนสีเส้นรอบจุดให้ฟ้า
  },
  propsForLabels: {
    fontSize: 12,  // ขนาดฟอนต์ในแกน X และ Y
    fontFamily: "Kanit-Bold",  // ใช้ฟอนต์ที่ตั้งไว้
    fontWeight: "bold",  // ให้ฟอนต์หนาขึ้น
  },
  yAxisLabel: "",  // ไม่ให้มีป้ายกำกับที่แกน Y
  yAxisSuffix: "",
  yLabelsOffset: 10,  // ระยะห่างระหว่างข้อความในแกน Y
  yAxisInterval: 1,  // ระยะห่างของระดับแกน Y
  fromZero: true,  // เริ่มต้นจากศูนย์
  yMin: 0,  // กำหนดค่าต่ำสุดของแกน Y
  yMax: 3,  // กำหนดค่าสูงสุดของแกน Y
};

const chartData = {
  labels: data.map((item) => {
    const dateParts = item.date.split(" ");  // แบ่งวันที่
    return `${dateParts[0]}\n${item.time}`;  // แสดงวันที่และเวลา
  }),

  datasets: [
    {
      data: data.map((item) => item.level),  // ใช้ข้อมูลระดับความรุนแรง
      strokeWidth: 2,  // ความหนาของเส้นกราฟ
    },
  ],
};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* BOX (1) | Header Section*/}
        <View style={styles.logoContainer}>
          <GraphButton navigation={navigation} />
        </View>

        {/* Distance between BOX 1 and BOX 2 */}
        <View style={styles.spacing} />

        {/* BOX (2) | Topic Section */}
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {fname} {lname} {/* แสดงชื่อของนักเรียนที่เลือก */}
          </Text>
        </View>

        {/* BOX (3) | Action Section */}
        <View style={styles.buttonContainer}>
        <View style={{ padding: 10 }}>
      {data.length > 0 ? (
        <>
          <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
            {/* ข้อความกำกับแกน Y (อยู่นิ่ง) */}
  
            {/* กราฟที่เลื่อนได้ */}
            <ScrollView horizontal showsHorizontalScrollIndicator={true}>
              <View style={{ paddingLeft: 10 }}>
              <LineChart  
  data={chartData}
  width={Math.max(Dimensions.get("window").width, data.length * 200)} // ✅ ห่างกันมากขึ้น
  height={500}
  yAxisLabel=""
  yAxisSuffix=""
  yLabelsOffset={0}
  fromZero={false} 
  segments={3} 
  chartConfig={{
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#f8f9fa",
    backgroundGradientTo: "#f8f9fa",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 10,
      paddingTop: height * 0.03, // ✅ เพิ่มระยะห่างด้านบน
    },
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: "#0000ff",
    },
  }}
  
/>

    </View>
  </ScrollView>
</View>
        </>
      ) : (
        <Text style={{ textAlign: "center" }}>ไม่มีข้อมูล</Text>
      )}
      <Text style={{ textAlign: "center", marginTop: 10,color:"white",fontFamily: "Kanit-Bold" }}>วันเวลา (แกน X)</Text>
      <Text style={{ textAlign: "center", marginTop: 10,color:"white",fontFamily: "Kanit-Bold" }}>ระดับความรุนแรง (แกน y)</Text>
    </View>
         
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userText: {
    fontSize: height * 0.02,
    fontFamily: 'Kanit-Bold',
    color: "#333",
    marginRight: 10,
    backgroundColor:'white',
    padding: height * 0.015,
    borderRadius: 20,
  },
  logoutButton: {
    backgroundColor: "red",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  logoutText: {
    color: "white",
    fontFamily: 'Kanit-Bold',
  },
  studentContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: height * 0.01,
  },
  studentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  studentText: {
    fontFamily: 'Kanit-Bold',
    fontSize: height * 0.022,
    flex: 1,
    color: "#000",
  },
  selectButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  selectButtonText: {
    fontFamily: 'Kanit-Bold',
    fontSize: height * 0.02,
    fontStyle: "Bold",
    color: "#FFFFFF", // เปลี่ยนเป็นสีขาว
  },



  container: {
    flex: 1,
    backgroundColor: "#F8E7B2",
  },
  scrollContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: height * 0.05, // เพิ่ม padding ให้เลื่อนลงมาได้
  },
  logoContainer: {
    backgroundColor: "#96622F",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: height * 0.01, 
    paddingTop: height * 0.01,
    
  },
  logo: {
    width: width * 0.6,  // ทำให้ขนาดปรับตามหน้าจอ
    height: height * 0.15,
    resizeMode: "contain",
  },
  spacing: {
    height: height * 0.05, // เพิ่มระยะห่างระหว่างกล่องที่หนึ่งกับกล่องที่สอง
  },
  header: {
    backgroundColor: "#6C3B0A",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: height * 0.025,
    borderTopLeftRadius: 20, // เพิ่มความมนด้านบนซ้าย
    borderTopRightRadius: 20, // เพิ่มความมนด้านบนขวา
  },
  headerText: {
    fontFamily: 'Kanit-Bold',
    fontSize: height * 0.03, 
    color: '#FFFFFF',
    textAlign: 'center',
    
  },
  historyItem: {
    backgroundColor: "#F1E1B3", // สีพื้นหลังของแต่ละไอเท็ม
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: width * 0.65,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
    
  },
  time: {
    fontFamily: 'Kanit-Bold',
    fontSize: height * 0.02,
    color: "#000",
    marginRight: 10, // เพิ่มระยะห่างระหว่าง time และ level
    
  },
  level: {
    fontFamily: 'Kanit-Bold',
    fontSize: height * 0.02,
    color: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  typeContainer: {
    backgroundColor: "#fff",  // พื้นหลังสีขาว
    borderRadius: 10,         // ความมนมุม
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center",     // จัดให้อยู่ตรงกลางภายใน
    justifyContent: "center", // จัดให้อยู่ตรงกลาง
      
    
  },
  type: {
    fontFamily: 'Kanit-Bold',
    fontSize: height * 0.02,
    color: "#000",
    textAlign: "center",  // ให้ข้อความ type อยู่ตรงกลาง
    flexWrap: "wrap",     // ให้ข้อความ wrap เมื่อยาวเกิน
    maxWidth: "100%",     // ข้อความไม่เกินขนาด box
  },
  detail: {
    fontFamily: 'Kanit-Bold',
    fontSize: height * 0.02,
    color: "#333",
     
    textAlign: "left",  // ให้ข้อความ detail อยู่ทางซ้าย
  },
  buttonContainer: {
    backgroundColor: "#96622F",
    width: "80%",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: height * 0.05,
  },
});

export default StudentHistory;
