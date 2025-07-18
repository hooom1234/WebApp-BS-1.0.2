import React, { useState } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity, SafeAreaView, ScrollView, Image, StyleSheet, Dimensions, Animated } from "react-native";
import axios from "axios";
import { useStudent } from "./component/StudentContext"; // ✅ แก้ Path ให้ถูกต้อง
import { useUser } from "./component/UserContext"; // ✅ แก้ Path ให้ถูกต้อง
import { useNavigation } from '@react-navigation/native'; // เพิ่มการ import
import { API_URL } from '@env';



const { width, height } = Dimensions.get('window');

const API_URL2 = `${API_URL}/save_student.php`;

const submitStudentData = async (id, type, level, detail, time, reporter) => {
  try {
    const response = await axios.post(API_URL2, {
      studentId: id,
      type,
      level,
      detail,
      time,
      reporter,
    }, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return { status: "error", message: "Failed to submit data" };
  }
};

const StudentForm = () => {
  const [type, setType] = useState("");
  const [level, setLevel] = useState("");
  const handleLevelPress = (selectedLevel) => {
    if (level === selectedLevel) {
      setLevel("");
    } else {
      setLevel(selectedLevel);
    }
  };
  const [detail, setDetail] = useState("");

  const { studentId } = useStudent();
  const { userId } = useUser();
  const navigation = useNavigation();
  const [showAlert, setShowAlert] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  


  const handleSubmit = async () => {
    if (!studentId || !userId) {
      Alert.alert("Error", "ไม่พบข้อมูล ID ของนักเรียนหรือผู้รายงาน");
      return;
    }

    if (!type || !level || !detail) {
      Alert.alert("Error", "กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const options = { timeZone: "Asia/Bangkok", hour12: false };
    const currentTime = new Date().toLocaleString("sv-SE", options).replace("T", " ");

    console.log("Sending Data:", { studentId, type, level, detail, currentTime, reporter: userId });

    const response = await submitStudentData(studentId, type, level, detail, currentTime, userId);

    if (response.status === "success") {
        // เรียกใช้แอนิเมชันเมื่อเข้าสู่ระบบสำเร็จ
        setShowAlert(true);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 750,
          useNativeDriver: true,
        }).start();

      
        setTimeout(() => {
          navigation.replace("StudentList");
        }, 1000);
      }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Image source={require('../../../assets/logo/reporter-std.png')} style={styles.logo} />
        </View>
        <View style={styles.spacing} />
        <View style={styles.header}>
          <Text style={styles.headerText}>การรายงานพฤติกรรม</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.inputLabel}>ผู้รายงาน</Text>
          <Text style={styles.inputFieldDone}>{userId || "Unknown"}</Text>

          <Text style={styles.inputLabel}>นักเรียน</Text>
          <Text style={styles.inputFieldDone}>{studentId || "Unknown"}</Text>

          <Text style={styles.inputLabel}>หัวข้อพฤติกรรม</Text>
          <TextInput
            multiline={true}
            style={styles.inputField}
            placeholder="กรอกข้อมูลตรงนี้"
            value={type}
            onChangeText={setType}
          />

          <Text style={styles.inputLabel}>ระดับความรุนแรง</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.levelButton, { backgroundColor: level === 'Low' ? '#4CAF50' : '#D1D1D1' }]}
              onPress={() => handleLevelPress('Low')}
              disabled={level !== "" && level !== 'Low'}
            ></TouchableOpacity>

            <TouchableOpacity
              style={[styles.levelButton, { backgroundColor: level === 'Medium' ? '#FFEB3B' : '#D1D1D1' }]}
              onPress={() => handleLevelPress('Medium')}
              disabled={level !== "" && level !== 'Medium'}
            ></TouchableOpacity>

            <TouchableOpacity
              style={[styles.levelButton, { backgroundColor: level === 'High' ? '#F44336' : '#D1D1D1' }]}
              onPress={() => handleLevelPress('High')}
              disabled={level !== "" && level !== 'High'}
            ></TouchableOpacity>
          </View>

          <Text style={styles.inputLabel}>รายละเอียดเหตุการณ์</Text>
          <TextInput
            multiline={true}
            style={styles.inputFieldDetail}
            placeholder="กรอกข้อมูลตรงนี้"
            value={detail}
            onChangeText={setDetail}
          />
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleSubmit}
          >
            <Text style={styles.loginButtonText}>รายงาน</Text>
          </TouchableOpacity>
        </View>

        {/* Success Alert Animation */}
        {showAlert && (
          <Animated.View style={[styles.successAlert, { opacity: fadeAnim }]}>
            <Image
              source={require("../../../assets/logo/correct.png")} // ใช้ภาพเครื่องหมายถูกสีเขียว
              style={styles.successIcon}
            />
            <Text style={styles.successText}>รายงานสำเร็จ</Text>
          </Animated.View>
        )}
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
    paddingLeft: '10%',
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
    textAlignVertical: 'top',
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
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '80%',
    marginBottom: height * 0.02,
    marginTop: height * 0.02,
  },
  levelButton: {
    paddingVertical: 30,
    paddingHorizontal: 30,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputFieldDetail: {
    width: "80%",
    height: height * 0.1,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 15,
    textAlignVertical: 'top',
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
});

export default StudentForm;
