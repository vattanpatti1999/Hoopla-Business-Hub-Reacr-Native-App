import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { View, Text } from "react-native";
import LoginScreen from "./../components/LoginScreen";
import React from "react";
import * as SecureStore from "expo-secure-store";

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function RootLayout() {
  useFonts({
    "kanit-regular": require("./../assets/fonts/Kanit-Regular.ttf"),
    "kanit-medium": require("./../assets/fonts/Kanit-Medium.ttf"),
    "kanit-semibold": require("./../assets/fonts/Kanit-SemiBold.ttf"),
    "kanit-bold": require("./../assets/fonts/Kanit-Bold.ttf"),
  });
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <SignedIn>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </SignedIn>

      <SignedOut>
        <LoginScreen />
      </SignedOut>
    </ClerkProvider>
  );
}
