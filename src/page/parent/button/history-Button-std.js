import React, { useRef } from "react";
import { View, Text, StyleSheet, Image, Animated, Pressable, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";


const HistoryButton = () => {


    
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

  return (
    <Pressable
      onPress={() => navigation.navigate("#")}
      onPressIn={handlePressIn} // สำหรับมือถือ (กดค้าง)
      onPressOut={handlePressOut}
      onMouseEnter={Platform.OS === "web" ? handlePressIn : undefined} // สำหรับ PC (โฮเวอร์)
      onMouseLeave={Platform.OS === "web" ? handlePressOut : undefined} // หดกลับเมื่อเมาส์ออก
    >
      <Animated.View style={[styles.button, { transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.iconContainer}>
          <Image
            source={require("../../../../assets/logo/history-logo.png")}
            style={styles.icon}
          />
        </View>
        <Text style={styles.text}>ประวัติ</Text>
      </Animated.View>
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
    fontFamily:'Kanit-Bold',
    fontSize: 16,
    color: "#000",
  },
});

export default HistoryButton;
