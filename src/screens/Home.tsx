import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Screen, Card, BrandMark, TxRow } from "../components/ui";
import { useTheme } from "../theme";
import { useStore } from "../store";
import { naira } from "../format";
import { PROMOS } from "../images";
import { RootStackParamList } from "../types";

function Promo() {
  const { c } = useTheme();
  const { width } = useWindowDimensions();
  const ref = useRef<FlatList>(null);
  const idx = useRef(0);
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      idx.current = (idx.current + 1) % PROMOS.length;
      ref.current?.scrollToIndex({ index: idx.current });
      setI(idx.current);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <View>
      <FlatList
        ref={ref}
        data={PROMOS}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, n) => String(n)}
        getItemLayout={(_, n) => ({
          length: width,
          offset: width * n,
          index: n,
        })}
        onMomentumScrollEnd={(e) => {
          const n = Math.round(e.nativeEvent.contentOffset.x / width);
          idx.current = n;
          setI(n);
        }}
        renderItem={({ item }) => (
          <View style={{ width, paddingHorizontal: 20 }}>
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 20,
                overflow: "hidden",
                borderWidth: 1,
                borderColor: c.line,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={item}
                resizeMode="contain"
                style={{ width: "100%", height: 135 }}
              />
            </View>
          </View>
        )}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        {PROMOS.map((_, n) => (
          <View
            key={n}
            style={{
              height: 6,
              width: n === i ? 18 : 6,
              borderRadius: 3,
              marginHorizontal: 3,
              backgroundColor: n === i ? c.primary : c.line,
            }}
          />
        ))}
      </View>
    </View>
  );
}

export default function Home() {
  const { c } = useTheme();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user } = useStore();
  const ic = c.primary;
  const tiles = [
    {
      label: "NComms",
      sub: "Broadband and wifi",
      icon: <FontAwesome5 name="satellite-dish" size={20} color={ic} />,
      go: () => nav.navigate("Tabs", { screen: "Ncomms" }),
    },
    {
      label: "Airtime",
      sub: "Top up any network",
      icon: <FontAwesome name="mobile-phone" size={28} color={ic} />,
      go: () => nav.navigate("Airtime"),
    },
    {
      label: "Train",
      sub: "Buy trip tickets",
      icon: <FontAwesome name="train" size={20} color={ic} />,
      go: () => nav.navigate("Train"),
    },
    {
      label: "NMoney",
      sub: "Wallet and funding",
      icon: <Entypo name="wallet" size={22} color={ic} />,
      go: () => nav.navigate("Tabs", { screen: "Wallet" }),
    },
    {
      label: "Bills",
      sub: "Power, TV and more",
      icon: <Entypo name="credit-card" size={22} color={ic} />,
      go: () => nav.navigate("Bills"),
    },
    {
      label: "Data",
      sub: "Bundles, any network",
      icon: (
        <MaterialCommunityIcons
          name="wifi-arrow-up-down"
          size={22}
          color={ic}
        />
      ),
      go: () => nav.navigate("Data"),
    },
  ];
  const recent = (user?.tx ?? []).slice(0, 3);

  return (
    <Screen pad={false} bottom={false}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 8,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <BrandMark />
          <Pressable
            onPress={() => nav.navigate("Tabs", { screen: "Wallet" })}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: c.raised,
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 20,
            }}
          >
            <Entypo name="wallet" size={16} color={c.primary} />
            <Text style={{ color: c.text, fontWeight: "700", marginLeft: 6 }}>
              {naira(user?.balance ?? 0)}
            </Text>
          </Pressable>
        </View>
        <Text
          style={{
            color: c.sub,
            fontSize: 15,
            paddingHorizontal: 20,
            marginTop: 18,
          }}
        >
          Hello, {user?.first}
        </Text>
        <Text
          style={{
            color: c.text,
            fontSize: 26,
            fontWeight: "800",
            paddingHorizontal: 20,
            marginTop: 2,
            marginBottom: 16,
          }}
        >
          What would you like to do?
        </Text>
        <Promo />
        <View
          style={{
            paddingHorizontal: 20,
            marginTop: 22,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {tiles.map((t) => (
            <Pressable
              key={t.label}
              onPress={t.go}
              style={{ width: "48%", marginBottom: 12 }}
            >
              <Card style={{ minHeight: 112 }}>
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 14,
                    backgroundColor: c.raised,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {t.icon}
                </View>
                <Text
                  style={{
                    color: c.text,
                    fontSize: 16,
                    fontWeight: "700",
                    marginTop: 10,
                  }}
                >
                  {t.label}
                </Text>
                <Text style={{ color: c.sub, fontSize: 12, marginTop: 2 }}>
                  {t.sub}
                </Text>
              </Card>
            </Pressable>
          ))}
        </View>
        {recent.length > 0 && (
          <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 6,
              }}
            >
              <Text style={{ color: c.text, fontSize: 18, fontWeight: "700" }}>
                Recent activity
              </Text>
              <Pressable
                onPress={() => nav.navigate("Tabs", { screen: "History" })}
              >
                <Text style={{ color: c.primary, fontWeight: "700" }}>
                  See all
                </Text>
              </Pressable>
            </View>
            <Card style={{ paddingVertical: 4 }}>
              {recent.map((t) => (
                <TxRow
                  key={t.id}
                  tx={t}
                  onPress={() => nav.navigate("Receipt", { id: t.id })}
                />
              ))}
            </Card>
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}
