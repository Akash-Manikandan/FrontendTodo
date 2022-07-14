import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { Axios } from "axios";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  /*var token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVsbGVuQGdtYWlsLmNvbSIsInN1YiI6IjYyYzZjOWZkNTIyYmM2N2Q4NGMxZTJjNSIsImlhdCI6MTY1Nzc3NjU2OSwiZXhwIjoxNjU3Nzc3NDY5fQ.2GyM7cspC-QTnFPPiv3YXLUG-PmThKW88IXMjRXj7MA";
  const config = {
    headers: { Authorization: `Bearer ${token}` }, 
  };*/
  async function fetch() {
    /*const response = await axios.get(
      "https://first-nest.vercel.app/users/me",
      config
    );
    console.log(response.data);*/
    const jsonValue = await AsyncStorage.getItem("@kayee_login");
    jsonValue != null ? console.log(JSON.parse(jsonValue)) : console.log("1");
    const jsonValue1 = await AsyncStorage.getItem("@kayee_details");
    jsonValue1 != null ? console.log(JSON.parse(jsonValue1)) : console.log("2");
  }
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
