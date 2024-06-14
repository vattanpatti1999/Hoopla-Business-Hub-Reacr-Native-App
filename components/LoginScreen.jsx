import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";
import { TouchableOpacity } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "./../hooks/useWarmUpBrowser";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View>
      <View style={{ display: "flex", alignItems: "center", marginTop: 80 }}>
        <Image
          source={require("./../assets/images/login-1.jpg")}
          style={{
            width: 230,
            height: 510,
            borderRadius: 20,
            borderWidth: 3,
            borderColor: "#000",
          }}
        />
      </View>
      <View style={styles.subContainer}>
        <Text
          style={{
            fontSize: 35,
            fontFamily: "kanit-bold",
            textAlign: "center",
          }}
        >
          Your Ultimate
          <Text
            style={{ color: Colors.PRIMARY }}
          >{` Community Business Hub`}</Text>
          {` at Your Fingertips!"`}
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontFamily: "kanit-medium",
            textAlign: "center",
            marginVertical: 15,
            color: Colors.GREY,
          }}
        >
          Discover and connect with local businesses effortlessly using Your
          Ultimate Community Business Directory App!
        </Text>
        <TouchableOpacity style={styles.btn} onPress={onPress}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "kanit-semibold",
              textAlign: "center",
              color: "white",
            }}
          >
            Let's Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subContainer: { backgroundColor: "#fff", padding: 30, marginTop: -20 },
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: 18,
    borderRadius: 99,
    marginTop: 20,
  },
});
