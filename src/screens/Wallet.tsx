import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Screen,
  Header,
  Card,
  Chip,
  Field,
  Button,
  Label,
  TxRow,
} from "../components/ui";
import { useTheme } from "../theme";
import { useStore } from "../store";
import { naira } from "../format";
import AppImages from "../images";
import { RootStackParamList } from "../types";

const QUICK = [1000, 2000, 5000, 10000, 20000];

export default function Wallet() {
  const { c } = useTheme();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user, fund } = useStore();
  const [amt, setAmt] = useState("");
  const [err, setErr] = useState("");
  const amount = parseInt(amt, 10) || 0;

  function add() {
    if (amount < 100) {
      setErr("The minimum is ₦100");
      return;
    }
    setErr("");
    fund(amount);
    setAmt("");
    Alert.alert(
      "Wallet funded",
      `${naira(amount)} was added to your wallet (demo).`,
    );
  }

  return (
    <Screen bottom={false}>
      <Header title="NMoney" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <LinearGradient
          colors={[c.g1, c.g2]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: 22, padding: 22 }}
        >
          <Text style={{ color: "rgba(255,255,255,0.85)", fontSize: 14 }}>
            Wallet balance
          </Text>
          <Text
            style={{
              color: "#fff",
              fontSize: 36,
              fontWeight: "800",
              marginTop: 4,
            }}
          >
            {naira(user?.balance ?? 0)}
          </Text>
          <Text style={{ color: "rgba(255,255,255,0.85)", marginTop: 12 }}>
            {user?.first} {user?.last}
          </Text>
        </LinearGradient>

        <Card style={{ marginTop: 16 }}>
          <Label>Add money</Label>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {QUICK.map((q) => (
              <Chip
                key={q}
                label={naira(q)}
                active={amount === q}
                onPress={() => setAmt(String(q))}
              />
            ))}
          </View>
          <Field
            label="Amount (₦)"
            value={amt}
            onChangeText={(t) => setAmt(t.replace(/[^0-9]/g, ""))}
            keyboardType="numeric"
            error={err}
            placeholder="Enter an amount"
          />
          <Button
            title={amount ? `Add ${naira(amount)}` : "Add money"}
            onPress={add}
          />
        </Card>

        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 18,
            overflow: "hidden",
            marginTop: 16,
            borderWidth: 1,
            borderColor: c.line,
          }}
        >
          <Image
            source={AppImages.banner}
            resizeMode="cover"
            style={{ width: "100%", height: 200 }}
          />
        </View>

        <Text
          style={{
            color: c.text,
            fontSize: 18,
            fontWeight: "700",
            marginTop: 22,
          }}
        >
          Recent activity
        </Text>
        {(user?.tx ?? []).slice(0, 5).map((t) => (
          <TxRow
            key={t.id}
            tx={t}
            onPress={() => nav.navigate("Receipt", { id: t.id })}
          />
        ))}
      </ScrollView>
    </Screen>
  );
}
