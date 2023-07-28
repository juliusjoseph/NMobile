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
import lop from "../assets/images/lop.jpg";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import bg5 from "../assets/images/bg5.jpg";
import not from "../assets/images/not.jpg";
import bg4 from "../assets/images/bg4.jpg";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Carousel, { PaginationLight } from "react-native-x-carousel";
import Banner from "../assets/images/Banner.jpg";
import cup from "../assets/images/cup.jpg";
import deck from "../assets/images/deck.jpg";
const { width } = Dimensions.get("window");

const DATA = [
  {
    // coverImageUri:
    //   "https://user-images.githubusercontent.com/6414178/73920321-2357b680-4900-11ea-89d5-2e8cbecec9f6.jpg",
    coverImage: cup,
    cornerLabelColor: "red",
    cornerLabelText: "GOTY",
  },
  {
    // coverImageUri:
    //   "https://user-images.githubusercontent.com/6414178/73920358-336f9600-4900-11ea-8eec-cc919b991e90.jpg",
    coverImage: deck,
    cornerLabelColor: "#0080ff",
    cornerLabelText: "NEW",
  },
  {
    // coverImageUri:
    //   "https://user-images.githubusercontent.com/6414178/73927874-25744200-490d-11ea-940f-db3e5dbd8b2b.jpg",
    coverImage: not,
    cornerLabelColor: "#2ECC40",
    cornerLabelText: "-75%",
  },
  {
    // coverImageUri:
    //   "https://user-images.githubusercontent.com/6414178/73920399-45e9cf80-4900-11ea-9d5b-743fe5e8b9a4.jpg",
    coverImage: lop,
    cornerLabelColor: "#2ECC40",
    cornerLabelText: "-20%",
  },
];

const Home = (props) => {
  const renderItem = (data) => (
    <View
      style={{ alignItems: "center", justifyContent: "center", width }}
      key={data.coverImage}
    >
      <View style={{ borderRadius: 8, overflow: "hidden" }}>
        <Image
          source={data.coverImage}
          style={{ width: width * 0.9, height: width * 0.5 }}
        />
      </View>
    </View>
  );
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",

          marginTop: "15%",
        }}
      >
        {/* <Image source={lop} style={{ height: "100%", width: "100%" }} /> */}
        <Carousel
          pagination={PaginationLight}
          renderItem={renderItem}
          data={DATA}
          loop
          autoplay
          autoplayInterval={4000}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "90%",
          height: "15%",
          marginLeft: "5%",
          marginTop: "5%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#E6E6E6",
            height: "90%",
            width: "45%",
            borderRadius: 5,
            elevation: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => props.navigation.navigate("ncomms")}
        >
          <FontAwesome5 name="satellite-dish" color={"#20a201"} size={25} />

          <Text>Ncomms</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#E6E6E6",
            height: "90%",
            width: "45%",
            borderRadius: 5,
            elevation: 10,
            marginLeft: "5%",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => props.navigation.navigate("airtime")}
        >
          <FontAwesome name="mobile-phone" color={"#20a201"} size={35} />
          <Text>Airtime</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          width: "90%",
          height: "15%",
          marginLeft: "5%",
          marginTop: "5%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#E6E6E6",
            height: "90%",
            width: "45%",
            borderRadius: 5,
            elevation: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FontAwesome name="train" color={"#20a201"} size={25} />
          <Text>Train</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#E6E6E6",
            height: "90%",
            width: "45%",
            borderRadius: 5,
            elevation: 10,
            marginLeft: "5%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Entypo name="wallet" color={"#20a201"} size={25} />
          <Text>NMoney</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          width: "90%",
          height: "15%",
          marginLeft: "5%",
          marginTop: "5%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#E6E6E6",
            height: "90%",
            width: "45%",
            borderRadius: 5,
            elevation: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => props.navigation.navigate("bills")}
        >
          <Entypo name="credit-card" color={"#20a201"} size={25} />
          <Text>Bills</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#E6E6E6",
            height: "90%",
            width: "45%",
            borderRadius: 5,
            elevation: 10,
            marginLeft: "5%",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => props.navigation.navigate("Data")}
        >
          <MaterialCommunityIcons
            name="wifi-arrow-up-down"
            color={"#20a201"}
            size={25}
          />
          <Text>Data</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Home;
