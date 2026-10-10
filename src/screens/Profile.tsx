import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Screen, Header, Card, Field, Button, Label } from "../components/ui";
import { useTheme, Mode } from "../theme";
import { useStore } from "../store";

const MODES: { id: Mode; label: string }[] = [
  { id: "system", label: "System" }, { id: "light", label: "Light" }, { id: "dark", label: "Dark" },
];

export default function Profile() {
  const { c, mode, setMode } = useTheme();
  const { user, updateName, signOut } = useStore();
  const [editing, setEditing] = useState(false);
  const [first, setFirst] = useState(user?.first ?? "");
  const [last, setLast] = useState(user?.last ?? "");
  const [err, setErr] = useState("");

  function save() {
    if (!first.trim() || !last.trim()) { setErr("Enter both names"); return; }
    updateName(first.trim(), last.trim());
    setErr("");
    setEditing(false);
  }

  return (
    <Screen bottom={false}>
      <Header title="Profile" />
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: 24 }}>
        <View style={{ alignItems: "center", marginTop: 6 }}>
          <LinearGradient colors={[c.g1, c.g2]} style={{ width: 92, height: 92, borderRadius: 46, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ color: "#fff", fontSize: 34, fontWeight: "800" }}>{user?.first.charAt(0).toUpperCase()}{user?.last.charAt(0).toUpperCase()}</Text>
          </LinearGradient>
          <Text style={{ color: c.text, fontSize: 22, fontWeight: "800", marginTop: 12 }}>{user?.first} {user?.last}</Text>
          <Text style={{ color: c.sub }}>{user?.email}</Text>
        </View>

        <Card style={{ marginTop: 22 }}>
          {editing ? (
            <>
              <Field label="First name" value={first} onChangeText={setFirst} autoCapitalize="words" />
              <Field label="Last name" value={last} onChangeText={setLast} autoCapitalize="words" error={err} />
              <Button title="Save" onPress={save} />
              <Button variant="ghost" title="Cancel" onPress={() => { setEditing(false); setFirst(user?.first ?? ""); setLast(user?.last ?? ""); }} />
            </>
          ) : (
            <>
              <Text style={{ color: c.sub, fontSize: 13 }}>Name</Text>
              <Text style={{ color: c.text, fontSize: 16, fontWeight: "700", marginBottom: 12 }}>{user?.first} {user?.last}</Text>
              <Text style={{ color: c.sub, fontSize: 13 }}>Email</Text>
              <Text style={{ color: c.text, fontSize: 16, fontWeight: "700", marginBottom: 12 }}>{user?.email}</Text>
              <Button title="Edit profile" onPress={() => setEditing(true)} />
            </>
          )}
        </Card>

        <View style={{ marginTop: 22 }}>
          <Label>Appearance</Label>
          <View style={{ flexDirection: "row", backgroundColor: c.surface, borderRadius: 14, padding: 4, borderWidth: 1, borderColor: c.line }}>
            {MODES.map((m) => (
              <Pressable key={m.id} onPress={() => setMode(m.id)}
                style={{ flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: "center", backgroundColor: mode === m.id ? c.g2 : "transparent" }}>
                <Text style={{ color: mode === m.id ? "#fff" : c.sub, fontWeight: "700" }}>{m.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={{ marginTop: 24 }}><Button title="Log out" onPress={signOut} /></View>
        <Text style={{ color: c.sub, fontSize: 12, textAlign: "center", marginTop: 20 }}>NMobile, a member of Taylorcomms Group</Text>
      </ScrollView>
    </Screen>
  );
}
