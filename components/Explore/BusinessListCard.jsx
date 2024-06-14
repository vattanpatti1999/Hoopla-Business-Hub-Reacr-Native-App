import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "./../../constants/Colors";
import { useRouter } from "expo-router";

export default function BusinessListCard({ business }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        router.push("/businessdetail/" + business?.id);
      }}
      style={{ marginTop: 15, backgroundColor: "#faeccb" }}
    >
      <Image
        source={{ uri: business?.imageUrl }}
        style={{
          width: "100%",
          height: 150,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
      />
      <View style={{ padding: 10 }}>
        <Text style={{ fontFamily: "kanit-semibold", fontSize: 23 }}>
          {business?.name}
        </Text>
        <Text
          style={{
            fontFamily: "kanit-medium",
            fontSize: 15,
            color: Colors.GREY,
          }}
        >
          {business?.address}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
