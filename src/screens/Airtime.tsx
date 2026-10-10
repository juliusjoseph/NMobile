import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Hero, Field, Button, Chip, Label, NetworkPicker } from "../components/ui";
import { useTheme } from "../theme";
import { useCheckout } from "../useCheckout";
import { naira } from "../format";
import { AIRTIME_AMOUNTS } from "../catalog";
import AppImages from "../images";
import { RootStackParamList } from "../types";

export default function Airtime({ navigation }: NativeStackScreenProps<RootStackParamList, "Airtime">) {
  const { c } = useTheme();
  const checkout = useCheckout();
  const [net, setNet] = useState("");
  const [phone, setPhone] = useState("");
  const [amt, setAmt] = useState("");
  const [errs, setErrs] = useState<Record<string, string>>({});
  const amount = parseInt(amt, 10) || 0;

  function go() {
    const e: Record<string, string> = {};
    if (!net) e.net = "Choose a network";
    if (!/^0\d{10}$/.test(phone)) e.phone = "Enter an 11-digit number starting with 0";
    if (amount < 50) e.amt = "The minimum is ₦50";
    setErrs(e);
    if (Object.keys(e).length) return;
    checkout("Airtime", `${net} airtime`, phone, amount);
  }

  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <Hero image={AppImages.bg5} title="Airtime" subtitle="Top up any network" onBack={() => navigation.goBack()} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
          <NetworkPicker value={net} onChange={setNet} error={errs.net} />
          <Field label="Mobile number" value={phone} onChangeText={(t) => setPhone(t.replace(/[^0-9]/g, ""))} keyboardType="phone-pad" maxLength={11}
            error={errs.phone} placeholder="08012345678" leftIcon={<Ionicons name="call-outline" size={20} color={c.sub} />} />
          <Label>Amount</Label>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {AIRTIME_AMOUNTS.map((a) => <Chip key={a} label={naira(a)} active={amount === a} onPress={() => setAmt(String(a))} />)}
          </View>
          <Field label="Or enter an amount (₦)" value={amt} onChangeText={(t) => setAmt(t.replace(/[^0-9]/g, ""))} keyboardType="numeric" error={errs.amt} placeholder="Amount" />
          <Button title={amount ? `Buy ${naira(amount)} airtime` : "Buy airtime"} onPress={go} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
