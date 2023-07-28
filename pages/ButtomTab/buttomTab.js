import * as React from "react";
import { Text, View, StyleSheet, Platform, StatusBar } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

import Icon from "react-native-vector-icons/EvilIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Home from "../home";
import Ncommss from "../ncomms2";
import Profile from "../profile";
import Ncomms2 from "../ncomms2";

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          display: "flex",
          position: "absolute",
          bottom: 0.9,
          left: 0,
          right: 0,
          elevation: 10,
          backgroundColor: "#FFFFFF",
          width: "100%",
          height: 55,
        },
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                top: Platform.OS === "ios" ? 10 : 0,
              }}
            >
              <Entypo
                name={"home"}
                size={25}
                color={focused ? "#20a201" : "gray"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ncomms2"
        component={Ncomms2}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                top: Platform.OS === "ios" ? 10 : 0,
              }}
            >
              <FontAwesome5
                name="satellite-dish"
                size={25}
                color={focused ? "#20a201" : "gray"}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                top: Platform.OS === "ios" ? 10 : 0,
              }}
            >
              <FontAwesome5
                name="user-alt"
                size={25}
                color={focused ? "#20a201" : "gray"}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomTabNavigator;
