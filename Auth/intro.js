import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import nmob from "../assets/images/nmob.jpg";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Carousel, { PaginationLight } from "react-native-x-carousel";
import { useState, useEffect } from "react";
import cup from "../assets/images/cup.jpg";
import deck from "../assets/images/deck.jpg";
import cap from "../assets/images/cap.jpg";
import lop from "../assets/images/lop.jpg";
const { width } = Dimensions.get("window");

const DATA = [
  {
    // coverImageUri:
    //   "https://user-images.githubusercontent.com/6414178/73920321-2357b680-4900-11ea-89d5-2e8cbecec9f6.jpg",
    coverImage: cup,
    cornerLabelColor: "red",
    cornerLabelText: "WELCOME TO NMOBILE",
    cornerLabelText2: "NMobile is a digital financial services Company",
    cornerLabelText3: "that Specializes in mobile & other forms of E-payment",
  },
  {
    coverImage: deck,
    cornerLabelColor: "#0080ff",
    cornerLabelText: "WELCOME TO NMOBILE",
    cornerLabelText2: "NMobile is a member company of Taylorcomms Group",
    cornerLabelText3: "which has commercial services running in Nigeria",
  },
  {
    coverImage: cap,
    cornerLabelColor: "#2ECC40",
    cornerLabelText: "WELCOME TO NMOBILE",
    cornerLabelText2: "NMobile is a member company of Taylorcomms Group",
    cornerLabelText3: "which has commercial services running in Nigeria",
  },
  {
    coverImage: lop,
    cornerLabelColor: "#2ECC40",
    cornerLabelText: "WELCOME TO NMOBILE",
    cornerLabelText2: "fast - moving consumer goods company on the continent",
    cornerLabelText3: "located in Lagos, Nigria,nMobile was founded in 2014",
  },
];

const Intro = (props) => {
  useEffect(() => {
    setTimeout(() => props.navigation.navigate("login"), 13000);
  });
  const renderItem = (data) => (
    <View
      style={{ alignItems: "center", justifyContent: "center", width }}
      key={data.coverImage}
    >
      <View style={{ overflow: "hidden" }}>
        <Image
          source={data.coverImage}
          style={{ width: width * 1, height: width * 2.3 }}
        />
        <View
          style={{
            position: "absolute",
            bottom: "20%",
            // left: "18%",
            borderTopLeftRadius: 8,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "#5A5A5A",
              fontWeight: "bold",
              //   paddingLeft: 5,
              //   paddingRight: 5,
              paddingTop: 5,
              paddingBottom: 5,
            }}
          >
            {data.cornerLabelText}
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: "#5A5A5A",
              fontWeight: "bold",
              //   paddingLeft: 5,
              //   paddingRight: 5,
              paddingTop: 5,
              paddingBottom: 5,
            }}
          >
            {data.cornerLabelText2}
          </Text>

          <Text
            style={{
              fontSize: 13,
              color: "#5A5A5A",
              fontWeight: "bold",
              //   paddingLeft: 5,
              //   paddingRight: 5,
              paddingTop: 5,
              paddingBottom: 5,
            }}
          >
            {data.cornerLabelText3}
          </Text>
        </View>
      </View>
    </View>
  );
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <Image source={nmob} style={{ height: "100%", width: "100%" }} /> */}
        <Carousel
          pagination={PaginationLight}
          renderItem={renderItem}
          data={DATA}
          loop
          autoplay
          autoplayInterval={3000}
        />
      </View>
    </View>
  );
};
export default Intro;
