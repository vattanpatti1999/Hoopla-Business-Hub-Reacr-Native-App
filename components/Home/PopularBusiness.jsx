import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";

import { Colors } from "../../constants/Colors";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../../configs/FireBaseConfig";
import PopularBusinessCard from "./PopularBusinessCard";

export default function PopularBusiness() {
  const [businessList, setBusinessList] = useState([]);
  useEffect(() => {
    GetBusinessList();
  }, []);
  const GetBusinessList = async () => {
    setBusinessList([]);
    const q = query(collection(db, "BusinessList"), limit(10));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setBusinessList((prev) => [...prev, { id: doc?.id, ...doc.data() }]);
    });
  };

  return (
    <View>
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          paddingLeft: -5,
          padding: 15,
        }}
      >
        <Text
          style={{
            paddingLeft: 20,
            marginTop: 10,
            fontSize: 20,
            fontFamily: "kanit-semibold",
            display: "flex",
          }}
        >
          Popular Business
        </Text>
        <Text
          style={{
            fontFamily: "kanit-medium",
            marginTop: 12,
            color: Colors.PRIMARY,
          }}
        >
          View All
        </Text>
      </View>
      <FlatList
        data={businessList}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={({ item, index }) => (
          <PopularBusinessCard business={item} key={index} />
        )}
      />
    </View>
  );
}
