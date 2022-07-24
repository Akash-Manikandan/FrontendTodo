import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import TodoItems from "../components/TodoItems";
import { RootTabScreenProps } from "../types";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  useEffect(() => {
    const fetchData = async () => {
      const jsonValue: any = await AsyncStorage.getItem("@kayee_login");
      const jsonValue1: any = await AsyncStorage.getItem("@kayee_details");
      var det = JSON.parse(jsonValue1);
      var tok = jsonValue;
      console.log(det.id);
      console.log(tok.replaceAll('"', ""));
      await axios
        .get(`https://first-nest.vercel.app/${det.id}`, {
          headers: { Authorization: `Bearer ${tok.replaceAll('"', "")}` },
        })
        .then(function (res) {
          console.log(res.data);
    
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    fetchData();
    return () => {
      null;
    };
  }, []);

  return (
    <View style={styles.container}>
      <Pressable>
        <Text style={styles.title}>Click here</Text>
      </Pressable>
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
