/*import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import { supabase } from "../../lib/supabase";
import { Session } from "@supabase/supabase-js";
const home = () => {
  const [loggedinuser, setLoggedinuser] = useState({});
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log(session.user.id);
    });
  }, []);
  return (
    <View>
      <Text>home</Text>

      <Pressable onPress={() => router.replace("/")}>
        <Text>logout</Text>
      </Pressable>
    </View>
  );
};

export default home;

const styles = StyleSheet.create({});*/
