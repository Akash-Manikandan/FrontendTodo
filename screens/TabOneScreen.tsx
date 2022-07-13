import axios, { Axios } from "axios";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVsbGVuQGdtYWlsLmNvbSIsInN1YiI6IjYyYzZjOWZkNTIyYmM2N2Q4NGMxZTJjNSIsImlhdCI6MTY1NzY5Njc1NCwiZXhwIjoxNjU3Njk3NjU0fQ.tjcrz9Hg6ckJNhcZxwNmxy_L_uY4bcPl_GoPX058G_k"
  const config = {
    headers: { Authorization: `Bearer ${token}` }
};
  async function fetch() {
    const response = await axios.get('https://first-nest.vercel.app/find',config);
    console.log(response);
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
