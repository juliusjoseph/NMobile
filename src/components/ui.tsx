import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
  StyleProp,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../theme";
import AppImages from "../images";
import { NETWORKS } from "../catalog";
import { Tx } from "../store";
import { naira, when } from "../format";

export function Screen({
  children,
  pad = true,
  bottom = true,
  style,
}: {
  children: React.ReactNode;
  pad?: boolean;
  bottom?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const { c } = useTheme();
  const i = useSafeAreaInsets();
  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: c.bg,
          paddingTop: i.top,
          paddingBottom: bottom ? i.bottom : 0,
          paddingHorizontal: pad ? 20 : 0,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function Button({
  title,
  onPress,
  disabled,
  variant = "solid",
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: "solid" | "ghost";
}) {
  const { c } = useTheme();
  if (variant === "ghost") {
    return (
      <Pressable
        onPress={onPress}
        style={{ paddingVertical: 14, alignItems: "center" }}
      >
        <Text style={{ color: c.sub, fontWeight: "600", fontSize: 15 }}>
          {title}
        </Text>
      </Pressable>
    );
  }
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => ({
        opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
      })}
    >
      <LinearGradient
        colors={[c.g1, c.g2]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ borderRadius: 14, paddingVertical: 16, alignItems: "center" }}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}>
          {title}
        </Text>
      </LinearGradient>
    </Pressable>
  );
}

type FieldProps = TextInputProps & {
  label: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightPress?: () => void;
};
export function Field({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightPress,
  ...p
}: FieldProps) {
  const { c } = useTheme();
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={{ color: c.sub, fontSize: 13, marginBottom: 6 }}>
        {label}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: c.surface,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: error ? c.danger : c.line,
          paddingHorizontal: 14,
          height: 52,
        }}
      >
        {leftIcon}
        <TextInput
          placeholderTextColor={c.sub}
          {...p}
          style={{
            flex: 1,
            color: c.text,
            fontSize: 15,
            marginLeft: leftIcon ? 10 : 0,
          }}
        />
        {rightIcon ? (
          <Pressable onPress={onRightPress} hitSlop={8}>
            {rightIcon}
          </Pressable>
        ) : null}
      </View>
      {error ? (
        <Text style={{ color: c.danger, fontSize: 12, marginTop: 4 }}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

export function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const { c } = useTheme();
  return (
    <View
      style={[
        {
          backgroundColor: c.surface,
          borderRadius: 18,
          padding: 16,
          borderWidth: 1,
          borderColor: c.line,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function Label({ children }: { children: React.ReactNode }) {
  const { c } = useTheme();
  return (
    <Text
      style={{
        color: c.text,
        fontSize: 15,
        fontWeight: "700",
        marginTop: 6,
        marginBottom: 10,
      }}
    >
      {children}
    </Text>
  );
}

export function Chip({
  label,
  active,
  onPress,
  dot,
  icon,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
  dot?: string;
  icon?: keyof typeof Ionicons.glyphMap;
}) {
  const { c } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 11,
        paddingHorizontal: 14,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: active ? c.primary : c.line,
        backgroundColor: active ? c.raised : c.surface,
        marginRight: 8,
        marginBottom: 8,
      }}
    >
      {dot ? (
        <View
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: dot,
            marginRight: 8,
          }}
        />
      ) : null}
      {icon ? (
        <Ionicons
          name={icon}
          size={16}
          color={active ? c.primary : c.sub}
          style={{ marginRight: 6 }}
        />
      ) : null}
      <Text style={{ color: active ? c.text : c.sub, fontWeight: "600" }}>
        {label}
      </Text>
    </Pressable>
  );
}

export function OptionRow({
  title,
  sub,
  right,
  active,
  onPress,
}: {
  title: string;
  sub?: string;
  right?: string;
  active: boolean;
  onPress: () => void;
}) {
  const { c } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: active ? c.raised : c.surface,
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: active ? c.primary : c.line,
        padding: 14,
        marginBottom: 10,
      }}
    >
      <Ionicons
        name={active ? "radio-button-on" : "radio-button-off"}
        size={22}
        color={active ? c.primary : c.sub}
      />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={{ color: c.text, fontWeight: "700", fontSize: 15 }}>
          {title}
        </Text>
        {sub ? (
          <Text style={{ color: c.sub, fontSize: 12, marginTop: 2 }}>
            {sub}
          </Text>
        ) : null}
      </View>
      {right ? (
        <Text style={{ color: c.text, fontWeight: "700" }}>{right}</Text>
      ) : null}
    </Pressable>
  );
}

