import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { COLORS } from "../constants";
const _layout = () => {
  const [fontsLoaded] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="register"
        options={{
          title: "Créez votre compte",
          headerStyle: {
            backgroundColor: COLORS.lightgreen,
          },
          headerTitleStyle: {
            fontFamily: "DMBold",
          },
          headerTintColor: "black",
        }}
      ></Stack.Screen>
    </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({});
