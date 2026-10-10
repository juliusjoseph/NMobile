import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Hero, Field, Button, Chip, Label } from "../components/ui";
import { useTheme } from "../theme";
import { useCheckout } from "../useCheckout";
import { naira } from "../format";
import { BILLS } from "../catalog";
import AppImages from "../images";
import { RootStackParamList } from "../types";

export default function Bills({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Bills">) {
  const { c } = useTheme();
  const checkout = useCheckout();
  const [cat, setCat] = useState(BILLS[0].id);
  const [biller, setBiller] = useState("");
  const [acct, setAcct] = useState("");
  const [amt, setAmt] = useState("");
  const [errs, setErrs] = useState<Record<string, string>>({});
  const group = BILLS.find((b) => b.id === cat)!;
  const amount = parseInt(amt, 10) || 0;

  function go() {
    const e: Record<string, string> = {};
    if (!biller) e.biller = "Choose a provider";
    if (acct.trim().length < 6)
      e.acct = `Enter a valid ${group.field.toLowerCase()}`;
    if (amount < 100) e.amt = "The minimum is ₦100";
    setErrs(e);
    if (Object.keys(e).length) return;
    checkout(
      "Bills",
      `${group.label}: ${biller}`,
      `${group.field}: ${acct.trim()}`,
      amount,
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <View style={{ flex: 1, backgroundColor: c.bg }}>
        <Hero
          image={AppImages.bg1}
          title="Bills"
          subtitle="Pay your bills from your wallet"
          onBack={() => navigation.goBack()}
        />

        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            padding: 20,
            paddingBottom: 40,
            backgroundColor: c.bg,
          }}
        >
          <Label>Category</Label>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {BILLS.map((b) => (
              <Chip
                key={b.id}
                label={b.label}
                icon={b.icon}
                active={cat === b.id}
                onPress={() => {
                  setCat(b.id);
                  setBiller("");
                }}
              />
            ))}
          </View>
          <Label>Provider</Label>
          <View
            style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 6 }}
          >
            {group.billers.map((b) => (
              <Chip
                key={b}
                label={b}
                active={biller === b}
                onPress={() => setBiller(b)}
              />
            ))}
          </View>
          {errs.biller ? (
            <View style={{ marginBottom: 8 }}>
              <Label>{errs.biller}</Label>
            </View>
          ) : null}
          <Field
            label={group.field}
            value={acct}
            onChangeText={setAcct}
            error={errs.acct}
            keyboardType="numeric"
          />
          <Field
            label="Amount (₦)"
            value={amt}
            onChangeText={(t) => setAmt(t.replace(/[^0-9]/g, ""))}
            keyboardType="numeric"
            error={errs.amt}
          />
          <Button
            title={amount ? `Pay ${naira(amount)}` : "Pay bill"}
            onPress={go}
          />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
