import React, { useState, useEffect, useFocusEffect } from "react";
import { View, Text, TextInput, Button, Alert, ActivityIndicator, TouchableOpacity, 
  SafeAreaView, ScrollView, Image, StyleSheet, Dimensions, BackHandler } from "react-native"; // เพิ่ม BackHandler
import { useAdmin } from "./component/AdminContext"; // ✅ Import useAdmin

import StudentButton from "./button/student-Button";
import MessageButton from "./button/message-Button";
import RequestButton from "./button/request-Button";
import ManageButton from "./button/manage-Button";

const { width, height } = Dimensions.get('window');

const AdminIndex = ({ navigation }) => {
  const { adminId } = useAdmin();



  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        "ออกจากบัญชี",
        "แน่ใจหรือไม่ที่จะออกจากบัญชี?",
        [
          { text: "ยกเลิก", onPress: () => null, style: "cancel" },
          { text: "ยืนยัน", onPress: () => navigation.replace("Home") },
        ],
        { cancelable: false }
      );
      return true;
    };
  
    let backHandler;
  
    const focusListener = navigation.addListener('focus', () => {
      backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    });
  
    const blurListener = navigation.addListener('blur', () => {
      if (backHandler) backHandler.remove(); // ✅ ใช้ .remove() แทน removeEventListener
    });
  
    return () => {
      focusListener(); // remove listener
      blurListener();  // remove listener
      if (backHandler) backHandler.remove(); // ✅ cleanup
    };
  }, [navigation]);
  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Image source={require('../../../assets/logo/admin-std.png')} style={styles.logo} />
          <View style={styles.userInfo}>
            <Text style={styles.userText}>{adminId}</Text>
            <TouchableOpacity 
              style={styles.logoutButton} 
              onPress={() => navigation.replace("Home")}
            >
              <Text style={styles.logoutText}>ออกจากบัญชี</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.spacing} />

        <View style={styles.header}>
          <Text style={styles.headerText}>
            Admin HomePage
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <StudentButton navigation={navigation} />
          <RequestButton navigation={navigation} />
          <ManageButton navigation={navigation} />
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
    paddingBottom: height * 0.05,
  },
  logoContainer: {
    backgroundColor: "#4469FA",
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
});

export default AdminIndex;
