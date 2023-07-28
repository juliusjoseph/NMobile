import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import nMob from "../assets/images/nMob.jpeg";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";

const Ncomms2 = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View
        style={{
          height: "5%",
          width: "90%",
          marginLeft: "5%",
          marginTop: "10%",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: "30%",

            justifyContent: "center",
          }}
        ></View>
        <View style={{ width: "70%", alignItems: "flex-end" }}>
          <Image source={nMob} style={{ height: "100%", width: "50%" }} />
        </View>
      </View>

      <View style={{ marginLeft: "5%", marginTop: "5%" }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Ncomms Services
        </Text>
      </View>
      <TouchableOpacity
        style={{
          width: "90%",
          marginLeft: "5%",
          backgroundColor: "#E6E6E6",
          height: "20%",
          marginTop: "5%",
          borderRadius: 5,
          borderWidth: 2,
          borderColor: "gray",
          alignItems: "center",
          justifyContent: "center",
          elevation: 10,
        }}
      >
        <FontAwesome5 name="globe" color={"#20a201"} size={55} />
        <Text>Broadband Services</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          width: "90%",
          marginLeft: "5%",
          backgroundColor: "#E6E6E6",
          height: "20%",
          marginTop: "5%",
          borderRadius: 5,
          borderWidth: 2,
          borderColor: "gray",
          alignItems: "center",
          justifyContent: "center",
          elevation: 10,
        }}
      >
        <FontAwesome5 name="wifi" color={"#20a201"} size={55} />
        <Text>Wifi Services</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          width: "90%",
          marginLeft: "5%",
          backgroundColor: "#E6E6E6",
          height: "20%",
          marginTop: "5%",
          borderRadius: 5,
          borderWidth: 2,
          borderColor: "gray",
          alignItems: "center",
          justifyContent: "center",
          elevation: 10,
        }}
      >
        <FontAwesome5 name="wifi" color={"#20a201"} size={55} />
        <Text>Netwoork Coverages</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Ncomms2;
