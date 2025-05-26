import React, { useState, useEffect } from "react";
import { API_URL } from '@env';
import { View, Text, TextInput, Button, Alert, ActivityIndicator, TouchableOpacity,
  SafeAreaView, ScrollView, Image, StyleSheet, Dimensions } from "react-native";
import { useParent } from "./component/ParentContext"; // ✅ Import useParent
import { Platform, PermissionsAndroid} from 'react-native';
import HistoryButton from "./button/history-Button-std";
import StudentButton from "./button/student-Button";
import MessageButton from "./button/message-Button";
import Share from 'react-native-share';
import axios from "axios";
import RNHTMLtoPDF from 'react-native-html-to-pdf';  // ✅ Import PDF library
import FileViewer from 'react-native-file-viewer';  // ✅ Import File Viewer for opening PDF

const { width, height } = Dimensions.get('window');

const StudentHistory = ({ route, navigation }) => {
  const { parentId } = useParent();
  const { studentId, fname, lname } = route.params; // ดึง fname และ lname จาก route.params

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    if (!parentId || !studentId) return;

    axios
      .get(`http://52.221.184.135/API/Parent-System/student-history.php?parent=${parentId}&student=${studentId}`)
      .then((response) => {
        if (!response.data || response.data.error) { // แก้ไขการตรวจสอบ error
          setAccessDenied(true);
        } else {
          setHistory(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching history:", error);
        Alert.alert("ผิดพลาด", "ไม่สามารถโหลดข้อมูลได้");
      })
      .finally(() => setLoading(false));
  }, [parentId, studentId]);

  const generatePDF = async () => {
    try {
      // สร้างเนื้อหาของพฤติกรรม
      const behaviorItems = history.map(item => `
        <p><strong>ประทับเวลา:</strong> ${item.time}</p>
        <p><strong>ระดับความรุนแรง:</strong> ${item.level}</p>
        <p><strong>ประเภท:</strong> ${item.type}</p>
        <p><strong>รายละเอียดเหตุการณ์:</strong> ${item.detail}</p>
        <hr />
      `).join('');
  
      // สร้างเนื้อหาหัวข้อและข้อมูลอื่น ๆ
      const htmlContent = `
        <html>
          <head>
            <style>
              @page {
                margin: 1cm;
              }
              body {
                font-family: Arial, sans-serif;
                font-size: 12px;
                margin: 0;
                padding: 0;
              }
              h1 {
                text-align: center;
                font-size: 16px;
                margin-top: 30px;
              }
              h2 {
                text-align: center;
                font-size: 14px;
                margin-top: 10px;
              }
              .content {
                margin-left: 1.5cm;
                margin-right: 2.5cm;
                margin-top: 0.5cm;
              }
              .history-item {
                margin-bottom: 5px;
              }
            </style>
          </head>
          <body>
            <h1>ผลการสังเกตุการณ์พฤติกรรม</h1>
            <h2>นักเรียน: ${fname} ${lname} และผู้ปกครอง : ${parentId}</h2>
            <div class="content">
              ${behaviorItems}
            </div>
          </body>
        </html>
      `;
  
      // สร้าง PDF ด้วยเนื้อหาที่กำหนด
      const options = {
        html: htmlContent,
        fileName: `student-history-${fname}-${lname}`,
        directory: 'Download', // จะบันทึกในโฟลเดอร์ Download
      };
  
      const file = await RNHTMLtoPDF.convert(options);
      const filePath = file.filePath.startsWith('file://') ? file.filePath : `file://${file.filePath}`;
  
      // แจ้งเตือนเมื่อ PDF สร้างเสร็จแล้ว
      Alert.alert(
        'สำเร็จ',
        `ไฟล์ PDF ถูกบันทึกไว้ที่:\n${file.filePath}\n\nคุณต้องการเปิดไฟล์หรือไม่?`,
        [
          { text: 'ไม่เปิด', style: 'cancel' },
          {
            text: 'เปิดไฟล์',
            onPress: async () => {
              try {
                if (Platform.OS === 'android') {
                  const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
                  );
                  if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    Alert.alert("Permission Denied", "Cannot open file without permission.");
                    return;
                  }
                }
                await FileViewer.open(filePath);
              } catch (err) {
                console.error("Error opening file:", err);
                Alert.alert('ผิดพลาด', 'ไม่สามารถเปิดไฟล์ได้ (อาจไม่มีแอป PDF)');
              }
            }
          }
        ]
      );
  
    } catch (err) {
      console.error("PDF generation error:", err);
      Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถสร้าง PDF ได้');
    }
  };

  
  
  
  

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* BOX (1) | Header Section */}
        <View style={styles.logoContainer}>
          <HistoryButton navigation={navigation} />
        </View>

        {/* Distance between BOX 1 and BOX 2 */}
        <View style={styles.spacing} />

        {/* BOX (2) | Topic Section */}
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {fname} {lname}
          </Text>
        </View>

        {/* BOX (3) | Action Section */}
        <View style={styles.buttonContainer}>
          {accessDenied ? (
            <Text style={{ color: "red", fontSize: 18, textAlign: "center" }}>
              รอการอนุมัติจากผู้ดูแลระบบ
            </Text>
          ) : history.length > 0 ? (
            history.map((item, index) => {
              let levelColor = "#28a745"; // default green
              if (item.level === "Medium") {
                levelColor = "#ffc107"; // yellow
              } else if (item.level === "High") {
                levelColor = "#dc3545"; // red
              }

              return (
                <View key={index} style={styles.historyItem}>
                  <View style={styles.row}>
                    <Text style={styles.time}>{item.time}</Text>
                    <Text style={[styles.level, { backgroundColor: levelColor }]}>
                      {item.level}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.typeContainer}>
                      <Text style={styles.type}>{item.type}</Text>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.detail}>{item.detail}</Text>
                  </View>
                </View>
              );
            })
          ) : (
            <Text>ไม่มีข้อมูลพฤติกรรม</Text>
          )}
          {/* ปุ่มสำหรับ export PDF */}
          {/* <TouchableOpacity style={styles.selectButton} onPress={generatePDF}>
            <Text style={styles.selectButtonText}>Export as PDF</Text>
          </TouchableOpacity> */}
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
      paddingVertical: 20,
      paddingHorizontal: 20,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 4,
      backgroundColor: 'orange'
    },
    selectButtonText: {
      fontFamily: 'Kanit-Bold',
      fontSize: height * 0.02,
      
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
