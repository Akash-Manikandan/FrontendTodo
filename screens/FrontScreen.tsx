import { View, Text } from "react-native";
import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { Pressable, StyleSheet } from "react-native";

export default function FrontScreen() {
  const [value, setValue] = useState(true);
  return (
    <View
      style={{
        padding: 20,
        flex: 1,
        justifyContent: "center",
        
      }}
    >
      {value ? <SignIn /> : <SignUp />}
      <View>
        <Pressable
          onPress={() => setValue(!value)}
          style={{
            backgroundColor: "#e33062",
            height: 50,
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30,
          }}
        >
          {value ? (
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              SignUp
            </Text>
          ) : (
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              SignIn
            </Text>
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
    /*borderRadius: 25,
    justifyContent: "center",
    textAlign: "center",*/
  },
  container: {
    flex: 1,
    alignContent: "center",
  },
});
