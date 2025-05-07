import React, { useState, useEffect } from "react";
import { API_URL } from '@env';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Dimensions, Modal, TextInput } from "react-native";

import AdminStudentButton from "./button/student-Button";
import { useStudent } from "../reporter/component/StudentContext";
import axios from "axios";

const { width, height } = Dimensions.get('window');

const AdminReporter = ({ route, navigation }) => {
  const { setStudentId } = useStudent();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  const [students, setStudents] = useState([]);



 

  useEffect(() => {
    axios
      .get(`${API_URL}studentlist.php`)
      .then((response) => {
        const data = response.data;
  
        if (Array.isArray(data)) {
          setStudents(data); // case where API returns array directly
        } else if (Array.isArray(data.students)) {
          setStudents(data.students); // case where API wraps in { students: [...] }
        } else {
          setStudents([]); // fallback to empty
        }
  
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);
   //DON"T FORGOT CREATE EDIT ONLY ADMIB SESSION (By concept "NOT EVERRY ACC CAN MANAGE USERS (Broken Ascess Control)") *IMPORTANT!!!!*
  
  const Edit_Select = (id) => {
    fetch(`http://52.221.184.135/API/Admin-System/StudentUpdate.php?id=${id}`, {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((json) => {
      
      navigation.navigate("UpdateStudent", {
        id: json.id,
        fname: json.fname,
        lname: json.lname,
        parent: json.parent
      });
    })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }); 
  };

  const View_Behavior = (id) => {
    navigation.navigate("Behavior", {
      id: id
    });
  };
  

  const deleteStudent = (id) => {
    Alert.alert(
      "ยืนยันการลบ",
      "คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนักเรียนนี้?",
      [
        {
          text: "ยกเลิก",
          style: "cancel",
        },
        {
          text: "ยืนยัน",
          onPress: () => {
            fetch(`http://52.221.184.135/API/delete_student.php?id=${id}`, {
              method: 'DELETE',
            })
              .then((response) => response.json())
              .then((json) => {
                if (json.success) {
                  Alert.alert("สำเร็จ", "ลบข้อมูลสำเร็จ");
                  setData(data.filter((item) => item.id !== id));
                } else {
                  Alert.alert("ล้มเหลว", "ไม่สามารถลบข้อมูลได้");
                }
              })
              .catch((error) => {
                console.error("Error deleting data:", error);
                Alert.alert("ล้มเหลว", "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์");
              });
          },
        },
      ],
      { cancelable: false }
    );

  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <AdminStudentButton style={styles.logo} />
        </View>

        <View style={styles.spacing} />

        <View style={styles.header}>
            <Text style={styles.headerText}>Student Account</Text>
          
            <TouchableOpacity 
            style={styles.addButton} 
            onPress={() => navigation.navigate('AddStudent')}
          >
            <Text style={styles.addButtonText}>+ เพิ่มนักเรียน</Text>
          </TouchableOpacity>
          
        </View>
        
        <View style={styles.buttonContainer}>
          <View style={styles.studentContainer}>
            
          {Array.isArray(students) &&
          students.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <View key={item.id} style={[styles.studentItem, { backgroundColor: isEven ? "#AABBFF" : "#F9D776" }]}>
                  <Text style={styles.studentText}>{item.fname} {item.lname} : {item.id}</Text>

                  <View style={styles.buttonRow}>
                    <TouchableOpacity
                      style={[styles.selectButton, { backgroundColor: isEven ? "#00AEFF" : "#00AEFF" }]}
                      onPress={() => View_Behavior(item.id)}
                    >
                      <Text style={styles.selectButtonText}>Behavior</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.selectButton, { backgroundColor: isEven ? "#FFDD00" : "#FFDD00" }]}
                      onPress={() => Edit_Select(item.id)}
                    >
                      <Text style={styles.selectButtonText}>Edit</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                      style={[styles.selectButton, { backgroundColor: isEven ? "#FF0000" : "#FF0000" }]}
                      onPress={() => deleteStudent(item.id)} // เรียกฟังก์ชันลบ
                    >
                      <Text style={styles.selectButtonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
      
    </SafeAreaView>
    
  );
};


const styles = StyleSheet.create({
  // (styles ตรงนี้จะเหมือนเดิม)
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
    paddingBottom: height * 0.01,
    paddingTop: height * 0.01,
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
  studentItem: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "80%",
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
    fontSize: height * 0.02,
    color: "#000",
    marginBottom: height * 0.02,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  selectButton: {
    paddingVertical: height * 0.01,
    paddingHorizontal: height * 0.02,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
    marginRight: height * 0.01,
  },
  selectButtonText: {
    fontFamily: 'Kanit-Bold',
    fontSize: height * 0.015,
    fontStyle: "Bold",
    color: "#FFFFFF",
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // พื้นหลังสีขาวของ Modal
    padding: height * 0.02,
    width: "80%",  // กำหนดความกว้างของ Modal
    maxHeight: height * 0.6,  // จำกัดความสูง
    borderRadius: 10,  // เพิ่มมุมโค้งให้กับ Modal
    position: 'absolute',  // ให้ Modal อยู่ในตำแหน่งที่ระบุ
    top: '20%', // ห่างจากด้านบนของหน้าจอ 20%
    left: '10%', // อยู่ตรงกลางทางด้านซ้าย
    
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  input: {
    width: "100%",  // ทำให้ฟิลด์ขยายเต็มความกว้างของ Modal
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },
  saveButton: {
    backgroundColor: "#00AEFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: "#FF0000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#4CAF50', // เขียวสด
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    marginVertical: 10,
  },
  
  addButtonText: {
    color: '#FFFFFF', // ตัวหนังสือสีขาว
    fontSize: 18,
    fontFamily: 'Kanit-Bold',
  },
});

export default AdminReporter;
