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
import star from "../assets/images/star.jpg";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Foundation from "react-native-vector-icons/Foundation";
import { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import cap from "../assets/images/cap.jpg";
import Banner from "../assets/images/Banner.jpg";
const Profile = (props) => {
  const [active, setActive] = useState("yes");
  const keyboardVerticalOffset = Platform.OS === "ios" ? 150 : 0;
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      {active == "yes" ? (
        <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
          <View
            style={{
              height: "25%",
              width: "100%",
              marginTop: "15%",
            }}
          >
            <Image source={Banner} style={{ height: "100%", width: "100%" }} />
          </View>
          <View style={{ flexDirection: "row", marginLeft: "5%" }}>
            <View
              style={{
                height: 150,
                width: 150,
                borderRadius: 150 / 2,
                backgroundColor: "red",
                marginTop: "-20%",
              }}
            >
              <Image
                source={star}
                resizeMode="contain"
                style={{ height: 150, width: 150, borderRadius: 150 / 2 }}
              />
            </View>
            <View
              style={{
                height: "30%",
                width: "50%",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "3%",
              }}
            >
              <Text style={{ fontSize: 20, color: "green", fontWeight: "700" }}>
                Profile
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              height: 40,
              width: 40,
              borderRadius: 40 / 2,
              backgroundColor: "#20a201",
              marginTop: "-31%",
              marginLeft: "34%",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => setActive("no")}
          >
            <View style={{ marginLeft: 5 }}>
              <FontAwesome5 name="user-edit" size={20} color={"#FFFFFF"} />
            </View>
          </TouchableOpacity>

          <View
            style={{
              alignItems: "center",
              marginTop: "10%",
              flexDirection: "row",
            }}
          >
            <View style={{ marginLeft: 25, zIndex: 10 }}>
              <FontAwesome name="user" color={"#20a201"} size={20} />
            </View>
            <TextInput
              style={{
                width: "90%",
                height: 50,
                borderColor: "#E5E5E5",
                borderWidth: 1,
                borderRadius: 5,
                marginLeft: -25,
                paddingLeft: 35,
              }}
              placeholder="Remi Frank"
              placeholderTextColor={"black"}
              editable={false}
            ></TextInput>
          </View>

          <View
            style={{
              alignItems: "center",
              marginTop: "10%",
              flexDirection: "row",
            }}
          >
            <View style={{ marginLeft: 25, zIndex: 10 }}>
              <Foundation name="mail" size={20} color={"#20a201"} />
            </View>
            <TextInput
              style={{
                width: "90%",
                height: 50,
                borderColor: "#E5E5E5",
                borderWidth: 1,
                borderRadius: 5,
                marginLeft: -25,
                paddingLeft: 35,
              }}
              placeholder="remifrank49@gmail.com"
              placeholderTextColor={"black"}
              editable={false}
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
            <Text style={{ color: "#FFFFFF", fontSize: 15 }}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
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

                marginTop: "8%",
              }}
            >
              <TouchableOpacity
                style={{
                  height: "100%",
                  width: "15%",

                  justifyContent: "center",
                }}
                onPress={() => setActive("yes")}
              >
                <Ionicons name="arrow-back" color={"#20a201"} size={25} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: "26%",
                width: "100%",
                marginTop: "2%",
              }}
            >
              <Image source={cap} style={{ height: "100%", width: "100%" }} />
            </View>
            <View style={{ flexDirection: "row", marginLeft: "5%" }}>
              <View
                style={{
                  height: 150,
                  width: 150,
                  borderRadius: 150 / 2,
                  backgroundColor: "red",
                  marginTop: "-20%",
                }}
              >
                <Image
                  source={star}
                  resizeMode="contain"
                  style={{ height: 150, width: 150, borderRadius: 150 / 2 }}
                />
              </View>
              <View
                style={{
                  height: "30%",
                  width: "50%",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "3%",
                }}
              >
                <Text
                  style={{ fontSize: 20, color: "green", fontWeight: "700" }}
                >
                  Edit Profile
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                height: 40,
                width: 40,
                borderRadius: 40 / 2,
                backgroundColor: "#20a201",
                marginTop: "-28%",
                marginLeft: "35%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View>
                <FontAwesome5 name="camera" size={20} color={"#FFFFFF"} />
              </View>
            </TouchableOpacity>

            <View style={{ marginTop: "10%", marginLeft: "5%" }}>
              <Text>First Name</Text>
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
                placeholder="Remi"
                placeholderTextColor={"black"}
                editable={true}
              ></TextInput>
            </View>

            <View style={{ marginTop: "5%", marginLeft: "5%" }}>
              <Text>Last Name</Text>
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
                placeholder="Frank"
                placeholderTextColor={"black"}
                editable={true}
              ></TextInput>
            </View>

            <View style={{ marginTop: "5%", marginLeft: "5%" }}>
              <Text>Email Address</Text>
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
                placeholder="remifrank49@gmail.com"
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
              <Text style={{ color: "#FFFFFF", fontSize: 15 }}>Save</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      )}
    </View>
  );
};
export default Profile;
