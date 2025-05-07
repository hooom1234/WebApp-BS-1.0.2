import React, { useState, useEffect } from "react";
import { API_URL } from '@env';
import {
  View,
  Text,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";
import axios from "axios";


import ManageButton from "./button/manage-Button";
import AdminReporter from "./button/AdminReporter";
import AdminParent from "./button/AdminParent";
import AdminAdmin from "./button/AdminAdmin";

const { width, height } = Dimensions.get('window');

const Request = ({ route, navigation }) => {
  const [requests, setRequests] = useState([]);


  useEffect(() => {
    fetchRequest();
  }, []);

  const fetchRequest = async () => {
    try {
      const response = await axios.get(`http://52.221.184.135/API/Admin-System/RequestList.php`);
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching Request:", error);
      Alert.alert("เกิดข้อผิดพลาด", "ไม่สามารถโหลดข้อมูลคำร้องได้");
    }
  };



  const handleUpdateStatus = async (student, newstatus) => {
    try {
      const response = await axios.patch(`${API_URL}Admin-System/Request.php`, {
        student: student,
        status: newstatus
      });

      if (response.data.status === "success") {
        Alert.alert("สำเร็จ", `สถานะอัปเดตเป็น "${newstatus}" แล้ว`);
        fetchRequest(); // refresh
      } else {
        Alert.alert("เกิดข้อผิดพลาด", response.data.message || "ไม่สามารถอัปเดตได้");
      }
    } catch (error) {
      console.error("Update status error:", error);
      Alert.alert("เกิดข้อผิดพลาด", "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <ManageButton style={styles.logo} />
        </View>

        <View style={styles.spacing} />

        <View style={styles.header}>
          <Text style={styles.headerText}>จัดการบัญชีผู้ใช้</Text>
        </View>

        <View style={styles.buttonContainer}>
        <AdminReporter navigation={navigation} />
        <AdminParent navigation={navigation} />
        <AdminAdmin navigation={navigation} />
        
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
    paddingBottom: height * 0.05,
  },
  logoContainer: {
    backgroundColor: "#4469FA",
    width: "100%",
    alignItems: "center",
    paddingVertical: height * 0.015,
  },
  spacing: {
    height: height * 0.05,
  },
  header: {
    backgroundColor: "#06259E",
    width: "80%",
    alignItems: "center",
    paddingVertical: height * 0.025,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerText: {
    fontFamily: 'Kanit-Bold',
    fontSize: height * 0.03,
    color: '#FFFFFF',
  },
  buttonContainer: {
    backgroundColor: "#4469FA",
    width: "80%",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: height * 0.05,
  },
  RequestItem: {
    backgroundColor: "#F1E1B3",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    width: "80%",
  },
  detail: {
    fontFamily: 'Kanit-Bold',
    fontSize: height * 0.022,
    color: "#333",
    marginBottom: 5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  buttonText: {
    fontFamily: 'Kanit-Bold',
    color: "#fff",
    fontSize: height * 0.018,
  },
  
});

export default Request;
