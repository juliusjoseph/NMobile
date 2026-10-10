import React from "react";
import { Pressable, Text, View } from "react-native";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import { useStore } from "./store";
import { useTheme } from "./theme";
import { RootStackParamList, TabParamList } from "./types";
import Intro from "./screens/Intro";
import Auth from "./screens/Auth";
import Forgot from "./screens/Forgot";
import Home from "./screens/Home";
import Ncomms from "./screens/Ncomms";
import NcommsDetail from "./screens/NcommsDetail";
import Wallet from "./screens/Wallet";
import History from "./screens/History";
import Profile from "./screens/Profile";
import Airtime from "./screens/Airtime";
import Data from "./screens/Data";
import Train from "./screens/Train";
import Bills from "./screens/Bills";
import Receipt from "./screens/Receipt";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const TABS: Record<
  keyof TabParamList,
  { label: string; icon: (color: string) => React.ReactNode }
> = {
  Home: {
    label: "Home",
    icon: (col) => <Entypo name="home" size={22} color={col} />,
  },
  Ncomms: {
    label: "NComms",
    icon: (col) => <FontAwesome5 name="satellite-dish" size={19} color={col} />,
  },
  Wallet: {
    label: "Wallet",
    icon: (col) => <Entypo name="wallet" size={22} color={col} />,
  },
  History: {
    label: "History",
    icon: (col) => (
      <FontAwesome5 name="money-bill-wave" size={19} color={col} />
    ),
  },
  Profile: {
    label: "Profile",
    icon: (col) => <FontAwesome5 name="user-alt" size={19} color={col} />,
  },
};

// The active tab opens into a labelled pill, as in your original design.
function TabBar({ state, navigation }: BottomTabBarProps) {
  const { c } = useTheme();
  const i = useSafeAreaInsets();
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: c.surface,
        borderTopWidth: 1,
        borderTopColor: c.line,
        paddingTop: 8,
        paddingBottom: i.bottom + 8,
        paddingHorizontal: 8,
      }}
    >
      {state.routes.map((route, idx) => {
        const focused = state.index === idx;
        const meta = TABS[route.name as keyof TabParamList];
        return (
          <Pressable
            key={route.key}
            style={{
              flex: focused ? 2.4 : 1,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              const e = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });
              if (!focused && !e.defaultPrevented)
                navigation.navigate(route.name as never);
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: 44,
                paddingHorizontal: focused ? 16 : 0,
                borderRadius: focused ? 22 : 0,
                backgroundColor: focused ? c.raised : "transparent",
              }}
            >
              {meta.icon(focused ? c.primary : c.sub)}
              {focused ? (
                <Text
                  style={{ color: c.primary, fontWeight: "700", marginLeft: 8 }}
                >
                  {meta.label}
                </Text>
              ) : null}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(p) => <TabBar {...p} />}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Ncomms" component={Ncomms} />
      <Tab.Screen name="Wallet" component={Wallet} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  const { ready, onboarded, user } = useStore();
  const { c } = useTheme();
  if (!ready) return null;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: c.bg },
      }}
    >
      {!onboarded ? (
        <Stack.Screen name="Intro" component={Intro} />
      ) : !user ? (
        <>
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="Forgot" component={Forgot} />
        </>
      ) : (
        <>
          <Stack.Screen name="Tabs" component={Tabs} />
          <Stack.Screen name="Airtime" component={Airtime} />
          <Stack.Screen name="Data" component={Data} />
          <Stack.Screen name="Train" component={Train} />
          <Stack.Screen name="Bills" component={Bills} />
          <Stack.Screen name="NcommsDetail" component={NcommsDetail} />
          <Stack.Screen name="Receipt" component={Receipt} />
        </>
      )}
    </Stack.Navigator>
  );
}
