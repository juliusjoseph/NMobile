import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Screen, Button, Field, BrandMark } from "../components/ui";
import { useTheme } from "../theme";
import { useStore } from "../store";
import { RootStackParamList } from "../types";

export default function Auth() {
  const { c } = useTheme();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { signIn, signUp } = useStore();
  const [up, setUp] = useState(true);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [errs, setErrs] = useState<Record<string, string>>({});

  function submit() {
    const e: Record<string, string> = {};
    if (up && !first.trim()) e.first = "Enter your first name";
    if (up && !last.trim()) e.last = "Enter your last name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      e.email = "Enter a valid email address";
    if (pw.length < 6) e.pw = "Use at least 6 characters";
    if (up && confirm !== pw) e.confirm = "Passwords do not match";
    setErrs(e);
    if (Object.keys(e).length) return;
    const msg = up
      ? signUp(first.trim(), last.trim(), email, pw)
      : signIn(email, pw);
    if (msg) setErrs({ form: msg });
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <Screen>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        >
          <BrandMark />
          <Text
            style={{
              color: c.text,
              fontSize: 30,
              fontWeight: "800",
              marginTop: 28,
            }}
          >
            {up ? "Create account" : "Log in"}
          </Text>
          <Text
            style={{
              color: c.sub,
              fontSize: 15,
              marginTop: 6,
              marginBottom: 24,
            }}
          >
            {up
              ? "Your NMoney wallet and history are saved on this device."
              : "Welcome back. Sign in to continue."}
          </Text>
          {up && (
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Field
                  label="First name"
                  value={first}
                  onChangeText={setFirst}
                  error={errs.first}
                  autoCapitalize="words"
                />
              </View>
              <View style={{ flex: 1, marginLeft: 8 }}>
                <Field
                  label="Last name"
                  value={last}
                  onChangeText={setLast}
                  error={errs.last}
                  autoCapitalize="words"
                />
              </View>
            </View>
          )}
          <Field
            label="Email address"
            value={email}
            onChangeText={setEmail}
            error={errs.email}
            autoCapitalize="none"
            keyboardType="email-address"
            leftIcon={<Ionicons name="mail-outline" size={20} color={c.sub} />}
          />
          <Field
            label="Password"
            value={pw}
            onChangeText={setPw}
            error={errs.pw}
            secureTextEntry={!show}
            autoCapitalize="none"
            leftIcon={
              <Ionicons name="lock-closed-outline" size={20} color={c.sub} />
            }
            onRightPress={() => setShow(!show)}
            rightIcon={
              <Ionicons
                name={show ? "eye-outline" : "eye-off-outline"}
                size={22}
                color={c.sub}
              />
            }
          />
          {up && (
            <Field
              label="Confirm password"
              value={confirm}
              onChangeText={setConfirm}
              error={errs.confirm}
              secureTextEntry={!show}
              autoCapitalize="none"
              leftIcon={
                <Ionicons name="lock-closed-outline" size={20} color={c.sub} />
              }
            />
          )}
          {!up && (
            <Pressable
              onPress={() => nav.navigate("Forgot")}
              style={{ alignSelf: "flex-end", marginBottom: 14 }}
            >
              <Text style={{ color: c.primary, fontWeight: "600" }}>
                Forgotten password?
              </Text>
            </Pressable>
          )}
          {errs.form ? (
            <Text style={{ color: c.danger, marginBottom: 14 }}>
              {errs.form}
            </Text>
          ) : null}
          <Button title={up ? "Sign up" : "Log in"} onPress={submit} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 22,
            }}
          >
            <Text style={{ color: c.sub }}>
              {up ? "Already have an account? " : "Don't have an account yet? "}
            </Text>
            <Pressable
              onPress={() => {
                setUp(!up);
                setErrs({});
              }}
            >
              <Text style={{ color: c.primary, fontWeight: "700" }}>
                {up ? "Sign in" : "Sign up"}
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </Screen>
    </KeyboardAvoidingView>
  );
}
