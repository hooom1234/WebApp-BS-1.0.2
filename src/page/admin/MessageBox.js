import React, { useState,useEffect } from "react";
import { API_URL } from '@env';
import { View, Text, TextInput, Button, Alert, ActivityIndicator, TouchableOpacity, 
  SafeAreaView, ScrollView, Image, StyleSheet, Dimensions } from "react-native";


import MessageButton from "./button/message-Button";


const { width, height } = Dimensions.get('window');


const MessageBox = ({ route, navigation }) => {



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* BOX (1) | Header Section*/}
        <View style={styles.logoContainer}>
            <MessageButton style={styles.logo} /> 
        </View>

        {/* Distance between BOX 1 and BOX 2 */}
        <View style={styles.spacing} />

        {/* BOX (2) | Topic Section */}
        <View style={styles.header}>
          <Text style={styles.headerText}>
            
          </Text>
        </View>

        {/* BOX (3) | Action Section */}
        <View style={styles.buttonContainer}>
          
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
    paddingBottom: height * 0.05, // เพิ่ม padding ให้เลื่อนลงมาได้
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
    width: width * 0.6,  // ทำให้ขนาดปรับตามหน้าจอ
    height: height * 0.15,
    resizeMode: "contain",
  },
  spacing: {
    height: height * 0.05, // เพิ่มระยะห่างระหว่างกล่องที่หนึ่งกับกล่องที่สอง
  },
  header: {
    backgroundColor: "#06259E",
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
    backgroundColor: "#4469FA",
    width: "80%",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: height * 0.05,
  },
});

export default MessageBox;
