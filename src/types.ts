import { NavigatorScreenParams } from "@react-navigation/native";

export type TabParamList = {
  Home: undefined;
  Ncomms: undefined;
  Wallet: undefined;
  History: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Intro: undefined;
  Auth: undefined;
  Forgot: undefined;
  Tabs: NavigatorScreenParams<TabParamList> | undefined;
  Airtime: undefined;
  Data: undefined;
  Train: undefined;
  Bills: undefined;
  NcommsDetail: { kind: "broadband" | "wifi" | "coverage" };
  Receipt: { id: string };
};
