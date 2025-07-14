import React, { useEffect, useState } from "react";
import { API_URL } from '@env';
import { 
  View, Text, ActivityIndicator, TouchableOpacity, 
  SafeAreaView, ScrollView, Image, StyleSheet, Dimensions, Alert
} from "react-native";
import { useParent } from "./component/ParentContext";
import axios from "axios";


const { width, height } = Dimensions.get('window');

const History = ({ navigation }) => {
  const { parentId } = useParent();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  


  useEffect(() => {
    if (!parentId) return;

    axios
      .get(`${API_URL}/Parent-System/studentlist-history.php?parent=${parentId}`)
      .then((response) => {
        console.log("API Response:", response.data);
        setStudents(response.data.students || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
        setStudents([]);
        setLoading(false);
      });
  }, [parentId]);

  const requestAccess = async (studentId) => {
    try {
      const response = await axios.post(`${API_URL}/Parent-System/request-access.php`, {
        parent: parentId,
        student: studentId,
      });
  
      Alert.alert("แจ้งเตือน", response.data.message);
  
      // ✅ อัปเดตสถานะ student ที่กด request ให้เป็น "false" (pending)
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === studentId ? { ...student, status: "false" } : student
        )
      );
    } catch (error) {
      console.error("Request Error:", error);
      Alert.alert("ผิดพลาด", "ไม่สามารถส่งคำขอได้");
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* BOX (1) | Header Section */}
        <View style={styles.logoContainer}>
          <Image source={require('../../../assets/logo/parent-std.png')} style={styles.logo} />
          <View style={styles.userInfo}>
            <Text style={styles.userText}>{parentId}</Text>
            <TouchableOpacity 
              style={styles.logoutButton} 
              onPress={() => navigation.replace("Home")}
            >
              <Text style={styles.logoutText}>ออกจากบัญชี</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Distance between BOX 1 and BOX 2 */}
        <View style={styles.spacing} />

        {/* BOX (2) | Topic Section */}
        <View style={styles.header}>
          <Text style={styles.headerText}>รายชื่อนักเรียน</Text>
        </View>

        {/* BOX (3) | Action Section */}
        <View style={styles.buttonContainer}>
  <View style={styles.studentContainer}>
    {students.map((item, index) => {
      const isEven = index % 2 === 0;
      const cardColor = isEven ? "#F9D776" : "#B08A64";
      const buttonColor = isEven ? "#B08A64" : "#F9D776";

      return (
        <View key={item.id} style={[styles.studentCard, { backgroundColor: cardColor }]}>
          <Text style={styles.studentName}>{item.fname} {item.lname}</Text>
          
          {/* ปุ่มต่าง ๆ */}
          <View style={styles.buttonGroup}>
            {String(item.status) === "true" ? (
              <>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: buttonColor }]}
                  onPress={() => navigation.navigate("StudentHistory", { studentId: item.id, fname: item.fname, lname: item.lname })}
                >
                  <Text style={styles.buttonText}>History</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: buttonColor }]}
                  onPress={() => navigation.navigate("StudentGraph", { studentId: item.id, fname: item.fname, lname: item.lname })}
                >
                  <Text style={styles.buttonText}>Graph</Text>
                </TouchableOpacity>
              </>
            ) : String(item.status) === "false" ? (
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: "#ccc" }]}
                disabled
              >
                <Text style={[styles.buttonText, { color: "gray" }]}>Pending...</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: buttonColor }]}
                onPress={() => requestAccess(item.id)}
              >
                <Text style={styles.buttonText}>Send Request</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      );
    })}
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
    backgroundColor: 'white',
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
  studentCard: {
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
  studentName: {
    fontSize: 16,
    fontFamily: 'Kanit-Bold',
    color: "#000",
    flex: 1,
    textAlign: "left", // ทำให้ชื่อแสดงทางซ้าย
  },
  buttonGroup: {
    flexDirection: "column",
    gap: height * 0.02,
    alignItems: "center",
    paddingLeft: width * 0.05
    
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    fontWeight: "600",
    color: "#fff",
    fontFamily: 'Kanit-Bold',
  },
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
    backgroundColor: "#96622F",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: height * 0.02, 
    paddingTop: height * 0.001,
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
    backgroundColor: "#6C3B0A",
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
    backgroundColor: "#96622F",
    width: "80%",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: height * 0.05, 
    
  },
});

export default History;
