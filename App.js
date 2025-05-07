import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';  
import { View, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import HomeScreen from './src/page/home/Home';
import ReporterIndex from './src/page/reporter/reporter-index';
import LoginScreen from './src/page/reporter/LoginScreen';
import StudentList from './src/page/reporter/student';
import StudentForm from './src/page/reporter/reporting';
import StudentLog from './src/page/reporter/studentLog';  
import { UserProvider } from "./src/page/reporter/component/UserContext"; 
import { StudentProvider } from "./src/page/reporter/component/StudentContext"; 
import { AdminProvider } from "./src/page/admin/component/AdminContext"; 
import { ParentProvider } from "./src/page/parent/component/ParentContext"; 

import ParentIndex from "./src/page/parent/parent-index";
import ParentLoginScreen from "./src/page/parent/ParentLoginScreen";
import History from "./src/page/parent/history";
import StudentHistory from "./src/page/parent/student-history";
import StudentGraph from "./src/page/parent/student-graph";
import AdminLoginScreen from "./src/page/admin/AdminLoginScreen";
import AdminIndex from "./src/page/admin/admin-index";
import UpdateStudent from "./src/page/admin/Update_AdminStudent"
import Behavior from "./src/page/admin/Behavior"
import Behavior_his from "./src/page/admin/Behavior_his"
import Behavior_graph from "./src/page/admin/Behavior_graph"

import AdminReporter from "./src/page/admin/AdminReporter"
import UpdateReporter from "./src/page/admin/Update_AdminReporter"
import AddReporter from "./src/page/admin/Add_AdminReporter"

import AdminParent from "./src/page/admin/AdminParent"
import UpdateParent from "./src/page/admin/Update_AdminParent"
import AddParent from "./src/page/admin/Add_AdminParent"

import AdminAdmin from "./src/page/admin/AdminAdmin"
import UpdateAdmin from "./src/page/admin/Update_AdminAdmin"
import AddAdmin from "./src/page/admin/Add_AdminAdmin"

import AddStudent from "./src/page/admin/Add_AdminStudent"

import AdminStudent from "./src/page/admin/AdminStudent";
import MessageBox from "./src/page/admin/MessageBox";
import Request from "./src/page/admin/Request";
import UsersManage from "./src/page/admin/UsersManage";

function App() {



  const isDarkMode = useColorScheme() === 'dark';
  const Stack = createNativeStackNavigator();
  const backgroundStyle = {
    flex: 1, // 👈 สำคัญมาก!
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View style={backgroundStyle}>
<AdminProvider>
    <ParentProvider>
      <UserProvider>
        <StudentProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
              <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
              <Stack.Screen name="ParentLoginScreen" component={ParentLoginScreen} options={{ headerShown: false }} />
              <Stack.Screen name="ReporterIndex" component={ReporterIndex} options={{ headerShown: false }} />
              <Stack.Screen name="StudentList" component={StudentList} options={{ headerShown: false }} />
              <Stack.Screen name="StudentForm" component={StudentForm} options={{ headerShown: false }}/>
              <Stack.Screen name="StudentLog" component={StudentLog} options={{ headerShown: false }}/>
              <Stack.Screen name="ParentIndex" component={ParentIndex} options={{ headerShown: false }}  />
              <Stack.Screen name="History" component={History} options={{ headerShown: false }}   />
              <Stack.Screen name="StudentHistory" component={StudentHistory} options={{ headerShown: false }} />
              <Stack.Screen name="StudentGraph" component={StudentGraph} options={{ headerShown: false }} />
              <Stack.Screen name="AdminLoginScreen" component={AdminLoginScreen} options={{ headerShown: false }} />
              <Stack.Screen name="AdminIndex" component={AdminIndex} options={{ headerShown: false }}  />
              <Stack.Screen name="AdminStudent" component={AdminStudent} options={{ headerShown: false }}  />
              <Stack.Screen name="MessageBox" component={MessageBox} options={{ headerShown: false }}  />
              <Stack.Screen name="Request" component={Request} options={{ headerShown: false }}  />
              <Stack.Screen name="UsersManage" component={UsersManage} options={{ headerShown: false }}  />
              <Stack.Screen name="UpdateStudent" component={UpdateStudent} options={{ headerShown: false }}  />
              <Stack.Screen name="Behavior" component={Behavior} options={{ headerShown: false }}  />
              <Stack.Screen name="Behavior_his" component={Behavior_his} options={{ headerShown: false }}  />
              <Stack.Screen name="Behavior_graph" component={Behavior_graph} options={{ headerShown: false }}  />
              <Stack.Screen name="AdminReporter" component={AdminReporter} options={{ headerShown: false }}  />
              <Stack.Screen name="UpdateReporter" component={UpdateReporter} options={{ headerShown: false }}  />
              <Stack.Screen name="AddReporter" component={AddReporter} options={{ headerShown: false }}  />

              <Stack.Screen name="AdminParent" component={AdminParent} options={{ headerShown: false }}  />
              <Stack.Screen name="UpdateParent" component={UpdateParent} options={{ headerShown: false }}  />
              <Stack.Screen name="AddParent" component={AddParent} options={{ headerShown: false }}  />
              
              <Stack.Screen name  ="AdminAdmin" component={AdminAdmin} options={{ headerShown: false }}  />
              <Stack.Screen name="UpdateAdmin" component={UpdateAdmin} options={{ headerShown: false }}  />
              <Stack.Screen name="AddAdmin" component={AddAdmin} options={{ headerShown: false }}  />

              <Stack.Screen name="AddStudent" component={AddStudent} options={{ headerShown: false }}  />
            </Stack.Navigator>
          </NavigationContainer>
        </StudentProvider>
      </UserProvider>
    </ParentProvider>
    </AdminProvider>
    </View>
  );
}

export default App;
