import React, { useRef, useState } from "react";
import { FlatList, Image, Text, View, useWindowDimensions } from "react-native";
import { Screen, Button, BrandMark } from "../components/ui";
import { useTheme } from "../theme";
import { useStore } from "../store";
import AppImages from "../images";

const PAGES = [
  {
    image: AppImages.nmob,
    title: "Welcome to NMobile",
    text: "A digital financial services company that specializes in mobile and other forms of e-payment.",
  },
  {
    image: AppImages.cap,
    title: "Stay online, stay connected",
    text: "Wifi and broadband services from a member company of Taylorcomms Group.",
  },
  {
    image: AppImages.lop,
    title: "Easy payments",
    text: "Pay for train trips, bills, airtime and data from one wallet.",
  },
  {
    image: AppImages.cup,
    title: "Save on airtime",
    text: "Top up any network in seconds with your NMoney wallet.",
  },
];

export default function Intro() {
  const { c } = useTheme();
  const { finishIntro } = useStore();
  const { width } = useWindowDimensions();
  const ref = useRef<FlatList>(null);
  const [i, setI] = useState(0);
  const last = i === PAGES.length - 1;

  return (
    <Screen pad={false}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          height: 52,
        }}
      >
        <BrandMark />
        {!last && <Button variant="ghost" title="Skip" onPress={finishIntro} />}
      </View>
      <FlatList
        ref={ref}
        data={PAGES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(p) => p.title}
        onMomentumScrollEnd={(e) =>
          setI(Math.round(e.nativeEvent.contentOffset.x / width))
        }
        renderItem={({ item }) => (
          <View style={{ width, paddingHorizontal: 20, paddingTop: 36 }}>
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 22,
                overflow: "hidden",
                borderWidth: 1,
                borderColor: c.line,
              }}
            >
              <Image
                source={item.image}
                resizeMode="contain"
                style={{ width: "100%", height: 300 }}
              />
            </View>
            <Text
              style={{
                color: c.text,
                fontSize: 28,
                fontWeight: "800",
                marginTop: 32,
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                color: c.sub,
                fontSize: 16,
                lineHeight: 24,
                marginTop: 10,
              }}
            >
              {item.text}
            </Text>
          </View>
        )}
      />
      <View style={{ paddingHorizontal: 20, paddingBottom: 12 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          {PAGES.map((_, n) => (
            <View
              key={n}
              style={{
                height: 8,
                width: n === i ? 24 : 8,
                borderRadius: 4,
                marginHorizontal: 4,
                backgroundColor: n === i ? c.primary : c.line,
              }}
            />
          ))}
        </View>
        <Button
          title={last ? "Get started" : "Next"}
          onPress={() =>
            last ? finishIntro() : ref.current?.scrollToIndex({ index: i + 1 })
          }
        />
      </View>
    </Screen>
  );
}
