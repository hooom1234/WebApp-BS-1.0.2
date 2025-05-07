import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Image, Animated, Pressable, Platform, Modal, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";


const ReporterButton = () => {


  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  
  const navigation = useNavigation();
  const scaleAnim = useRef(new Animated.Value(1)).current; // สร้างค่าอนิเมชัน

  // ฟังก์ชันขยาย
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 1.1, // ขยาย 10%
      useNativeDriver: true,
    }).start();
  };

  // ฟังก์ชันหดกลับ
  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1, // กลับสู่ขนาดเดิม
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    const messageContent = `Reporter\nผู้รายงาน\n\nข้อความ\nข้อความ\nข้อความ\nข้อความ\nข้อความ\nข้อความ\nข้อความ\nข้อความ\nข้อความ\nข้อความ\nข้อความ\nข้อความ\nข้อความ\nข้อความ`;
    setMessage(messageContent);
    setModalVisible(true); // เปิด modal
  };

  return (
    <Pressable
      onPress={() => handlePress()} // เรียกใช้งานฟังก์ชัน handlePress()
      onPressIn={handlePressIn} // สำหรับมือถือ (กดค้าง)
      onPressOut={handlePressOut}
      onMouseEnter={Platform.OS === "web" ? handlePressIn : undefined} // สำหรับ PC (โฮเวอร์)
      onMouseLeave={Platform.OS === "web" ? handlePressOut : undefined} // หดกลับเมื่อเมาส์ออก
    >
      <Animated.View style={[styles.button, { transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.iconContainer}>
          <Image
            source={require("../../../../assets/logo/reporter-logo.png")}
            style={styles.icon}
          />
        </View>
        <Text style={styles.text}>Reporter</Text>
      </Animated.View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}> 
          <View style={styles.modalContent}>
          
            <Text style={styles.modalText}>{message}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>ปิด</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 120,
    height: 120,
    backgroundColor: "#fff",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
    margin: 10,
  },
  icon: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  text: {
    fontFamily: 'Kanit-Bold',
    fontSize: 16,
    color: "#000",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
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
});

export default ReporterButton;
