import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const ReportButton = (navigation) => {
  return (



    <TouchableOpacity style={styles.button}>
      <View style={styles.iconContainer}>
        {/* ใช้ภาพไอคอน */}
        <Image
          source={require("../../../../assets/logo/report.png")} // ใส่ path ของไอคอนที่เหมาะสม
          style={styles.icon}
        />
      </View>
      <Text style={styles.text}>Report</Text>
     
     
     
      onPress={() =>
        navigation.navigate('ReporterLog')
      }


    </TouchableOpacity>



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
  iconContainer: {
    
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});

export default ReportButton;
