import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function BusinessListCard({ business }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push("/businessdetail/" + business.id)}
      style={{
        padding: 10,
        margin: 10,
        borderRadius: 15,
        backgroundColor: "#f7dda1",
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
      }}
    >
      <Image
        source={{ uri: business.imageUrl }}
        style={{ width: 120, height: 120, borderRadius: 15 }}
      />
      <View style={{ flex: 1, gap: 7 }}>
        <Text style={{ fontFamily: "kanit-bold", fontSize: 20 }}>
          {business.name}
        </Text>

        <Text
          style={{ fontFamily: "kanit-medium", color: "grey", fontSize: 15 }}
        >
          {business.address}
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Image
            source={require("../../assets/images/star1.png")}
            style={{ width: 20, height: 20, marginTop: 5 }}
          />
          <Text
            style={{ fontFamily: "kanit-medium", fontSize: 17, marginTop: 3 }}
          >
            4.3
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
