import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Rating } from "react-native-ratings";
import { Colors } from "../../constants/Colors";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../configs/FireBaseConfig";
import { useUser } from "@clerk/clerk-expo";

export default function Reviews({ business }) {
  const [rating, setRating] = useState(4);
  const [userInput, setuserInput] = useState();
  const { user } = useUser();
  const onSubmit = async () => {
    const docRef = doc(db, "BusinessList", business?.id);
    await updateDoc(docRef, {
      reviews: arrayUnion({
        rating: rating,
        comment: userInput,
        userName: user?.fullName,
        userImage: user?.imageUrl,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      }),
    });
    ToastAndroid.show("Comment Added Successfully !", ToastAndroid.BOTTOM);
  };
  return (
    <View style={{ padding: 20, backgroundColor: "#faeccb", padding: 20 }}>
      <Text
        style={{ fontFamily: "kanit-semibold", fontSize: 20, color: "black" }}
      >
        Reviews
      </Text>
      <View>
        <Rating
          type="custom"
          ratingBackgroundColor="#faeccb"
          ratingColor="#cc6313"
          imageSize={28}
          showRating={false}
          onFinishRating={(rating) => setRating(rating)}
          style={{
            paddingVertical: 10,
          }}
        />
        <TextInput
          placeholder="Write your review about this ..."
          numberOfLines={5}
          onChangeText={(value) => setuserInput(value)}
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            borderColor: "#cc6313",
            textAlignVertical: "top",
          }}
        />
        <TouchableOpacity
          disabled={!userInput}
          onPress={() => onSubmit()}
          style={{
            padding: 10,
            borderRadius: 6,
            backgroundColor: Colors.PRIMARY,
            marginTop: 10,
            width: "45%",
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "kanit-semibold",
              fontSize: 18,
              textAlign: "center",
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        {business?.reviews?.map((item, index) => (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              marginTop: 10,
              padding: 10,
              borderWidth: 1,
              borderColor: Colors.GREY,
              borderRadius: 15,
            }}
          >
            <Image
              source={{ uri: item.userImage }}
              style={{ width: 50, height: 50, borderRadius: 100 }}
            />
            <View style={{ display: "flex" }}>
              <Text style={{ fontFamily: "kanit-medium" }}>
                {item.userName}
              </Text>
              <Rating
                imageSize={20}
                ratingCount={item.rating}
                style={{ alignItems: "flex-start" }}
              />
              <Text style={{ fontFamily: "kanit-regular" }}>
                {item.comment}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
