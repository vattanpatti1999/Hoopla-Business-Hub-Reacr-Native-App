import { View, Text, Image } from "react-native";

import React from "react";
import UserInfo from "../../components/Profile/UserInfo";
import MenuList from "../../components/Profile/MenuList";

export default function profile() {
 
  return (
    <View style={{ padding: 20, paddingTop: 40 }}>
      <Text style={{ fontFamily: "kanit-bold", fontSize: 30 }}>Profile</Text>

      <UserInfo />
      <MenuList/>
    </View>
  );
}
