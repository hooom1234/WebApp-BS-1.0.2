import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView, Image, Dimensions } from 'react-native';
import ReporterButton from "./button/reporter-Button";
import ParentButton from "./button/parent-Button";
import AdminButton from "./button/admin-Button";

import RNFS from "react-native-fs";
import axios from "axios";


// ดึงขนาดหน้าจอ
const { width, height } = Dimensions.get('window');

const HomeScreen = (navigation) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#F8E7B2" translucent={false} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Image source={require('../../../assets/logo/app-logo3.png')} style={styles.logo} />
        </View>
        <View style={styles.spacing} />
        <View style={styles.header}>
          <Text style={styles.headerText}>
            เลือกประเภท{'\n'}
            ผู้ใช้งาน
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <ReporterButton navigation={navigation} />
          <ParentButton navigation={navigation} />
          <AdminButton navigation={navigation} />
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
    backgroundColor: "#FF33FF",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: height * 0.025,
    borderTopLeftRadius: 20, // เพิ่มความมนด้านบนซ้าย
    borderTopRightRadius: 20, // เพิ่มความมนด้านบนขวา
  },
  headerText: {
     
    fontSize: height * 0.03, 
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Kanit-Bold',
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
});

//Session Checker

const path = RNFS.DocumentDirectoryPath + '../../../';

RNFS.readFile(path + 'log.tim', 'utf8')
  .then(data => {
    if (Math.floor(Date.now/1000) - +data > 1296000){ // user logged over 15 days ago
      RNFS.unlink(path + 'log.tim').then().catch(err => console.log(err.message));
      RNFS.unlink(path + 'log.typ').then().catch(err => console.log(err.message));
      RNFS.unlink(path + 'log.num').then().catch(err => console.log(err.message));
      RNFS.unlink(path + 'log.key').then().catch(err => console.log(err.message));
      // removes files
      return;
    } else{ // user log is valid, restores session
      const id = 0, key = 0;
      RNFS.readFile(path + 'log.num').then(data => id  = data).catch(err => console.log(err.message));
      RNFS.readFile(path + 'log.key').then(data => key = data).catch(err => console.log(err.message));
      RNFS.readFile(path + 'log.typ').then(data => {
        if (data == 'a') axios.post("${API_URL}Login-System/login-Admin.php", { id: id, etc });
        if (data == 'p') axios.post("${API_URL}Login-System/login-Parent.php", { id: id, etc });
        if (data == 'r') axios.post("${API_URL}Login-System/login-Reporter.php", { id: id, etc });
      }).catch(err => console.log(err.message));
    }
  }).catch(err => console.log(err.message));

export default HomeScreen;
