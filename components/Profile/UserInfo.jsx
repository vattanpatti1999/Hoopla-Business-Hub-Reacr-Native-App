import { View, Text, Image } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Colors } from "../../constants/Colors";

export default function UserInfo() {
  const { user } = useUser();
  return (
    <View
      style={{
        dispaly: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
      }}
    >
      <Image
        source={{ uri: user?.imageUrl }}
        style={{ width: 110, height: 110, borderRadius: 100 }}
      />
      <Text
        style={{
          fontFamily: "kanit-bold",
          fontSize: 30,
          color: "#411d09",
        }}
      >
        {user?.fullName}
      </Text>
      <Text
        style={{
          fontFamily: "kanit-semibold",
          fontSize: 20,
          color: Colors.PRIMARY,
        }}
      >
        {user?.primaryEmailAddress?.emailAddress}
      </Text>
    </View>
  );
}
