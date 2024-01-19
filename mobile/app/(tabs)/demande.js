import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

const demande = () => {
  const [objetDeDemande, setObjetDeDemande] = useState("");
  const [textDeDemande, setTextDeDemande] = useState("");

  const handleEnvoyer = async () => {
    console.log("Objet de demande:", objetDeDemande);
    console.log("Text de demande:", textDeDemande);

    try {
      const username = await AsyncStorage.getItem("username");
      const userresponse = await axios.get(
        `http://localhost:8080/api/users/id/${username}`
      );
      console.log(userresponse.data);
      const apiUrl = "http://localhost:8080/api/demandes/save";

      const data = {
        objet: objetDeDemande,
        textdemande: textDeDemande,
        status: null,
        user: { id: userresponse.data },
      };

      const response = await axios.post(apiUrl, data);

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Objet de demande</Text>
        <TextInput
          style={styles.input}
          value={objetDeDemande}
          onChangeText={setObjetDeDemande}
          placeholder="Enter your request object"
        />

        <Text style={styles.label}>Message de demande</Text>
        <TextInput
          style={styles.textArea}
          value={textDeDemande}
          onChangeText={setTextDeDemande}
          placeholder="Enter your request text"
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.button} onPress={handleEnvoyer}>
          <Text style={styles.buttonText}>Envoyer</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "80%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
  textArea: {
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    paddingTop: 8,
  },
  button: {
    backgroundColor: "#31C9BA",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default demande;
