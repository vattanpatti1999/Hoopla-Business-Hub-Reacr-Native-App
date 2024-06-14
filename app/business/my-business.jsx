import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { query, where, getDocs, collection } from "firebase/firestore";
import { db } from "../../configs/FireBaseConfig";
import BusinessListCard from "../../components/BusinessList/BusinessListCard";
import { useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";

export default function MyBusiness() {
  const { user } = useUser();
  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "My Business",
      headerShown: true,
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
    if (user) {
      GetUserBusiness();
    }
  }, [user]);

  const GetUserBusiness = async () => {
    try {
      setLoading(true);
      setBusinessList([]);
      const q = query(
        collection(db, "BusinessList"),
        where("userEmail", "==", user?.primaryEmailAddress?.emailAddress)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        setBusinessList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching business data: ", error);
    }
  };

  return (
    <View style={{ padding: 20, paddingTop: 40 }}>
      <Text style={{ fontFamily: "kanit-bold", fontSize: 30 }}>MyBusiness</Text>
      <FlatList
        data={businessList}
        onRefresh={GetUserBusiness}
        refreshing={loading}
        renderItem={({ item, index }) => (
          <BusinessListCard business={item} key={index} />
        )}
      />
    </View>
  );
}
