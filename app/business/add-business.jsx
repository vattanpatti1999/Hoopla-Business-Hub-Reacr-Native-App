import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import { collection, getDocs, query, setDoc, doc } from "firebase/firestore";
import { db, storage } from "./../../configs/FireBaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";

export default function AddBusiness() {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const { user } = useUser();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [website, setWebsite] = useState("");
  const [about, setAbout] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Business",
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

    GetCategoryList();
  }, [navigation]);

  const onImagePick = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const GetCategoryList = async () => {
    try {
      setCategoryList([]);
      const q = query(collection(db, "Category"));
      const snapShot = await getDocs(q);
      snapShot.forEach((doc) => {
        setCategoryList((prev) => [
          ...prev,
          { label: doc.data().name, value: doc.data().name },
        ]);
      });
    } catch (error) {
      console.error("Error fetching category list:", error);
    }
  };

  const onAddNewBusiness = async () => {
    if (!image || !name || !address || !contact || !about || !category) {
      ToastAndroid.show("Please fill all fields", ToastAndroid.SHORT);
      return;
    }

    setLoading(true);

    try {
      const fileName = `${Date.now()}.jpg`;
      const resp = await fetch(image);
      const blob = await resp.blob();
      const imageRef = ref(storage, `business-image/${fileName}`);
      await uploadBytes(imageRef, blob);
      const downloadUrl = await getDownloadURL(imageRef);

      await saveBusinessDetail(downloadUrl);
      resetForm();
      ToastAndroid.show("New business added...", ToastAndroid.LONG);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveBusinessDetail = async (imageUrl) => {
    try {
      const businessData = {
        name,
        address,
        contact,
        about,
        website,
        category,
        username: user?.fullName,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userImage: user?.imageUrl,
        imageUrl,
      };

      await setDoc(doc(db, "BusinessList", `${Date.now()}`), businessData);
    } catch (error) {
      console.error("Error saving business details:", error);
    }
  };

  const resetForm = () => {
    setName("");
    setAddress("");
    setContact("");
    setWebsite("");
    setAbout("");
    setCategory("");
    setImage(null);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ padding: 20, alignItems: "center" }}>
        <Text style={{ fontFamily: "kanit-semibold", fontSize: 30 }}>
          Add Your Business Here!
        </Text>
        <Text style={{ fontFamily: "kanit-medium", color: Colors.GREY }}>
          Complete the details below to showcase your business and boost your
        </Text>
        <Text style={{ fontFamily: "kanit-medium", color: Colors.GREY }}>
          visibility!
        </Text>

        <TouchableOpacity style={{ marginTop: 10 }} onPress={onImagePick}>
          {!image ? (
            <Image
              source={require("../../assets/images/add-image.png")}
              style={{ width: 100, height: 100, marginTop: 10 }}
            />
          ) : (
            <Image
              source={{ uri: image }}
              style={{
                width: 100,
                height: 100,
                marginTop: 10,
                borderRadius: 15,
              }}
            />
          )}
        </TouchableOpacity>

        <View>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
            style={styles.input}
          />
          <TextInput
            placeholder="Contact"
            value={contact}
            onChangeText={setContact}
            style={styles.input}
          />
          <TextInput
            placeholder="Website"
            value={website}
            onChangeText={setWebsite}
            style={styles.input}
          />
          <TextInput
            placeholder="About"
            value={about}
            onChangeText={setAbout}
            multiline
            numberOfLines={5}
            style={[styles.input, { textAlignVertical: "top" }]}
          />

          <View style={styles.pickerContainer}>
            <RNPickerSelect
              onValueChange={setCategory}
              items={categoryList}
              placeholder={{
                label: "Select Your Category",
                value: null,
              }}
              style={pickerSelectStyles}
            />
          </View>
          <TouchableOpacity
            disabled={loading}
            onPress={onAddNewBusiness}
            style={styles.button}
          >
            {loading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <Text style={styles.buttonText}>Add New Business</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = {
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    width: 350,
    marginTop: 10,
    backgroundColor: "#fef3d6",
    borderColor: "#e37713",
    fontSize: 17,
    fontFamily: "kanit-semibold",
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 5,
    width: 350,
    marginTop: 10,
    backgroundColor: "#fef3d6",
    borderColor: "#e37713",
  },
  button: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: Colors.PRIMARY,
    marginTop: 25,
    width: 150,
    alignSelf: "center",
  },
  buttonText: {
    fontFamily: "kanit-semibold",
    fontSize: 18,
    textAlign: "center",
    color: "white",
  },
};

const pickerSelectStyles = {
  placeholder: {
    color: "#9EA0A4",
    fontFamily: "kanit-semibold",
  },
  inputAndroid: {
    color: "black",
    padding: 10,
    fontFamily: "kanit-semibold",
  },
};
