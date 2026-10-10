import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useStore } from "./store";
import { naira } from "./format";
import { RootStackParamList } from "./types";

// Confirm, pay from the wallet, then show the receipt.
export function useCheckout() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user, pay } = useStore();

  return (kind: string, title: string, detail: string, amount: number) => {
    Alert.alert("Confirm payment", `${title}\n${detail}\n\nYou will pay ${naira(amount)} from your wallet.`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Pay",
        onPress: () => {
          const r = pay(kind, title, detail, amount);
          if (r.ok && r.id) nav.replace("Receipt", { id: r.id });
          else
            Alert.alert("Not enough balance", `Your wallet has ${naira(user?.balance ?? 0)}. Add money first.`, [
              { text: "Not now", style: "cancel" },
              { text: "Fund wallet", onPress: () => nav.navigate("Tabs", { screen: "Wallet" }) },
            ]);
        },
      },
    ]);
  };
}
