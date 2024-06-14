import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Share,
} from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function MenuList() {
  const { signOut } = useAuth();
  const menuList = [
    {
      id: 1,
      name: "Add Business",
      icon: require("./../../assets/images/add.png"),
      path: "/business/add-business",
    },
    {
      id: 2,
      name: "My Business",
      icon: require("./../../assets/images/business-and-trade.png"),
      path: "/business/my-business",
    },
    {
      id: 3,
      name: "Share",
      icon: require("./../../assets/images/share_1.png"),
      path: "share",
    },
    {
      id: 4,
      name: "LogOut",
      icon: require("./../../assets/images/logout.png"),
      path: "logout",
    },
  ];
  const router = useRouter();
  const onMenuClick = (item) => {
    if (item.path == "logout") {
      signOut();
      return;
    }
    if (item.path == "share") {
      Share.share({
        message: "Download the App By Nikhil S Nair",
      });
      return;
    }
    router.push(item.path);
  };
  return (
    <View style={{ marginTop: 60 }}>
      <FlatList
        data={menuList}
        numColumns={2}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onMenuClick(item)}
            style={{
              display: "flex",
              margin: 10,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 15,
              flex: 1,
              padding: 10,
              borderWidth: 1,
              borderRadius: 15,
              marginTop: 20,
              backgroundColor: "#fef3d6",
              borderColor: "#e37713",
            }}
          >
            <Image source={item.icon} style={{ width: 50, height: 50 }} />
            <Text style={{ fontFamily: "kanit-medium", fontSize: 18, flex: 1 }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
      <Text
        style={{
          fontFamily: "kanit-semibold",
          textAlign: "center",
          marginTop: 50,
          color: Colors.GREY,
        }}
      >
        Developed by Nikhil S Nair @2024
      </Text>
    </View>
  );
}
