import {
  Alert,
  Button,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import { SIZES, COLORS } from "../constants";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { supabase } from "../lib/supabase";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handlelogin = async () => {
    //router.replace("/demande");
    try {
      const apiUrl = "http://localhost:8080/api/users/checkLogin";

      const data = { nom: email, password: password };

      const response = await axios.post(apiUrl, data);

      console.log("Response:", response.data);
      if (response.data) {
        AsyncStorage.setItem("username", email);
        router.replace("/demande");
      } else {
        console.log("login failed");
      }
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.insideContainer}>
        <Image
          style={{
            resizeMode: "contain",
            width: "100%",
            height: "30%",
          }}
          source={require("../assets/images/imglogo.png")}
        ></Image>
        <View style={styles.greetingsContainer}>
          <Text style={styles.headertext}>Bienvenue sur BITAKA</Text>
          <Text style={styles.text}>
            Connectez-vous pour accéder à votre compte.
          </Text>
        </View>
        <View style={styles.inputsContainer}>
          <View style={styles.input}>
            <Entypo name="email" size={24} color="black" />
            <TextInput
              placeholder="Entrer votre email"
              onChangeText={(inputemailtext) => setEmail(inputemailtext)}
              style={styles.textinput}
            />
          </View>
          <View style={styles.input}>
            <MaterialCommunityIcons
              name="form-textbox-password"
              size={24}
              color="black"
            />
            <TextInput
              placeholder="Entrer votre password"
              onChangeText={(inputpasstext) => setPassword(inputpasstext)}
              style={styles.textinput}
              secureTextEntry={true}
            />
          </View>
        </View>
        <View style={styles.btnContainer}>
          <Pressable style={styles.btn} onPress={() => handlelogin()}>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "DMMedium",
                color: "black",
              }}
            >
              Connecter
            </Text>
          </Pressable>

          <Text style={{ fontFamily: "DMMedium", marginTop: 40 }}>
            {" "}
            Pas encore de compte ? Créez un compte{" "}
            <Link href="/register" asChild>
              <Text style={{ fontSize: SIZES.large, color: "#28A69A" }}>
                ici.
              </Text>
            </Link>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: SIZES.medium,
    fontFamily: "DMRegular",
  },
  headertext: {
    fontSize: SIZES.xLarge,
    fontFamily: "DMBold",
  },
  insideContainer: {
    height: "70%",
    width: "90%",
    justifyContent: "flex-start",
  },
  greetingsContainer: {
    height: "12%",
    width: "100%",

    justifyContent: "space-between",
  },
  inputsContainer: {
    width: "100%",
    height: "33%",
    justifyContent: "space-around",
    marginTop: 20,
  },
  input: {
    width: "100%",
    height: "28%",

    paddingLeft: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    flexDirection: "row",

    alignItems: "center",
  },
  textinput: {
    height: "100%",
    width: "90%",
    marginLeft: 5,
  },
  btnContainer: {
    flex: 1,
    justifyContent: "space-around",
    marginTop: 20,
  },
  btn: {
    backgroundColor: COLORS.lightgreen,
    padding: 20,
    borderRadius: 10,
  },
});
