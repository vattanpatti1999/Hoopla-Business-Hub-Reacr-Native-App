import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function PopularBusinessCard({ business }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        router.push("/businessdetail/" + business?.id);
      }}
      style={{
        marginLeft: 20,
        padding: 10,
        backgroundColor: "#f7dda1",
        borderRadius: 17,
        marginTop: 5,
      }}
    >
      <Image
        source={{ uri: business?.imageUrl }}
        style={{ width: 200, height: 140, borderRadius: 15 }}
      />
      <View>
        <Text
          style={{ fontFamily: "kanit-medium", marginLeft: 3, fontSize: 17 }}
        >
          {business.name}
        </Text>
        <Text
          style={{
            fontFamily: "kanit-medium",
            marginLeft: 3,
            fontSize: 10,
            color: "grey",
          }}
        >
          {business.address}
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
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
              style={{ width: 20, height: 20, marginLeft: 3, marginTop: 5 }}
            />
            <Text
              style={{ fontFamily: "kanit-medium", fontSize: 17, marginTop: 3 }}
            >
              4.3
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "kanit-bold",
              marginTop: 3,
              backgroundColor: "#e6851a",
              borderRadius: 8,
              padding: 4,
            }}
          >
            {business.category}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
