import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Colors } from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";

export default function Header() {
  const { user } = useUser();
  return (
    <View
      style={{
        padding: 20,
        paddingTop: 50,
        backgroundColor: Colors.PRIMARY,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Image
          source={{ uri: user?.imageUrl }}
          style={{ width: 45, height: 45, borderRadius: 99 }}
        />
        <View>
          <Text style={{ color: "#fff" }}>Welcome,</Text>
          <Text
            style={{
              fontFamily: "kanit-semibold",
              fontSize: 19,
              color: "#fff",
            }}
          >
            {user?.fullName}
          </Text>
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          backgroundColor: "#fff",
          padding: 10,
          marginVertical: 10,
          marginTop: 15,
          borderRadius: 8,
        }}
      >
        <AntDesign name="search1" size={24} color={Colors.PRIMARY} />
        <TextInput
          placeholder="Search..."
          style={{ fontFamily: "kanit-medium", fontSize: 17 }}
        />
      </View>
    </View>
  );
}
