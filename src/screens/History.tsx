import React from "react";
import { FlatList, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Screen, Header, TxRow } from "../components/ui";
import { useTheme } from "../theme";
import { useStore } from "../store";
import { RootStackParamList } from "../types";

export default function History() {
  const { c } = useTheme();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user } = useStore();
  const tx = user?.tx ?? [];
  return (
    <Screen bottom={false}>
      <Header title="History" />
      <FlatList
        data={tx} keyExtractor={(t) => t.id} showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: c.line }} />}
        renderItem={({ item }) => <TxRow tx={item} onPress={() => nav.navigate("Receipt", { id: item.id })} />}
        ListEmptyComponent={
          <View style={{ alignItems: "center", marginTop: 80 }}>
            <Ionicons name="receipt-outline" size={56} color={c.sub} />
            <Text style={{ color: c.sub, marginTop: 12 }}>No transactions yet.</Text>
          </View>
        }
      />
    </Screen>
  );
}
