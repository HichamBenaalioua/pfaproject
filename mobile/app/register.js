import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useMemo, useState } from "react";
import { COLORS, SIZES } from "../constants";
import { supabase } from "../lib/supabase";
import CustomTextInput from "../components/CustomTextInput";
import { ScrollView } from "react-native-gesture-handler";
import RadioGroup from "react-native-radio-buttons-group";
import SelectDropdown from "react-native-select-dropdown";
const register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [ville, setVille] = useState("");
  const countries = ["Agadir", "Marrakech", "Fes", "Casablanca"];
  const radioButtons = useMemo(
    () => [
      {
        id: "1", // acts as primary key, should be unique and non-empty string
        label: "Client",
        value: "client",
      },
      {
        id: "2",
        label: "Prestataire",
        value: "prestataire",
      },
    ],
    []
  );

  const [selectedId, setSelectedId] = useState();

  const handleregister = async () => {
    /*const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nom: nom,
        },
      },
    });

    if (error) {
      console.error("Error registering:", error.message);
    } else {
      console.log("Registration successful");
    }*/
    console.log(nom);
    console.log(selectedId);
    console.log(ville);
  };
  return (
    <View style={styles.container}>
      <View style={styles.insideContainer}>
        <View
          style={{
            height: "20%",
            width: "100%",

            justifyContent: "space-around",
            marginBottom: "3%",
          }}
        >
          <Text style={{ fontFamily: "DMBold", fontSize: SIZES.xLarge }}>
            Voulez vous rejoindre BITAKA?
          </Text>
          <Text style={{ fontFamily: "DMRegular", fontSize: SIZES.medium }}>
            Créez votre compte dès maintenant pour profiter de toutes les
            fonctionnalités de notre application.
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            height: "8%",

            alignContent: "center",
          }}
        >
          {/* <RadioGroup
            layout="row"
            radioButtons={radioButtons}
            onPress={setSelectedId}
            selectedId={selectedId}
            containerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}
          />*/}
        </View>

        <View style={styles.inputsContainer}>
          <ScrollView
            contentContainerStyle={styles.scrollInputsContainer}
            keyboardShouldPersistTaps="handled"
          >
            <CustomTextInput
              setState={setNom}
              placeholder="Enter votre Nom"
            ></CustomTextInput>
            <CustomTextInput
              setState={setPrenom}
              placeholder="Enter votre Prenom"
            ></CustomTextInput>
            <CustomTextInput
              setState={setEmail}
              placeholder="Enter votre Email"
            ></CustomTextInput>
            <CustomTextInput
              setState={setPassword}
              placeholder="Enter votre Password"
            ></CustomTextInput>
            <SelectDropdown
              buttonStyle={{
                width: "100%",
                borderRadius: 10,
                marginBottom: "10%",
                borderWidth: 2,
                borderColor: "black",
              }}
              data={countries}
              onSelect={(selectedItem, index) => {
                setVille(selectedItem);
              }}
              defaultButtonText="Selectionner votre Ville"
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
              }}
            />
            {selectedId === "2" && (
              <>
                <CustomTextInput placeholder="Enter votre Email"></CustomTextInput>
                <CustomTextInput placeholder="Enter votre Email"></CustomTextInput>
                <CustomTextInput placeholder="Enter votre Email"></CustomTextInput>
              </>
            )}
            {
              <Pressable style={styles.btn} onPress={() => handleregister()}>
                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: "DMMedium",
                    color: "black",
                  }}
                >
                  S'inscrire
                </Text>
              </Pressable>
            }
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  insideContainer: {
    //height: "100%",
    width: "90%",
    flex: 1,
    //justifyContent: "center",
    alignItems: "center",
    //justifyContent: "space-around",
    paddingTop: "15%",
  },
  inputsContainer: {
    height: "100%",
    width: "100%",
    //justifyContent: "space-around",
    //alignItems: "center",
  },
  scrollInputsContainer: {
    height: 1100,
    width: "100%",
    //justifyContent: "space-around",
    //alignItems: "center",
    paddingBottom: 300,
  },
  btn: {
    backgroundColor: "#31C9BA",
    padding: 20,
    borderRadius: 10,
  },
});
