import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "../../configs/FireBaseConfig";
import BusinessListCard from "../../components/BusinessList/BusinessListCard";
import { Colors } from "../../constants/Colors";

export default function BusinessListByCategory() {
  const navigation = useNavigation();
  const { category } = useLocalSearchParams();

  const [businessList, setBusinessList] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: category,
      headerTitleStyle: {
        fontFamily: "kanit-bold",
        fontSize: 25,
        color: "white",
      },
      headerStyle: {
        backgroundColor: Colors.PRIMARY,
      },
      headerTintColor: "#fff",
    });
    getBusinessList();
  }, []);

  const getBusinessList = async () => {
    setLoading(true);
    setBusinessList([]);
    const q = query(
      collection(db, "BusinessList"),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setBusinessList((prev) => [...prev, { id: doc?.id, ...doc.data() }]);
    });
    setLoading(false);
  };
  return (
    <View>
      {businessList?.length > 0 && loading == false ? (
        <FlatList
          data={businessList}
          onRefresh={getBusinessList}
          refreshing={loading}
          renderItem={({ item, index }) => (
            <BusinessListCard business={item} key={index} />
          )}
        />
      ) : loading ? (
        <ActivityIndicator
          style={{ marginTop: "60%" }}
          size={"large"}
          color={Colors.PRIMARY}
        />
      ) : (
        <Text
          style={{
            fontFamily: "kanit-bold",
            fontSize: 40,
            textAlign: "center",
            color: Colors.PRIMARY,
            marginTop: "50%",
          }}
        >
          No Business Found
        </Text>
      )}
    </View>
  );
}
