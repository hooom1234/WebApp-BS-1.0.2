import React from "react";
import { View, Text, Button } from "react-native";
import { useUser } from "./component/UserContext";

const ReporterIndex = ({ navigation, route }) => {
  //const userId = route.params?.userId || "Unknown"; // รับ userId ที่ส่งมาจาก Login
  const { userId } = useUser();
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Welcome, {userId}</Text>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Reporter Index Page</Text>
      
      <Button title="Go to Student List" onPress={() => navigation.navigate("StudentList")} />
    </View>
  );
};

export default ReporterIndex;
