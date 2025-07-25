import React, { useState } from "react";
import { API_URL } from '@env';
import { View, Text, TextInput, ActivityIndicator, 
  Modal, TouchableOpacity, StyleSheet, Image, 
  SafeAreaView, Dimensions, 
  StatusBar, ScrollView, Alert, Animated } from "react-native"; // เพิ่ม Animated
import axios from "axios";
import { useParent } from "./component/ParentContext"; // ✅ ใช้ useUser() อย่างถูกต้อง
import ParentButton from "./button/reporter-Button";

const { width, height } = Dimensions.get('window');
const ParentLoginScreen = ({ navigation }) => {
  const { parentId, setParentId } = useParent();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // การเปิด/ปิด modal
  const [modalMessage, setModalMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false); // สถานะการแสดง Alert
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // สถานะของปุ่ม Login
  const fadeAnim = useState(new Animated.Value(0))[0]; // สำหรับแอนิเมชัน

  const handleLogin = async () => {
    if (!parentId || !password) {
      setModalMessage("กรุณากรอก Username หรือ Password"); // แสดงข้อความเมื่อข้อมูลไม่ครบ
      setModalVisible(true); // เปิด modal หากข้อมูลไม่ครบ
      return;
    }

    setLoading(true);
    setIsButtonDisabled(true); // ปิดการกดปุ่ม login

    // ตั้งเวลาคูลดาวน์ 3 วินาที
    setTimeout(() => {
      setIsButtonDisabled(false); // เปิดการกดปุ่มหลังจาก 3 วินาที
    }, 3000);

    try {
      const response = await axios.post(`${API_URL}/Login-System/login-Parent.php`, { id: parentId, password });

      if (response.data.status === "success") {
        // เรียกใช้แอนิเมชันเมื่อเข้าสู่ระบบสำเร็จ
        setShowAlert(true);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();

        setParentId(response.data.id);
        setTimeout(() => {
          navigation.replace("ParentIndex"); // ✅ เอาหน้าลงตรงนี้
        }, 750);
      } else {
        setModalMessage(response.data.message || "ID หรือ Password ไม่ถูกต้อง"); // แจ้งเตือนกรณีใส่ข้อมูลผิด
        setModalVisible(true); // เปิด modal แสดงข้อมูลผิด
      }
    } catch (error) {
      console.error("Login Error:", error);
      Alert.alert("ผิดพลาด", "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์");
    } finally {
      setLoading(false);
    }
  };

  return (
    
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#F8E7B2" translucent={false} />
        

            {/* BOX (1) | Header Section*/}
              <View style={styles.logoContainer}>

                <ParentButton style={styles.logo} /> 

              </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Distance between BOX 1 and BOX 2 */}
              <View style={styles.spacing} />

            {/* BOX (2) | Topic Section */}
              <View style={styles.header}>
                <Text style={styles.headerText}>

                  เข้าสู่ระบบ{'\n'}
                  Parent

                </Text>
              </View>

            {/* BOX (3) | Action Section */}
              <View style={styles.buttonContainer}>
                <Text style={styles.inputLabel}>Username</Text>
                  <TextInput
                    value={parentId}
                    onChangeText={setParentId}
                    style={styles.inputField}
                    placeholder="กรุณากรอกชื่อผู้ใช้"
                    placeholderTextColor="#999"
                  />

                <Text style={styles.inputLabel}>Password</Text>
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.inputField}
                    placeholder="กรุณากรอกรหัสผ่าน"
                    placeholderTextColor="#999"
                  />

                  {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                  ) : (
                    <TouchableOpacity
                      style={styles.loginButton}
                      onPress={handleLogin}
                      disabled={isButtonDisabled} // กดปุ่มได้หรือไม่
                    >
                      <Text style={styles.loginButtonText}>เข้าสู่ระบบ</Text>
                    </TouchableOpacity>
                  )}
              </View>

              {/* Modal for Warning */}
              <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Image
                source={require("../../../assets/logo/warning-icon.png")}
                style={styles.icon}
              />
              <Text style={styles.modalText}>{modalMessage}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)} // ปิด modal
              >
                <Text style={styles.closeButtonText}>ปิด</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

              {/* Success Alert Animation */}
              {showAlert && (
                <Animated.View
                  style={[styles.successAlert, { opacity: fadeAnim }]}
                >
                  <Image
                    source={require("../../../assets/logo/correct.png")} // ใช้ภาพเครื่องหมายถูกสีเขียว
                    style={styles.successIcon}
                  />
                  <Text style={styles.successText}>เข้าสู่ระบบสำเร็จ</Text>
                </Animated.View>
              )}
            
         </ScrollView>
      </SafeAreaView>    

  );
};

const styles = StyleSheet.create({
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
    backgroundColor: "#FFCC33", // สีน้ำเงิน
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
    backgroundColor: "#6C3B0A",
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
    backgroundColor: "#B08A64",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: height * 0.02, 
    paddingTop: height * 0.02,
    
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
  buttonContainer: {
    backgroundColor: "#B08A64",
    width: "80%",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: height * 0.05, 
  },


});

export default ParentLoginScreen;
