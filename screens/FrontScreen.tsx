import { View, Text } from "../components/Themed";
import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { Pressable, StyleSheet } from "react-native";

export default function FrontScreen() {
  const [value, setValue] = useState(true);
  return (
    <View>
      {value ? <SignIn /> : <SignUp />}
      <View style={styles.container}>
        <Pressable
          onPress={() => setValue(!value)}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
            },
            styles.wrapperCustom,
          ]}
        >
          {value ? (
            <Text style={styles.buttons}>SignUp</Text>
          ) : (
            <Text style={styles.buttons}>SignIn</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    backgroundColor: "#ffbf00",
    fontWeight: "500",
    borderRadius: 25,
    margin: "auto",
    width: "100%",
    padding: 10,
  },
  wrapperCustom: {
    borderRadius: 25,
    justifyContent: "center",
    textAlign: "center",
  },
  container: {
    flex: 1,
  },
});
