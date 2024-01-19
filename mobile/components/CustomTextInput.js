import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";

const CustomTextInput = ({ placeholder, setState }) => {
  return (
    <>
      <View style={styles.input}>
        <MaterialIcons
          name="drive-file-rename-outline"
          size={24}
          color="black"
        />
        <TextInput
          placeholder={`${placeholder}`}
          onChangeText={(inputtext) => setState(inputtext)}
          style={styles.textinput}
        />
      </View>
    </>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: "8%",

    paddingLeft: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    flexDirection: "row",

    alignItems: "center",
    marginBottom: "10%",
  },
  textinput: {
    height: "100%",
    width: "90%",
    marginLeft: 5,
  },
  inputsContainer: {
    width: "100%",
    height: "33%",
    //backgroundColor: "red",
    justifyContent: "space-around",
    //marginTop: 20,
  },
});
