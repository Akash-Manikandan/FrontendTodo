import axios from "axios";
import React from "react";
import { useState } from "react";
import { StyleSheet, TextInput, Pressable } from "react-native";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

export default function SignUp() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  const [value, setValue] = useState({});
  const colorScheme = useColorScheme();
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  };
  async function auth() {
    await axios
      .post(
        "https://first-nest.vercel.app/auth/signup",
        {
          name: name,
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
      <Text style={{ color: Colors[colorScheme].text }}>Name :</Text>
      <TextInput
        style={{
          color: Colors[colorScheme].text,
          fontSize: 18,
          width: "100%",
          marginVertical: 25,
        }}
        onChangeText={setName}
        placeholder="name"
        value={name}
      />
      <Text style={{ color: Colors[colorScheme].text }}>E-mail :</Text>
      <TextInput
        style={{
          color: Colors[colorScheme].text,
          fontSize: 18,
          width: "100%",
          marginVertical: 25,
        }}
        onChangeText={setText}
        placeholder="email"
        value={text}
      />
      <Text style={{ color: Colors[colorScheme].text }}>Password :</Text>
      <TextInput
        style={{
          color: Colors[colorScheme].text,
          fontSize: 18,
          width: "100%",
          marginVertical: 25,
        }}
        onChangeText={setPassword}
        placeholder="password"
        value={password}
      />
      <View>
        <Pressable onPress={auth}>
          <Text>Ok</Text>
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
    // padding: 40,
  },
  textBox: {
    // padding: 20,
  },
});
