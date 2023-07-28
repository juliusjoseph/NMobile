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
import nmob from "../assets/images/nmob.jpg";
import cap from "../assets/images/cap.jpg";
const Register = (props) => {
  const keyboardVerticalOffset = Platform.OS === "ios" ? 150 : 0;
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <View
          style={{
            height: "5%",
            width: "90%",
            marginLeft: "5%",
            justifyContent: "center",
            marginTop: "10%",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Register</Text>
        </View>
        <View
          style={{
            height: "25%",
            width: "120%",
            backgroundColor: "blue",

            marginTop: "5%",
          }}
        >
          <Image source={cap} style={{ height: "100%", width: "100%" }} />
        </View>
        <View
          style={{
            alignItems: "center",
            marginTop: "10%",
            flexDirection: "row",
            width: "90%",
            marginLeft: "5%",
            justifyContent: "center",
          }}
        >
          <TextInput
            style={{
              width: "48%",
              height: 43,
              borderColor: "#E5E5E5",
              borderWidth: 1,
              borderRadius: 5,
              paddingLeft: 10,
            }}
            placeholder="First Name"
            placeholderTextColor={"gray"}
          ></TextInput>
          <TextInput
            style={{
              width: "48%",
              height: 43,
              borderColor: "#E5E5E5",
              borderWidth: 1,
              borderRadius: 5,
              paddingLeft: 10,
              marginLeft: "5%",
            }}
            placeholder="Last Name"
            placeholderTextColor={"gray"}
          ></TextInput>
        </View>

        <View style={{ alignItems: "center", marginTop: "10%" }}>
          <TextInput
            style={{
              width: "90%",
              height: 43,
              borderColor: "#E5E5E5",
              borderWidth: 1,
              borderRadius: 5,
              paddingLeft: 10,
            }}
            placeholder="Email"
            placeholderTextColor={"gray"}
            secureTextEntry={true}
          ></TextInput>
        </View>

        <View
          style={{
            alignItems: "center",
            marginTop: "10%",
            flexDirection: "row",
            width: "90%",
            marginLeft: "5%",
            justifyContent: "center",
          }}
        >
          <TextInput
            style={{
              width: "48%",
              height: 43,
              borderColor: "#E5E5E5",
              borderWidth: 1,
              borderRadius: 5,
              paddingLeft: 10,
            }}
            placeholder="Password"
            placeholderTextColor={"gray"}
          ></TextInput>
          <TextInput
            style={{
              width: "48%",
              height: 43,
              borderColor: "#E5E5E5",
              borderWidth: 1,
              borderRadius: 5,
              paddingLeft: 10,
              marginLeft: "5%",
            }}
            placeholder="Comfirm password"
            placeholderTextColor={"gray"}
          ></TextInput>
        </View>

        <TouchableOpacity
          style={{
            height: "6%",
            width: "90%",
            marginLeft: "5%",
            backgroundColor: "green",
            borderRadius: 5,
            marginTop: "10%",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "3%",
          }}
          onPress={() => props.navigation.navigate("login")}
        >
          <Text style={{ color: "#FFFFFF", fontSize: 15 }}>Sign Up</Text>
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
            <Text>Already have an account?</Text>
          </View>
          <TouchableOpacity onPress={() => props.navigation.navigate("login")}>
            <Text style={{ color: "green" }}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
export default Register;
