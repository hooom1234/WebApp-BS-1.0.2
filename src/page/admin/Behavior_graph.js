import React, { useEffect, useState } from "react";
import { API_URL } from '@env';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Alert,
} from "react-native";
import axios from "axios";
import { LineChart } from "react-native-chart-kit";

import AdminStudentButton from "./button/student-Button";

const { width, height } = Dimensions.get("window");

const severityMapping = {
  High: 3,
  Medium: 2,
  Low: 1,
};

const Behavior_graph = ({ route, navigation }) => {
  const { id } = route.params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/Admin-System/Behavior_his.php?student=${id}`
        );

        if (!response.data || response.data.error) {
          Alert.alert("Error", response.data.error || "ไม่พบข้อมูล");
          return;
        }

        let formattedData = response.data.map((item) => {
          const dateObj = new Date(item.time);
          return {
            level: severityMapping[item.level] || 0,
            date: dateObj.toLocaleDateString(),
            time: dateObj.toLocaleTimeString(),
          };
        });

        if (formattedData.length > 0) {
          formattedData = [
            { level: 0, date: "Start", time: "" },
            ...formattedData,
          ];
        }

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        Alert.alert("เกิดข้อผิดพลาด", "ไม่สามารถโหลดข้อมูลได้");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);


  const chartData = {
    labels: data.map((item) => `${item.date}\n${item.time}`),
    datasets: [
      {
        data: data.map((item) => item.level),
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    labels: data.map((item) => {
        const dateParts = item.date.split(" ");  // แบ่งวันที่
        return `${dateParts[0]}\n${item.time}`;  // แสดงวันที่และเวลา
      }),
    
      datasets: [
        {
          data: data.map((item) => item.level),  // ใช้ข้อมูลระดับความรุนแรง
          strokeWidth: 2,  // ความหนาของเส้นกราฟ
        },
      ],
    };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <AdminStudentButton />
        </View>

        <View style={styles.spacing} />

        <View style={styles.header}>
          <Text style={styles.headerText}>กราฟพฤติกรรม</Text>
        </View>

        <View style={styles.chartWrapper}>
          {data.length > 1 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={true}>
              <LineChart  
  data={chartData}
  width={Math.max(Dimensions.get("window").width, data.length * 200)} // ✅ ห่างกันมากขึ้น
  height={500}
  yAxisLabel=""
  yAxisSuffix=""
  yLabelsOffset={0}
  fromZero={false} 
  segments={3} 
  chartConfig={{
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#f8f9fa",
    backgroundGradientTo: "#f8f9fa",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 10,
      paddingTop: height * 0.03, // ✅ เพิ่มระยะห่างด้านบน
    },
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: "#0000ff",
    },
  }}
  
/>
            </ScrollView>
          ) : (
            <Text style={styles.noDataText}>ไม่มีข้อมูลแสดงกราฟ</Text>
          )}
          <Text style={styles.axisNote}>
            แกน X: วันเวลา | แกน Y: ระดับความรุนแรง
          </Text>
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
    paddingBottom: 40,
  },
  logoContainer: {
    backgroundColor: "#96622F",
    width: "100%",
    alignItems: "center",
    paddingVertical: 20,
  },
  spacing: {
    height: 20,
  },
  header: {
    backgroundColor: "#6C3B0A",
    width: "80%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 15,
    alignItems: "center",
  },
  headerText: {
    fontFamily: "Kanit-Bold",
    fontSize: 24,
    color: "#fff",
  },
  chartWrapper: {
    backgroundColor: "#96622F",
    width: "80%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: 30,
    alignItems: "center",
  },
  noDataText: {
    fontFamily: "Kanit-Bold",
    color: "#fff",
    fontSize: 18,
  },
  axisNote: {
    marginTop: 10,
    color: "#fff",
    fontFamily: "Kanit-Bold",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Behavior_graph;