export function NetworkPicker({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const { c } = useTheme();
  return (
    <View style={{ marginBottom: 8 }}>
      <Label>Network provider</Label>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {NETWORKS.map((n) => (
          <Chip
            key={n.id}
            label={n.id}
            dot={n.color}
            active={value === n.id}
            onPress={() => onChange(n.id)}
          />
        ))}
      </View>
      {error ? (
        <Text style={{ color: c.danger, fontSize: 12 }}>{error}</Text>
      ) : null}
    </View>
  );
}

export function BackBtn({ onPress }: { onPress: () => void }) {
  const { c } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      style={{
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: c.raised,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ionicons name="chevron-back" size={22} color={c.text} />
    </Pressable>
  );
}

export function Header({
  title,
  onBack,
}: {
  title: string;
  onBack?: () => void;
}) {
  const { c } = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
      }}
    >
      {onBack ? <BackBtn onPress={onBack} /> : null}
      <Text
        style={{
          color: c.text,
          fontSize: 22,
          fontWeight: "800",
          marginLeft: onBack ? 14 : 0,
        }}
      >
        {title}
      </Text>
    </View>
  );
}

export function BrandMark({ size = 30 }: { size?: number }) {
  const { c } = useTheme();
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image
        source={AppImages.mob}
        style={{ width: size, height: size, borderRadius: size / 2 }}
      />
      <Text
        style={{
          color: c.primary,
          fontSize: size * 0.8,
          fontWeight: "300",
          marginLeft: 6,
          letterSpacing: 1,
        }}
      >
        MOBILE
      </Text>
    </View>
  );
}

// Photo header for the service screens.
export function Hero({
  image,
  title,
  subtitle,
  onBack,
}: {
  image: number;
  title: string;
  subtitle?: string;
  onBack: () => void;
}) {
  const i = useSafeAreaInsets();
  return (
    <View style={{ height: 180 + i.top }}>
      <Image
        source={image}
        resizeMode="cover"
        style={{ width: "100%", height: 200 + i.top }}
      />
      <LinearGradient
        colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0.15)", "rgba(0,0,0,0.75)"]}
        style={{ width: "100%", height: 180 + i.top }}
      />
      <View style={{ position: "absolute", top: i.top + 10, left: 20 }}>
        <Pressable
          onPress={onBack}
          hitSlop={8}
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            backgroundColor: "rgba(255,255,255,0.25)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="chevron-back" size={22} color="#fff" />
        </Pressable>
      </View>
      <View style={{ position: "absolute", left: 20, right: 20, bottom: 16 }}>
        <Text style={{ color: "#fff", fontSize: 28, fontWeight: "800" }}>
          {title}
        </Text>
        {subtitle ? (
          <Text
            style={{
              color: "rgba(255,255,255,0.9)",
              fontSize: 14,
              marginTop: 2,
            }}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const KIND_ICON: Record<string, keyof typeof Ionicons.glyphMap> = {
  Airtime: "call",
  Data: "cellular",
  Train: "train",
  Bills: "flash",
  Ncomms: "globe",
  Fund: "add-circle",
};

export function TxRow({ tx, onPress }: { tx: Tx; onPress?: () => void }) {
  const { c } = useTheme();
  const credit = tx.amount > 0;
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
      }}
    >
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
        <Ionicons
          name={KIND_ICON[tx.kind] ?? "receipt"}
          size={20}
          color={c.primary}
        />
      </View>
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={{ color: c.text, fontWeight: "700" }}>{tx.title}</Text>
        <Text style={{ color: c.sub, fontSize: 12, marginTop: 2 }}>
          {when(tx.date)}
        </Text>
      </View>
      <Text style={{ color: credit ? c.primary : c.text, fontWeight: "700" }}>
        {credit ? "+" : "-"}
        {naira(tx.amount)}
      </Text>
    </Pressable>
  );
}
