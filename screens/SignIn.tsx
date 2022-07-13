import axios from "axios";
import React from "react";
import { useState } from "react";
import { StyleSheet, TextInput, Pressable } from "react-native";
import { View, Text } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

export default function SignIn() {
  const [text, setText] = useState("ellen@gmail.com");
  const [password, setPassword] = useState("ellen");
  const [value, setValue] = useState({});

  const colorScheme = useColorScheme();
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  };
  async function auth() {
    await axios
      .post(
        "https://first-nest.vercel.app/auth/signin",
        {
          email: text,
          password: password,
        },
        {
          headers,
        }
      )
      .then(function (response) {
        console.log(response.data);
        setValue(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <View style={{ padding: 20 }}>
      <Text style={{color: Colors[colorScheme].text}}>E-mail</Text>
      <TextInput
        onChangeText={setText}
        placeholder="email"
        value={text}
        style={{
          color: Colors[colorScheme].text,
          fontSize: 18,
          width: "100%",
          marginVertical: 25,
        }}
      />
      <Text style={{color: Colors[colorScheme].text}}>Password</Text>
      <TextInput
        onChangeText={setPassword}
        placeholder="password"
        value={password}
        style={{
          color: Colors[colorScheme].text,
          fontSize: 18,
          width: "100%",
          marginVertical: 25,
        }}
      />

      <View>
        <Pressable onPress={auth}>
          <Text>Login</Text>
        </Pressable>
      </View>
      <View>
        <Text>{JSON.stringify(value)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //padding: 40,
  },
  textBox: {
    // padding: 20,
  },
});
