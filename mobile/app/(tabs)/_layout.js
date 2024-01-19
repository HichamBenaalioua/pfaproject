import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="demande"
        options={{
          title: "Formulaire de Demande",
          tabBarIcon: () => <AntDesign name="form" size={24} color="black" />,
        }}
      ></Tabs.Screen>

      <Tabs.Screen
        name="Mesdemandes"
        options={{
          title: "Mes Demandes",
          tabBarIcon: () => (
            <FontAwesome5 name="list-alt" size={24} color="black" />
          ),
        }}
      ></Tabs.Screen>
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({});
