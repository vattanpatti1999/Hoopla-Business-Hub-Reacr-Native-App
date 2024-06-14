import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

export default function CategoryItem({ category, onCategoryPress }) {
  return (
    <TouchableOpacity onPress={() => onCategoryPress(category)}>
      <View
        style={{
          padding: 15,
          backgroundColor: "#faeccb",
          borderRadius: 50,
          marginRight: 15,
          marginTop: 10,
        }}
      >
        <Image
          source={{ uri: category.icon }}
          style={{ width: 50, height: 50 }}
        />
      </View>
      <Text
        style={{
          fontSize: 12,
          textAlign: "center",
          fontFamily: "kanit-medium",
          marginLeft: -15,
          marginTop: 5,
        }}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );
}
