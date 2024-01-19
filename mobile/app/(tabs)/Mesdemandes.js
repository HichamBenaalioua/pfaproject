import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Mesdemandes() {
  const [demandes, setDemandes] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDemandes();
  }, []);

  const fetchDemandes = async () => {
    try {
      const username = await AsyncStorage.getItem("username");
      setUser(username);

      const response = await axios.get(
        "http://localhost:8080/api/demandes/all"
      );
      setDemandes(response.data.reverse()); // Reverse the order of the list
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    if (status === "accepté") {
      return "green";
    } else if (status === "refusé") {
      return "red";
    } else {
      return "black"; // Default color if status is null
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    fetchDemandes();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
        <Text style={styles.refreshButtonText}>Refresh</Text>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : demandes && demandes.length > 0 ? (
        <FlatList
          data={demandes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.demandItem}>
              <View style={styles.textContainer}>
                <Text style={styles.boldText}>{item.objet}</Text>
                <Text>{item.textdemande}</Text>
              </View>
              {item.status && (
                <Text
                  style={[
                    styles.status,
                    { color: getStatusColor(item.status) },
                  ]}
                >
                  {item.status}
                </Text>
              )}
            </View>
          )}
        />
      ) : (
        <Text>No demands found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  demandItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
  },
  boldText: {
    fontWeight: "bold",
  },
  status: {
    marginLeft: 10,
  },
  refreshButton: {
    backgroundColor: "#31C9BA",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  refreshButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
