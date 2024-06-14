import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  Share,
} from "react-native";
import React from "react";

export default function ActionButton({ business }) {
  const actionButtonMenu = [
    {
      id: 1,
      name: "Call",
      icon: require("./../../assets/images/call.png"),
      url: "tel:" + business?.contact,
    },
    {
      id: 2,
      name: "Website",
      icon: require("./../../assets/images/web.png"),
      url: business?.website,
    },
    {
      id: 3,
      name: "Location",
      icon: require("./../../assets/images/pin.png"),
      url:
        "https://www.google.com/maps/@8.4965311,77.0449321,14z?entry=ttu" +
        business?.address,
    },
    {
      id: 4,
      name: "Share",
      icon: require("./../../assets/images/share.png"),
      url: "tel:" + business?.contact,
    },
  ];

  const OnPressHandle = (item) => {
    if (item.name == "Share") {
      Share.share({
        message:
          business?.name +
          "\n Address" +
          business?.address +
          "\n Find more Details on the App !",
      });
      return;
    }
    Linking.openURL(item.url);
  };

  return (
    <View style={{ backgroundColor: "#faeccb", padding: 20 }}>
      <FlatList
        data={actionButtonMenu}
        numColumns={4}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item, index }) => (
          <TouchableOpacity key={index} onPress={() => OnPressHandle(item)}>
            <Image source={item.icon} style={{ width: 50, height: 50 }} />
            <Text
              style={{
                fontFamily: "kanit-regular",
                fontSize: 13,
                textAlign: "center",
                marginTop: 10,
              }}
            >
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
