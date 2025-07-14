import React, { useState, useEffect } from "react";
import { API_URL } from '@env';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Dimensions, Modal, TextInput } from "react-native";

import AdminStudentButton from "./button/student-Button";



const { width, height } = Dimensions.get('window');

const UpdateStudent = ({ route, navigation }) => {
    const { id, fname, lname, parent} = route.params;

    const [Id, setId] = useState(id);
    const [Fname, setFname] = useState(fname);
    const [Lname, setLname] = useState(lname);
    const [Parent, setParent] = useState(parent);

    const [loading, setLoading] = useState(false);



    useEffect(() => {
        setId(id);
        setFname(fname);
        setLname(lname);
        setParent(parent);
      }, [id, fname, lname, parent]);

    const Edit_Update = () => {
        setLoading(true);
        fetch(`${API_URL}/Admin-System/StudentUpdate.php?id=${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id : Id,
            fname: Fname,
            lname: Lname,
            parent: Parent,
          }),
        })
          .then((response) => response.json())
          .then((json) => {
            setLoading(false);
            Alert.alert("สำเร็จ", "อัปเดตข้อมูลผู้ใช้เรียบร้อยแล้ว");
            navigation.goBack();
          })
          .catch((error) => {
            setLoading(false);
            console.error("Error updating data: ", error);
            Alert.alert("ผิดพลาด", "ไม่สามารถอัปเดตข้อมูลได้");
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
          <Text style={styles.headerText}>อัปเดตข้อมูลผู้ใช้</Text>
        </View>
        
        <View style={styles.buttonContainer}>

          <Text style={styles.inputLabel}>รหัสประจำตัวผู้ใช้</Text>

          <Text style={styles.inputField2}>{Id}</Text>
          

          <Text style={styles.inputLabel}>ชื่อ</Text>
          <TextInput
            style={styles.inputField}
            placeholder="ชื่อ"
            value={Fname}
            onChangeText={setFname}
          />

          <Text style={styles.inputLabel}>นามสกุล</Text>
          <TextInput
            style={styles.inputField}
            placeholder="นามสกุล"
            value={Lname}
            onChangeText={setLname}
          />
          
          <Text style={styles.inputLabel}>ผู้ปกครอง</Text>
          <TextInput
            style={styles.inputField}
            placeholder="รหัสผู้ปกครอง"
            value={Parent}
            onChangeText={setParent}
          />

  <TouchableOpacity style={styles.loginButton} onPress={Edit_Update}>
    {loading ? (
      <ActivityIndicator color="#fff" />
    ) : (
      <Text style={styles.loginButtonText}>บันทึกการแก้ไข</Text>
    )}
  </TouchableOpacity>


        </View>
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
    paddingLeft: '10%',
  },
  inputField: {
    width: "80%",
    padding: 15,
    borderRadius: 25,
    backgroundColor: "#fff",
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 15,
  },
    inputField2: {
    width: "80%",
    padding: 15,
    borderRadius: 25,
    backgroundColor: "#fff",
    marginBottom: 15,
    fontSize: 16,
    color: "gray",
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
    backgroundColor: "#06259E",
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
    fontSize: 24,
    color: "#4CAF50",
    textAlign: "center",
    marginTop: 10,
  },
  successIcon: {
    width: 200,
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

export default UpdateStudent;
