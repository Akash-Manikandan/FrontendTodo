import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [details, setDetails] = useState("");
  const [token, setToken] = useState("");
  async function fetch() {
    console.log((details.id));
    console.log(token.replaceAll('"',""));
    await axios
      .get(`https://first-nest.vercel.app/${details.id}`, {
        headers: { Authorization : `Bearer ${token.replaceAll('"',"")}` },
      })
      .then(function (res) {
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    const fetchData = async () => {
      const jsonValue: any = await AsyncStorage.getItem("@kayee_login");
      const jsonValue1: any = await AsyncStorage.getItem("@kayee_details");
      setDetails(JSON.parse(jsonValue1));
      setToken(jsonValue);
    };
    fetchData();
    return () => {
      null;
    };
  }, []);

  return (
    <View style={styles.container}>
      <Pressable onPress={fetch}>
        <Text style={styles.title}>Click here</Text>
      </Pressable>

      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
