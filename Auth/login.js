import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import clak from "../assets/images/clak.jpg";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useState } from "react";

const Login = (props) => {
  const [hide, setHide] = useState(true);
  const keyboardVerticalOffset = Platform.OS === "ios" ? 150 : 0;
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <View
          style={{
            height: "7%",
            width: "90%",
            marginLeft: "5%",
            justifyContent: "center",
            marginTop: "10%",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Log in</Text>
        </View>
        <View
          style={{
            height: "25%",
            width: "120%",

            marginTop: "5%",
          }}
        >
          <Image source={clak} style={{ height: "100%", width: "100%" }} />
        </View>
        <View style={{ alignItems: "center", marginTop: "10%" }}>
          <TextInput
            style={{
              width: "90%",
              height: 50,
              borderColor: "#E5E5E5",
              borderWidth: 1,
              borderRadius: 5,
              paddingLeft: 10,
            }}
            placeholder="Email Address"
            placeholderTextColor={"gray"}
          ></TextInput>
        </View>

        <View
          style={{
            alignItems: "center",
            marginTop: "10%",
            flexDirection: "row",
          }}
        >
          <TextInput
            style={{
              width: "90%",
              height: 50,
              borderColor: "#E5E5E5",
              borderWidth: 1,
              borderRadius: 5,
              marginLeft: "5%",
              paddingLeft: 10,
            }}
            placeholder="PassWord"
            placeholderTextColor={"gray"}
            secureTextEntry={hide}
          ></TextInput>
          <TouchableOpacity
            style={{ marginLeft: -30 }}
            onPress={() => setHide(!hide)}
          >
            {hide ? (
              <FontAwesome5 name="eye-slash" size={18} color={"black"} />
            ) : (
              <FontAwesome5 name="eye" size={18} color={"black"} />
            )}

            {/* <FontAwesome5 name="eye-slash" size={20} color={"black"} /> */}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ marginLeft: "50%", marginTop: "10%" }}
          onPress={() => props.navigation.navigate("password")}
        >
          <Text>Forgotten PassWord?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: "6%",
            width: "90%",
            marginLeft: "5%",
            backgroundColor: "#20a201",
            borderRadius: 5,
            marginTop: "10%",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "3%",
          }}
          onPress={() => props.navigation.navigate("buttomTab")}
        >
          <Text style={{ color: "#FFFFFF", fontSize: 15 }}>Log in</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            marginTop: "9%",
            width: "90%",
            marginLeft: "5%",
            justifyContent: "center",
          }}
        >
          <View>
            <Text>Don't have an account yet?</Text>
          </View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("register")}
          >
            <Text style={{ color: "#20a201" }}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;
