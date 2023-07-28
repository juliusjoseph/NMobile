import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Auth/login";
import Register from "./Auth/register";
import Ncomms from "./pages/ncomms";
import Bills from "./pages/bills";
import Ncommss from "./pages/ncomms2";
import PassWord from "./Auth/ForgetPassword";
import Intro from "./Auth/intro";
import Data from "./pages/Data";
import Airtime from "./pages/airtime";
import BottomTabNavigator from "./pages/ButtomTab/buttomTab";
import Ncomms2 from "./pages/ncomms2";
const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="intro"
          component={Intro}
          // options={{title: 'Welcome'}}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          // options={{title: 'Welcome'}}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="register"
          component={Register}
          // options={{title: 'Welcome'}}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="password"
          component={PassWord}
          // options={{title: 'Welcome'}}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ncomms"
          component={Ncomms}
          // options={{title: 'Welcome'}}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ncomms2"
          component={Ncomms2}
          // options={{title: 'Welcome'}}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="airtime"
          component={Airtime}
          // options={{title: 'Welcome'}}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Data"
          component={Data}
          // options={{title: 'Welcome'}}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="bills"
          component={Bills}
          // options={{title: 'Welcome'}}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="buttomTab"
          component={BottomTabNavigator}
          // options={{title: 'Welcome'}}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MyStack;
