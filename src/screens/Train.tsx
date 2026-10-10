import React, { useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Hero, Card, Button, Label, OptionRow } from "../components/ui";
import { useTheme } from "../theme";
import { useCheckout } from "../useCheckout";
import { naira } from "../format";
import { TRIPS } from "../catalog";
import AppImages from "../images";
import { RootStackParamList } from "../types";

export default function Train({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Train">) {
  const { c } = useTheme();
  const checkout = useCheckout();
  const [sel, setSel] = useState("");
  const [qty, setQty] = useState(1);
  const trip = TRIPS.find((t) => t.id === sel);
  const total = trip ? trip.price * qty : 0;
  const stepBtn = {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: c.raised,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  };

  function go() {
    if (!trip) {
      Alert.alert("Choose a trip", "Please select a trip first.");
      return;
    }
    checkout(
      "Train",
      `${qty} ticket${qty > 1 ? "s" : ""}: ${trip.label}`,
      trip.detail,
      total,
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <Hero
        image={AppImages.bg2}
        title="Train tickets"
        subtitle="Pick a trip and pay from your wallet"
        onBack={() => navigation.goBack()}
      />
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 40,
          backgroundColor: c.bg,
        }}
      >
        <Label>Trip (sample routes and fares)</Label>
        {TRIPS.map((t) => (
          <OptionRow
            key={t.id}
            title={t.label}
            sub={t.detail}
            right={naira(t.price)}
            active={sel === t.id}
            onPress={() => setSel(t.id)}
          />
        ))}

        <Label>Quantity</Label>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Pressable
            onPress={() => setQty(Math.max(1, qty - 1))}
            style={stepBtn}
          >
            <Ionicons name="remove" size={22} color={c.text} />
          </Pressable>
          <Text
            style={{
              color: c.text,
              fontSize: 20,
              fontWeight: "800",
              width: 56,
              textAlign: "center",
            }}
          >
            {qty}
          </Text>
          <Pressable
            onPress={() => setQty(Math.min(10, qty + 1))}
            style={stepBtn}
          >
            <Ionicons name="add" size={22} color={c.text} />
          </Pressable>
        </View>

        <Card style={{ marginBottom: 18 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <Text style={{ color: c.sub }}>Ticket price</Text>
            <Text style={{ color: c.text, fontWeight: "700" }}>
              {trip ? naira(trip.price) : "N/A"}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ color: c.sub }}>Total amount</Text>
            <Text style={{ color: c.text, fontWeight: "800", fontSize: 18 }}>
              {trip ? naira(total) : "N/A"}
            </Text>
          </View>
        </Card>
        <Button title="Continue to payment" onPress={go} />
      </ScrollView>
    </View>
  );
}
