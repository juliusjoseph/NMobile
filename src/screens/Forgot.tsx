import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Screen, Header, Field, Button } from "../components/ui";
import { useTheme } from "../theme";
import { useStore } from "../store";
import { RootStackParamList } from "../types";

export default function Forgot({ navigation }: NativeStackScreenProps<RootStackParamList, "Forgot">) {
  const { c } = useTheme();
  const { resetPassword } = useStore();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [errs, setErrs] = useState<Record<string, string>>({});

  function submit() {
    const e: Record<string, string> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = "Enter a valid email address";
    if (pw.length < 6) e.pw = "Use at least 6 characters";
    setErrs(e);
    if (Object.keys(e).length) return;
    const msg = resetPassword(email, pw);
    if (msg) { setErrs({ email: msg }); return; }
    Alert.alert("Password updated", "You can now log in with your new password.", [{ text: "OK", onPress: () => navigation.goBack() }]);
  }

  return (
    <Screen>
      <Header title="Forgot password" onBack={() => navigation.goBack()} />
      <Text style={{ color: c.sub, fontSize: 15, marginTop: 6, marginBottom: 24 }}>Enter your email and choose a new password.</Text>
      <Field label="Email address" value={email} onChangeText={setEmail} error={errs.email} autoCapitalize="none" keyboardType="email-address"
        leftIcon={<Ionicons name="mail-outline" size={20} color={c.sub} />} />
      <Field label="New password" value={pw} onChangeText={setPw} error={errs.pw} secureTextEntry autoCapitalize="none"
        leftIcon={<Ionicons name="lock-closed-outline" size={20} color={c.sub} />} />
      <View style={{ marginTop: 8 }}><Button title="Reset password" onPress={submit} /></View>
    </Screen>
  );
}
