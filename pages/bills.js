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
import { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
const Bills = (props) => {
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
            <Ionicons name="arrow-back" color={"#20a201"} size={30} />
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
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Bills</Text>
      </View>

      <View style={{ marginTop: "10%", marginLeft: "5%" }}>
        <Text>Trip</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <TextInput
          style={{
            width: "90%",
            height: 50,
            borderColor: "#E5E5E5",
            borderWidth: 1,
            borderRadius: 5,
            paddingLeft: 10,
          }}
          placeholder="Please select a trip"
          placeholderTextColor={"#E4E4E4"}
          editable={true}
        ></TextInput>
      </View>

      <View style={{ marginTop: "5%", marginLeft: "5%" }}>
        <Text>Quantity</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <TextInput
          style={{
            width: "90%",
            height: 50,
            borderColor: "#E5E5E5",
            borderWidth: 1,
            borderRadius: 5,
            paddingLeft: 10,
          }}
          placeholder="Please select a trip"
          placeholderTextColor={"#E4E4E4"}
          editable={true}
        ></TextInput>
      </View>

      <View style={{ marginTop: "5%", marginLeft: "5%" }}>
        <Text>Ticket Price</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <TextInput
          style={{
            width: "90%",
            height: 50,
            borderColor: "#E5E5E5",
            borderWidth: 1,
            borderRadius: 5,
            paddingLeft: 10,
          }}
          placeholder="N/A"
          placeholderTextColor={"black"}
          editable={true}
        ></TextInput>
      </View>

      <View style={{ marginTop: "5%", marginLeft: "5%" }}>
        <Text>Total Amount</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <TextInput
          style={{
            width: "90%",
            height: 50,
            borderColor: "#E5E5E5",
            borderWidth: 1,
            borderRadius: 5,
            paddingLeft: 10,
          }}
          placeholder="N/A"
          placeholderTextColor={"black"}
          editable={true}
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
        <Text style={{ color: "#FFFFFF", fontSize: 15 }}>
          Continue to payment
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Bills;
