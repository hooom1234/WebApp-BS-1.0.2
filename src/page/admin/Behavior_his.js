import React, { useEffect, useState } from "react";
import { API_URL } from '@env';
import { 
  View, Text, ActivityIndicator, TouchableOpacity, 
  SafeAreaView, ScrollView, Image, StyleSheet, Dimensions, Alert
} from "react-native";
//import { useParent } from "./component/ParentContext";
import axios from "axios";
import RNHTMLtoPDF from 'react-native-html-to-pdf';  // ✅ Import PDF library
import FileViewer from 'react-native-file-viewer';  // ✅ Import File Viewer for opening PDF


import AdminStudentButton from "./button/student-Button";


const { width, height } = Dimensions.get('window');

const Behavior_his = ({ route, navigation }) => {
    const [history, setHistory] = useState([]);
    const { id} = route.params;

    const [Id, setId] = useState(id);
    const [loading, setLoading] = useState(true);
    const [accessDenied, setAccessDenied] = useState(false);
  //const { parentId } = useParent();
  //const [students, setStudents] = useState([]);
  //const [loading, setLoading] = useState(true);
  



console.log("Id =", Id);
useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`${API_URL}/Admin-System/Behavior_his.php?student=${Id}`);
        setHistory(response.data);
      } catch (error) {
        console.error("Error fetching history:", error);
        Alert.alert("เกิดข้อผิดพลาด", "ไม่สามารถโหลดข้อมูลพฤติกรรมได้");
      } finally {
        setLoading(false);
      }
    };
  
    fetchHistory();
  }, [Id]);

  const generatePDF = async () => {
    try {
      const historyItems = history.map(item => `
        <p><strong>Time:</strong> ${item.time}</p>
        <p><strong>Level:</strong> ${item.level}</p>
        <p><strong>Type:</strong> ${item.type}</p>
        <p><strong>Detail:</strong> ${item.detail}</p>
        <hr />
      `).join('');

      const htmlContent = `
        <h1>Student History: ${fname} ${lname}</h1>
        ${historyItems}
      `;

      const options = {
        html: htmlContent,
        fileName: `student-history-${fname}-${lname}`,
        directory: 'Documents',
      };

      const file = await RNHTMLtoPDF.convert(options);

      // เปิดไฟล์ PDF
      await FileViewer.open(file.filePath);
    } catch (err) {
      console.error(err);
      Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถสร้างหรือเปิด PDF ได้');
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* BOX (1) | Header Section */}
        <View style={styles.logoContainer}>

          <AdminStudentButton style={styles.logo} />
        </View>

        {/* Distance between BOX 1 and BOX 2 */}
        <View style={styles.spacing} />

        {/* BOX (2) | Topic Section */}
        <View style={styles.header}>
          <Text style={styles.headerText}>ประวัติพฤติกรรม</Text>
        </View>

        {/* BOX (3) | Action Section */}
        <View style={styles.buttonContainer}>
  {history.length > 0 ? (
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
            <TouchableOpacity style={styles.selectButtonEX} onPress={generatePDF}>
            <Text style={styles.selectButtonText}>Export as PDF</Text>
          </TouchableOpacity>
</View>


      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F8E7B2",
    },
    scrollContainer: {
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: height * 0.05,
    },
    logoContainer: {
      backgroundColor: "#4469FA",
      width: "100%",
      justifyContent: "flex-end",
      alignItems: "center",
      paddingBottom: height * 0.01,
      paddingTop: height * 0.01,
    },
    logo: {
      width: width * 0.6,
      height: height * 0.15,
      resizeMode: "contain",
    },
    spacing: {
      height: height * 0.05,
    },
    header: {
      backgroundColor: "#4469FA",
      width: "80%",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: height * 0.025,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    headerText: {
      fontFamily: 'Kanit-Bold',
      fontSize: height * 0.03,
      color: '#FFFFFF',
      textAlign: 'center',
    },
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
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      width: "80%",
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
      fontSize: height * 0.02,
      color: "#000",
      marginBottom: height * 0.02,
    },
    selectButtonEX: {
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

    buttonRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
    selectButton: {
      paddingVertical: height * 0.01,
      paddingHorizontal: height * 0.02,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 4,
      marginRight: height * 0.01,
      backgroundColor: "#4469FA",
    },
    selectButtonText: {
      fontFamily: 'Kanit-Bold',
      fontSize: height * 0.015,
      fontStyle: "Bold",
      color: "#FFFFFF",
    },
    buttonContainer: {
      backgroundColor: "#4469FA",
      width: "80%",
      justifyContent: "space-evenly",
      alignItems: "center",
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      paddingVertical: height * 0.05,
    },
    modalContainer: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
      padding: height * 0.02,
      width: "80%",
      maxHeight: height * 0.6,
      borderRadius: 10,
      position: 'absolute',
      top: '20%',
      left: '10%',
    },
    modalTitle: {
      fontSize: 20,
      marginBottom: 10,
      fontWeight: "bold",
    },
    input: {
      width: "100%",
      height: 40,
      borderColor: "#ddd",
      borderWidth: 1,
      marginBottom: 15,
      paddingLeft: 10,
    },
    saveButton: {
      backgroundColor: "#00AEFF",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginBottom: 10,
    },
    saveButtonText: {
      color: "#fff",
      fontSize: 16,
    },
    cancelButton: {
      backgroundColor: "#FF0000",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    cancelButtonText: {
      color: "#fff",
      fontSize: 16,
    },
    historyItem: {
      backgroundColor: "#F1E1B3",
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
      marginRight: 10,
    },
    level: {
      fontFamily: 'Kanit-Bold',
      fontSize: height * 0.02,
      color: "#fff",
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 5,
      backgroundColor: "#4469FA",
    },
    typeContainer: {
      backgroundColor: "#fff",
      borderRadius: 10,
      paddingVertical: 5,
      paddingHorizontal: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    type: {
      fontFamily: 'Kanit-Bold',
      fontSize: height * 0.02,
      color: "#000",
      textAlign: "center",
      flexWrap: "wrap",
      maxWidth: "100%",
    },
    detail: {
      fontFamily: 'Kanit-Bold',
      fontSize: height * 0.02,
      color: "#333",
      textAlign: "left",
    },
  });
  
export default Behavior_his;
