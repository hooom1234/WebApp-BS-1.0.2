import React, { useEffect, useState } from "react";
import { API_URL } from '@env';
import { 
  View, Text, ActivityIndicator, TouchableOpacity, 
  SafeAreaView, ScrollView, Image, StyleSheet, Dimensions, Alert
} from "react-native";
//import { useParent } from "./component/ParentContext";
import axios from "axios";

import History from "./button/history-Button-std";
import Graph from "./button/graph-Button-std";
import AdminStudentButton from "./button/student-Button";

const { width, height } = Dimensions.get('window');

const Behavior = ({ route, navigation }) => {

    const { id} = route.params;

    const [Id, setId] = useState(id);
  //const { parentId } = useParent();
  //const [students, setStudents] = useState([]);
  //const [loading, setLoading] = useState(true);
  


//   useEffect(() => {
//     if (!parentId) return;

//     axios
//       .get(`${API_URL}/Parent-System/studentlist-history.php?parent=${parentId}`)
//       .then((response) => {
//         console.log("API Response:", response.data);
//         setStudents(response.data.students || []);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Fetch Error:", error);
//         setStudents([]);
//         setLoading(false);
//       });
//   }, [parentId]);

//   const requestAccess = async (studentId) => {
//     try {
//       const response = await axios.post(`${API_URL}/Parent-System/request-access.php`, {
//         parent: parentId,
//         student: studentId,
//       });
  
//       Alert.alert("แจ้งเตือน", response.data.message);
  
//       // ✅ อัปเดตสถานะ student ที่กด request ให้เป็น "false" (pending)
//       setStudents((prevStudents) =>
//         prevStudents.map((student) =>
//           student.id === studentId ? { ...student, status: "false" } : student
//         )
//       );
//     } catch (error) {
//       console.error("Request Error:", error);
//       Alert.alert("ผิดพลาด", "ไม่สามารถส่งคำขอได้");
//     }
//   };

//   if (loading) {
//     return <ActivityIndicator size="large" color="#0000ff" />;
//   }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* BOX (1) | Header Section */}
        <View style={styles.logoContainer}>
          {/* <Image source={require('../../../assets/logo/parent-std.png')} style={styles.logo} />
          <View style={styles.userInfo}>
            <Text style={styles.userText}>{parentId}</Text>
            <TouchableOpacity 
              style={styles.logoutButton} 
              onPress={() => navigation.replace("Home")}
            >
              <Text style={styles.logoutText}>ออกจากบัญชี</Text>
            </TouchableOpacity>
          </View> */}
          <AdminStudentButton style={styles.logo} />
        </View>

        {/* Distance between BOX 1 and BOX 2 */}
        <View style={styles.spacing} />

        {/* BOX (2) | Topic Section */}
        <View style={styles.header}>
          <Text style={styles.headerText}>พฤติกรรม</Text>
        </View>

        {/* BOX (3) | Action Section */}
        <View style={styles.buttonContainer}>

            <History navigation={navigation} id={Id} />
            <Graph navigation={navigation} id={Id} />

        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    // (styles ตรงนี้จะเหมือนเดิม)
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
      backgroundColor: "#06259E",
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
    buttonContainer: {
      backgroundColor: "#4469FA",
      width: "80%",
      justifyContent: "space-evenly",
      alignItems: "center",
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      paddingVertical: height * 0.05,
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
    },
    selectButtonText: {
      fontFamily: 'Kanit-Bold',
      fontSize: height * 0.015,
      fontStyle: "Bold",
      color: "#FFFFFF",
    },
    modalContainer: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff", // พื้นหลังสีขาวของ Modal
      padding: height * 0.02,
      width: "80%",  // กำหนดความกว้างของ Modal
      maxHeight: height * 0.6,  // จำกัดความสูง
      borderRadius: 10,  // เพิ่มมุมโค้งให้กับ Modal
      position: 'absolute',  // ให้ Modal อยู่ในตำแหน่งที่ระบุ
      top: '20%', // ห่างจากด้านบนของหน้าจอ 20%
      left: '10%', // อยู่ตรงกลางทางด้านซ้าย
      
    },
    modalTitle: {
      fontSize: 20,
      marginBottom: 10,
      fontWeight: "bold",
    },
    input: {
      width: "100%",  // ทำให้ฟิลด์ขยายเต็มความกว้างของ Modal
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
  });

export default Behavior;
