import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, SafeAreaView } from "react-native";

import { Text, View } from "../components/Themed";
import TodoItems from "../components/TodoItems";
import { RootTabScreenProps } from "../types";
import SignOut from "./SignOut";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [todo, setTodo] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const jsonValue: any = await AsyncStorage.getItem("@kayee_login");
      const jsonValue1: any = await AsyncStorage.getItem("@kayee_details");
      var det = JSON.parse(jsonValue1);
      var tok = jsonValue;

      await axios
        .get(`https://first-nest.vercel.app/${det.id}`, {
          headers: { Authorization: `Bearer ${tok.replaceAll('"', "")}` },
        })
        .then(function (res) {
          setTodo(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    fetchData();
    return () => {
      setTodo({});
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TodoItems todo={todo} />
        <SignOut />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
