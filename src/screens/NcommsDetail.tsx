import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Screen,
  Header,
  Card,
  OptionRow,
  Button,
  Label,
} from "../components/ui";
import { useTheme } from "../theme";
import { useCheckout } from "../useCheckout";
import { naira } from "../format";
import { NCOMMS, COVERAGE } from "../catalog";
import AppImages from "../images";
import { RootStackParamList } from "../types";

const IMAGES = {
  broadband: AppImages.broadband,
  wifi: AppImages.nmWifi,
  coverage: AppImages.nmNet,
};

export default function NcommsDetail({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "NcommsDetail">) {
  const { c } = useTheme();
  const checkout = useCheckout();
  const { kind } = route.params;
  const [sel, setSel] = useState("");
  const group = kind === "coverage" ? null : NCOMMS[kind];
  const plan = group?.plans.find((p) => p.id === sel);

  return (
    <Screen>
      <Header
        title={group ? group.title : "Network coverages"}
        onBack={() => navigation.goBack()}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 20,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: c.line,
            marginBottom: 20,
          }}
        >
          <Image
            source={IMAGES[kind]}
            resizeMode="contain"
            style={{ width: "100%", height: 135 }}
          />
        </View>
        {group ? (
          <>
            <Text style={{ color: c.sub, marginBottom: 14 }}>
              {group.blurb} Prices shown are sample data.
            </Text>
            <Label>Choose a plan</Label>
            {group.plans.map((p) => (
              <OptionRow
                key={p.id}
                title={p.label}
                sub={p.detail}
                right={naira(p.price)}
                active={sel === p.id}
                onPress={() => setSel(p.id)}
              />
            ))}
            <View style={{ marginTop: 8 }}>
              <Button
                title={
                  plan ? `Subscribe for ${naira(plan.price)}` : "Choose a plan"
                }
                disabled={!plan}
                onPress={() =>
                  plan &&
                  checkout(
                    "Ncomms",
                    `${group.title}: ${plan.label}`,
                    plan.detail,
                    plan.price,
                  )
                }
              />
            </View>
          </>
        ) : (
          <>
            <Label>Where we are live</Label>
            {COVERAGE.map((a) => (
              <Card
                key={a.area}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <Text style={{ color: c.text, fontWeight: "700" }}>
                  {a.area}
                </Text>
                <Text
                  style={{
                    color: a.live ? c.primary : c.sub,
                    fontWeight: "700",
                  }}
                >
                  {a.live ? "Available" : "Coming soon"}
                </Text>
              </Card>
            ))}
            <Text style={{ color: c.sub, fontSize: 12, marginTop: 6 }}>
              Sample coverage list for the demo.
            </Text>
            <View style={{ marginTop: 14 }}>
              <Button
                title="Report a network issue"
                onPress={() =>
                  Alert.alert("Thanks", "Your report was noted (demo).")
                }
              />
            </View>
          </>
        )}
      </ScrollView>
    </Screen>
  );
}
