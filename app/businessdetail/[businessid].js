import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../configs/FireBaseConfig";
import { Colors } from "../../constants/Colors";
import Intro from "../../components/BusinessDetail/Intro";
import ActionButton from "../../components/BusinessDetail/ActionButton";
import About from "../../components/BusinessDetail/About";
import Reviews from "../../components/BusinessDetail/Reviews";

export default function BusinessDetail() {
  const { businessid } = useLocalSearchParams();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const GetbusinessDetailById = async () => {
      try {
        const docRef = doc(db, "BusinessList", businessid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBusiness({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      } finally {
        setLoading(false);
      }
    };

    if (businessid) {
      GetbusinessDetailById();
    }
  }, [businessid]);

  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator size={"large"} color={Colors.PRIMARY} />
      ) : (
        <View>
          {business ? (
            <Intro business={business} />
          ) : (
            <Text>No business details available.</Text>
          )}
          <ActionButton business={business} />
          <About business={business} />
          <Reviews business={business} />
        </View>
      )}
    </ScrollView>
  );
}
