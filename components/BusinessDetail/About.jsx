import { View, Text } from "react-native";
import React from "react";

export default function About({ business }) {
  return (
    <View style={{ backgroundColor: "#faeccb", padding: 15 }}>
      <Text style={{ fontFamily: "kanit-semibold", fontSize: 25 }}>About</Text>
      <Text
        style={{
          fontFamily: "kanit-regular",
          lineHeight: 25,
          fontSize: 15,
          marginTop: 3,
        }}
      >
        {business?.about}
      </Text>
    </View>
  );
}
