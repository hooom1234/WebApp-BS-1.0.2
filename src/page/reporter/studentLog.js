import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, ActivityIndicator, TouchableOpacity, 
  SafeAreaView, ScrollView, Image, StyleSheet, Dimensions } from "react-native";
import { useStudent } from "./component/StudentContext"; // ✅ Import useStudent

import { API_URL } from '@env';
const { width, height } = Dimensions.get('window');


const StudentLog = ({ route, navigation }) => {
  const { setStudentId } = useStudent(); // ✅ ใช้ context เพื่อเก็บ studentId
  const [password, setPassword] = useState("");

  // ✅ รับ studentId จาก route params
  const studentId = route.params?.studentId || "Unknown";
  


  const handleLogin = async () => {
    if (!studentId || !password) {
      Alert.alert("Error", "กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    try {
      const response = await fetch(`${API_URL}check_password.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, password }),
      });

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }

      const json = await response.json();

      if (json.status === "success") {
        setStudentId(studentId); // ✅ บันทึก studentId ใน context
        navigation.navigate("StudentForm", { studentId });
      } else {
        Alert.alert("Error", json.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      Alert.alert("Error", "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์");
    }
  };

  return (
<SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* BOX (1) | Header Section*/}
        <View style={styles.logoContainer}>
          
          <Image source={require('../../../assets/logo/reporter-std.png')} style={styles.logo} />
          
        </View>

        {/* Distance between BOX 1 and BOX 2 */}
        <View style={styles.spacing} />

        {/* BOX (2) | Topic Section */}
        <View style={styles.header}>

          <Text style={styles.headerText}>
            รายชื่อนักเรียน
          </Text>

        </View>
    {/*}BOX (3) | Action Section */}
    <View style={styles.buttonContainer}>
      <Text style={styles.inputLabel}>StudentId</Text>
                    <Text style={styles.inputFieldDone}>{studentId}</Text>
      
     
      <Text style={styles.inputLabel}>Password</Text>
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.inputField}
                    placeholder="กรุณากรอกรหัสผ่าน"
                    placeholderTextColor="#999"
                  />
       
                    <TouchableOpacity
                      style={styles.loginButton}
                      onPress={handleLogin}
                     
                    >
                      <Text style={styles.loginButtonText}>เข้าสู่ระบบ</Text>
                    </TouchableOpacity>
                  )
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
    paddingBottom: height * 0.05, // เพิ่ม padding ให้เลื่อนลงมาได้
  },
  logoContainer: {
    backgroundColor: "#FF99FF",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: height * 0.02, 
    paddingTop: height * 0.04,
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
    backgroundColor: "#FF33FF",
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
  buttonContainer: {
    backgroundColor: "#FF99FF",
    width: "80%",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: height * 0.05, 
  },


  inputLabel: {
    fontFamily: 'Kanit-Bold',
    fontSize: 26,
    color: '#fff',
    alignSelf: 'flex-start',
    marginBottom: 5,
    paddingLeft: '10%'
  },
  inputField: {
    width: "80%",
    padding: 15,
    borderRadius: 25,
    backgroundColor: "#fff",
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 15,
  },
  loginButton: {
    backgroundColor: "#4C6EF5", // สีน้ำเงิน
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 10,
  },
  loginButtonText: {
    fontFamily: 'Kanit-Bold',
    fontSize: 18,
    color: "#fff",
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // พื้นหลังโปร่งใส
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
  },
  modalText: {
    fontFamily: 'Kanit-Bold',
    fontSize: 18,
    color: "#000",
    textAlign: "center",
    marginBottom: 20,
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 15,
    resizeMode: "contain",
  },
  closeButton: {
    backgroundColor: "#FF33FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    fontFamily: 'Kanit-Bold',
    color: "#fff",
    fontSize: 16,
  },
  successAlert: {
    position: "absolute",
    top: "40%",
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
  },
  successText: {
    fontFamily: 'Kanit-Bold',
    fontSize: 24, // เพิ่มขนาดฟอนต์
    color: "#4CAF50", // สีเขียว
    textAlign: "center",
    marginTop: 10, // เพิ่มระยะห่าง
  },
  successIcon: {
    width: 200, // เพิ่มขนาดไอคอน
    height: 120,
    resizeMode: "contain",
  },
  inputFieldDone: {
    width: "80%",
    padding: 15,
    borderRadius: 25,
    backgroundColor: "#fff",
    marginBottom: 15,
    fontSize: 16,
    color: "gray",
    fontWeight: "bold",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 15,
    textAlignVertical: 'top',
    
  },
  
});

export default StudentLog;
