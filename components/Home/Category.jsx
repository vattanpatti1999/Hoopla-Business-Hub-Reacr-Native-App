import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../configs/FireBaseConfig";
import CategoryItem from "./CategoryItem";
import { useRouter } from "expo-router";

export default function Category({ explore = false, onCategorySelect }) {
  const [categoryList, setCategoryList] = useState([]);
  const router = useRouter();
  useEffect(() => {
    GetCategoryList();
  }, []);
  const GetCategoryList = async () => {
    setCategoryList([]);
    const q = query(collection(db, "Category"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setCategoryList((prev) => [...prev, doc.data()]);
    });
  };

  const onCategoryPresshandler = (item) => {
    if (!explore) {
      router.push("/businesslist/" + item.name);
    } else {
      onCategorySelect(item.name);
    }
  };
  return (
    <View>
      {!explore && (
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
            Category
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
      )}
      <FlatList
        horizontal={true}
        style={{ marginLeft: 20 }}
        showsHorizontalScrollIndicator={false}
        data={categoryList}
        renderItem={({ item, index }) => (
          <CategoryItem
            category={item}
            key={index}
            onCategoryPress={(category) => {
              onCategoryPresshandler(item);
            }}
          />
        )}
      />
    </View>
  );
}
