import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../configs/FireBaseConfig";
import { useUser } from "@clerk/clerk-expo";

export default function Intro({ business }) {
  const router = useRouter();
  const { user } = useUser();
  const OnDelete = () => {
    Alert.alert(
      "Do you want to Delete?",
      "Do you really want to Delete your Business",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteBusiness();
          },
        },
      ]
    );
  };

  const deleteBusiness = async () => {
    console.log("Delete Business");
    await deleteDoc(doc(db, "BusinessList", business?.id));
    router.back();
    ToastAndroid.show("Your Business is Deleted!", ToastAndroid.LONG);
  };
  return (
    <View>
      <View
        style={{
          position: "absolute",
          zIndex: 10,
          display: "flex",
          flexDirection: "row",
          marginTop: 30,
          justifyContent: "space-between",
          width: "100%",
          padding: 20,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={40} color="#411d09" />
        </TouchableOpacity>

        <AntDesign
          name="hearto"
          size={30}
          color="white"
          style={{ marginTop: 4 }}
        />
      </View>
      <Image
        source={{ uri: business.imageUrl }}
        style={{ width: "100%", height: 340 }}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 20,
          marginTop: -24,
          backgroundColor: "#faeccb",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
      >
        <View
          style={{
            padding: 20,
            marginTop: -20,
            backgroundColor: "#faeccb",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          }}
        >
          <Text
            style={{ fontSize: 35, fontFamily: "kanit-bold", marginLeft: -20 }}
          >
            {business.name}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontFamily: "kanit-medium",
              marginLeft: -16,
            }}
          >
            {business.address}
          </Text>
        </View>
        <View style={{ backgroundColor: "#faeccb", marginTop: 10 }}>
          {user?.primaryEmailAddress?.emailAddress === business?.userEmail && (
            <TouchableOpacity onPress={OnDelete}>
              <MaterialIcons name="delete" size={30} color="#cc6313" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
