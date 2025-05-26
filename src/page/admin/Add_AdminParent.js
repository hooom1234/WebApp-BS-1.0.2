import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Dimensions,
  TextInput,
} from "react-native";

import AdminStudentButton from "./button/AdminParent";
import { API_URL } from '@env';

const { width, height } = Dimensions.get("window");

const AddParent = ({ navigation }) => {
  const [Id, setId] = useState("");
  const [Password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  const handleAddReporter = () => {
    if (!Id || !Password) {
      Alert.alert("คำเตือน", "กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    setLoading(true);
    fetch(`${API_URL}Admin-System/ParentManage/ParentAdd.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Id,
        password: Password,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        setLoading(false);
        if (json.status === "success") {
          Alert.alert("สำเร็จ", "เพิ่มผู้รายงานเรียบร้อยแล้ว");
          navigation.goBack();
        } else {
          Alert.alert("ผิดพลาด", json.message || "ไม่สามารถเพิ่มข้อมูลได้");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error creating reporter: ", error);
        Alert.alert("ผิดพลาด", "เกิดข้อผิดพลาดระหว่างการเพิ่มข้อมูล");
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <AdminStudentButton style={styles.logo} />
        </View>

        <View style={styles.spacing} />

        <View style={styles.header}>
          <Text style={styles.headerText}>เพิ่มผู้ปกครอง</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Text style={styles.inputLabel}>ชื่อผู้ใช้</Text>
          <TextInput
            style={styles.inputField}
            placeholder="ชื่อผู้ใช้"
            value={Id}
            onChangeText={setId}
          />

          <Text style={styles.inputLabel}>รหัสผ่าน</Text>
          <TextInput
            style={styles.inputField}
            placeholder="รหัสผ่าน"
            value={Password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleAddReporter}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>เพิ่มผู้รายงาน</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputLabel: {
    fontFamily: "Kanit-Bold",
    fontSize: 26,
    color: "#fff",
    alignSelf: "flex-start",
    marginBottom: 5,
    paddingLeft: "10%",
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
    backgroundColor: "#FFCC33",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 10,
  },
  loginButtonText: {
    fontFamily: "Kanit-Bold",
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
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
    paddingTop: height * 0.02,
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
    fontFamily: "Kanit-Bold",
    fontSize: height * 0.03,
    color: "#FFFFFF",
    textAlign: "center",
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

export default AddParent;
