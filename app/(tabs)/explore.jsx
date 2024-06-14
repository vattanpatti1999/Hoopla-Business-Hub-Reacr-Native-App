import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import Category from "../../components/Home/Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../configs/FireBaseConfig";
import ExploreBusinessList from "../../components/Explore/ExploreBusinessList";

export default function explore() {
  const [businessList, setBusinessList] = useState([]);
  const GetBusinessByCategory = async (category) => {
    setBusinessList([]);
    const q = query(
      collection(db, "BusinessList"),
      where("category", "==", category)
    );
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      console.log(doc.data());
      setBusinessList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
  };
  return (
    <View style={{ padding: 20, paddingTop: 40 }}>
      <Text style={{ fontFamily: "kanit-bold", fontSize: 30 }}>
        Explore More
      </Text>

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
          borderWidth: 2,
          borderColor: Colors.PRIMARY,
        }}
      >
        <AntDesign name="search1" size={24} color={Colors.PRIMARY} />
        <TextInput
          placeholder="Search..."
          style={{ fontFamily: "kanit-medium", fontSize: 17 }}
        />
      </View>
      <Category
        explore={true}
        onCategorySelect={(category) => GetBusinessByCategory(category)}
      />

      <ExploreBusinessList businessList={businessList} />
    </View>
  );
}
