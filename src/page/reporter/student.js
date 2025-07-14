import React, { useEffect, useState } from "react";
import { API_URL } from '@env';
import { 
  View, Text, FlatList, ActivityIndicator, TouchableOpacity, 
  SafeAreaView, ScrollView, Image, StyleSheet, Dimensions
} from "react-native";
import { useStudent } from "./component/StudentContext"; 
import { useUser } from "./component/UserContext"; 


const { width, height } = Dimensions.get('window');

const StudentList = ({ navigation }) => {
  const { userId } = useUser();
  const { setStudentId } = useStudent();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    fetch(`${API_URL}/studentlist.php`)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* BOX (1) | Header Section*/}
        <View style={styles.logoContainer}>
          
          <Image source={require('../../../assets/logo/reporter-std.png')} style={styles.logo} />
          <View style={styles.userInfo}>
            <Text style={styles.userText}>{userId}</Text>
            <TouchableOpacity 
              style={styles.logoutButton} 
              onPress={() => navigation.replace("Home")}
            >
              <Text style={styles.logoutText}>ออกจากบัญชี</Text>
            </TouchableOpacity>
          </View>

        </View>

        {/* Distance between BOX 1 and BOX 2 */}
        <View style={styles.spacing} />

        {/* BOX (2) | Topic Section */}
        <View style={styles.header}>

          <Text style={styles.headerText}>
            รายชื่อนักเรียน
          </Text>

        </View>

        {/* BOX (3) | Action Section */}
        <View style={styles.buttonContainer}>
          <View style={styles.studentContainer}>
            {data.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <View key={item.id} style={[styles.studentItem, { backgroundColor: isEven ? "#FFC4FF" : "#F9D776" }]}>
                  <Text style={styles.studentText}>{item.fname} {item.lname}</Text>
                  <TouchableOpacity
                    style={[styles.selectButton, { backgroundColor: isEven ? "#F9D776" : "#FFC4FF" }]}
                    onPress={() => {
                      navigation.navigate("StudentLog", { studentId: item.id });
                    }}
                  >
                    <Text style={styles.selectButtonText}>เลือก</Text>
                  </TouchableOpacity>
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
    backgroundColor: "#FF99FF",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: height * 0.02, 
    paddingTop: height * 0.001,
    
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
    fontFamily: 'Kanit-Bold',
    fontSize: height * 0.03, 
    color: '#FFFFFF',
    textAlign: 'center',
    
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

export default StudentList;
