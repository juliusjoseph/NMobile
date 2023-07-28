import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import nmob from "../assets/images/nmob.jpg";
import Ionicons from "react-native-vector-icons/Ionicons";

const PassWord = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <TouchableOpacity
        style={{
          height: "3%",
          width: "15%",

          justifyContent: "center",
          alignItems: "center",
          marginTop: "10%",
        }}
        onPress={() => props.navigation.navigate("login")}
      >
        <Ionicons name="arrow-back" color={"#20a201"} size={25} />
      </TouchableOpacity>
      <View
        style={{
          height: "20%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10%",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Forget Password
        </Text>
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
          placeholder=" New PassWord"
          placeholderTextColor={"gray"}
          secureTextEntry={true}
        ></TextInput>
      </View>

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
        }}
        onPress={() => props.navigation.navigate("buttomTab")}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 15 }}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PassWord;
