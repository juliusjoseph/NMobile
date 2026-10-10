import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Screen, Header, Card } from "../components/ui";
import { useTheme } from "../theme";
import AppImages from "../images";
import { RootStackParamList } from "../types";

const ITEMS = [
  {
    kind: "broadband",
    title: "Broadband Services",
    sub: "Fast home and office internet",
    image: AppImages.broadband,
  },
  {
    kind: "wifi",
    title: "Wifi Services",
    sub: "Daily, weekly and monthly passes",
    image: AppImages.nmWifi,
  },
  {
    kind: "coverage",
    title: "Network Coverages",
    sub: "See where we are live",
    image: AppImages.nmNet,
  },
] as const;

export default function Ncomms() {
  const { c } = useTheme();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <Screen bottom={false}>
      <Header title="NComms services" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {ITEMS.map((it) => (
          <Pressable
            key={it.kind}
            onPress={() => nav.navigate("NcommsDetail", { kind: it.kind })}
            style={{ marginBottom: 16 }}
          >
            <Card style={{ padding: 0, overflow: "hidden" }}>
              <View style={{ backgroundColor: "#fff" }}>
                <Image
                  source={it.image}
                  resizeMode="contain"
                  style={{ width: "100%", height: 135 }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 16,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{ color: c.text, fontSize: 16, fontWeight: "700" }}
                  >
                    {it.title}
                  </Text>
                  <Text style={{ color: c.sub, fontSize: 13, marginTop: 2 }}>
                    {it.sub}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={c.sub} />
              </View>
            </Card>
          </Pressable>
        ))}
      </ScrollView>
    </Screen>
  );
}
