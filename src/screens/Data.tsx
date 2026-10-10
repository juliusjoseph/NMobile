import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Hero,
  Field,
  Button,
  Label,
  NetworkPicker,
  OptionRow,
} from "../components/ui";
import { useTheme } from "../theme";
import { useCheckout } from "../useCheckout";
import { naira } from "../format";
import { DATA_PLANS } from "../catalog";
import AppImages from "../images";
import { RootStackParamList } from "../types";

export default function Data({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Data">) {
  const { c } = useTheme();
  const checkout = useCheckout();
  const [net, setNet] = useState("");
  const [phone, setPhone] = useState("");
  const [sel, setSel] = useState("");
  const [errs, setErrs] = useState<Record<string, string>>({});
  const plan = DATA_PLANS.find((p) => p.id === sel);

  function go() {
    const e: Record<string, string> = {};
    if (!net) e.net = "Choose a network";
    if (!/^0\d{10}$/.test(phone))
      e.phone = "Enter an 11-digit number starting with 0";
    if (!plan) e.plan = "Choose a data plan";
    setErrs(e);
    if (Object.keys(e).length || !plan) return;
    checkout(
      "Data",
      `${net} ${plan.label} data`,
      `${phone} · ${plan.detail}`,
      plan.price,
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <Hero
        image={AppImages.bg4}
        title="Data"
        subtitle="Bundles for any network"
        onBack={() => navigation.goBack()}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            padding: 20,
            paddingBottom: 40,
            backgroundColor: c.bg,
          }}
        >
          <NetworkPicker value={net} onChange={setNet} error={errs.net} />
          <Field
            label="Mobile number"
            value={phone}
            onChangeText={(t) => setPhone(t.replace(/[^0-9]/g, ""))}
            keyboardType="phone-pad"
            maxLength={11}
            error={errs.phone}
            placeholder="08012345678"
            leftIcon={<Ionicons name="call-outline" size={20} color={c.sub} />}
          />
          <Label>Choose a plan (sample prices)</Label>
          {DATA_PLANS.map((p) => (
            <OptionRow
              key={p.id}
              title={p.label}
              sub={p.detail}
              right={naira(p.price)}
              active={sel === p.id}
              onPress={() => setSel(p.id)}
            />
          ))}
          {errs.plan ? (
            <View style={{ marginBottom: 10 }}>
              <Label>{errs.plan}</Label>
            </View>
          ) : null}
          <Button
            title={
              plan ? `Buy ${plan.label} for ${naira(plan.price)}` : "Buy data"
            }
            onPress={go}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
