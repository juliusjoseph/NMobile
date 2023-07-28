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
import nMob from "../assets/images/nMob.jpeg";
import { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import cup from "../assets/images/cup.jpg";
const Airtime = (props) => {
  const [see, setSee] = useState("");
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View
        style={{
          marginLeft: "5%",
          height: "5%",
          width: "90%",
          marginTop: "10%",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: "30%",

            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              height: "90%",
              width: "30%",

              justifyContent: "center",
            }}
            onPress={() => props.navigation.navigate("Home")}
          >
            <Ionicons name="arrow-back" color={"#20a201"} size={25} />
          </TouchableOpacity>
        </View>
        <View style={{ width: "70%", alignItems: "flex-end" }}>
          <Image source={nMob} style={{ height: "100%", width: "50%" }} />
        </View>
      </View>

      <View
        style={{
          width: "90%",
          marginLeft: "5%",
          justifyContent: "center",
          marginTop: "5%",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Airtime</Text>
      </View>

      <View
        style={{
          height: "20%",
          width: "100%",
          marginTop: "5%",
        }}
      >
        <Image source={cup} style={{ height: "100%", width: "100%" }} />
      </View>
      <View
        style={{
          width: "90%",
          marginLeft: "5%",
          justifyContent: "center",
          marginTop: "5%",
        }}
      >
        <Text style={{ fontSize: 15 }}>Select Network Provider</Text>
      </View>
      <View
        style={{
          width: "90%",
          height: "10%",
          marginLeft: "5%",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: "5%",
        }}
      >
        <TouchableOpacity
          style={{
            height: "100%",
            width: "23%",
            justifyContent: "center",
            alignItems: "center",
            borderColor: "#E5E5E5",
            borderWidth: 1,
            borderRadius: 5,
            backgroundColor: see == "Mtn" ? "green" : null,
          }}
          onPress={() => setSee("Mtn")}
        >
          <Text style={{ color: see == "Mtn" ? "#FFFFFF" : null }}>Mtn</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: "100%",
            width: "23%",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "3%",
            borderColor: "#E5E5E5",
            borderWidth: 1,
            borderRadius: 5,
            backgroundColor: see == "Airtel" ? "green" : null,
          }}
          onPress={() => setSee("Airtel")}
        >
          <Text style={{ color: see == "Airtel" ? "#FFFFFF" : null }}>
            Airtel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: "100%",
            width: "23%",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "3%",
            borderColor: "#E5E5E5",
            borderWidth: 1,
            borderRadius: 5,
            backgroundColor: see == "9Mobile" ? "green" : null,
          }}
          onPress={() => setSee("9Mobile")}
        >
          <Text style={{ color: see == "9Mobile" ? "#FFFFFF" : null }}>
            9 Mobile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: "100%",
            width: "23%",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "3%",
            borderColor: "#E5E5E5",
            borderWidth: 1,
            borderRadius: 5,
            backgroundColor: see == "Glo" ? "green" : null,
          }}
          onPress={() => setSee("Glo")}
        >
          <Text style={{ color: see == "Glo" ? "#FFFFFF" : null }}>Glo</Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center", marginTop: "5%" }}>
        <TextInput
          style={{
            width: "90%",
            height: 50,
            borderColor: "#E5E5E5",
            borderWidth: 1,
            borderRadius: 5,
            paddingLeft: 10,
          }}
          placeholder="Mobile number"
          placeholderTextColor={"gray"}
          keyboardType="numeric"
        ></TextInput>
      </View>

      <View style={{ alignItems: "center", marginTop: "5%" }}>
        <TextInput
          style={{
            width: "90%",
            height: 50,
            borderColor: "#E5E5E5",
            borderWidth: 1,
            borderRadius: 5,
            paddingLeft: 10,
          }}
          placeholder="Amount"
          placeholderTextColor={"gray"}
          secureTextEntry={true}
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
        }}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 15 }}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Airtime;
