import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Screen, Header, Card, Button } from "../components/ui";
import { useTheme } from "../theme";
import { useStore } from "../store";
import { naira, when } from "../format";
import { RootStackParamList } from "../types";

export default function Receipt({ route, navigation }: NativeStackScreenProps<RootStackParamList, "Receipt">) {
  const { c } = useTheme();
  const { user } = useStore();
  const tx = user?.tx.find((t) => t.id === route.params.id);
  if (!tx) return <Screen><Header title="Receipt" onBack={() => navigation.goBack()} /></Screen>;

  const rows: [string, string][] = [
    ["Type", tx.kind], ["Details", tx.detail], ["Date", when(tx.date)], ["Reference", tx.id.toUpperCase()],
  ];
  return (
    <Screen>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <LinearGradient colors={[c.g1, c.g2]} style={{ width: 96, height: 96, borderRadius: 48, alignItems: "center", justifyContent: "center" }}>
          <Ionicons name="checkmark" size={56} color="#fff" />
        </LinearGradient>
        <Text style={{ color: c.text, fontSize: 28, fontWeight: "800", marginTop: 20 }}>{tx.amount > 0 ? "Money added" : "Payment successful"}</Text>
        <Text style={{ color: c.primary, fontSize: 32, fontWeight: "800", marginTop: 6 }}>{naira(tx.amount)}</Text>
        <Text style={{ color: c.sub, marginTop: 4, textAlign: "center" }}>{tx.title}</Text>
        <Card style={{ width: "100%", marginTop: 26 }}>
          {rows.map(([k, v], n) => (
            <View key={k} style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 10, borderTopWidth: n ? 1 : 0, borderTopColor: c.line }}>
              <Text style={{ color: c.sub }}>{k}</Text>
              <Text style={{ color: c.text, fontWeight: "600", flex: 1, textAlign: "right", marginLeft: 16 }}>{v}</Text>
            </View>
          ))}
        </Card>
      </View>
      <View style={{ paddingBottom: 12 }}><Button title="Done" onPress={() => navigation.goBack()} /></View>
    </Screen>
  );
}
