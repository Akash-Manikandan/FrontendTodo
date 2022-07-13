import axios from "axios";
import React from "react";
import { useState } from "react";
import { StyleSheet, TextInput, Pressable } from "react-native";
import { Text, View } from "../components/Themed";

export default function SignUp() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  const [value, setValue] = useState({});
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
    <View style={styles.container}>
      <Text>Name :</Text>
      <TextInput
        style={styles.textBox}
        onChangeText={setName}
        placeholder="name"
        value={name}
      />
      <Text>E-mail :</Text>
      <TextInput
        style={styles.textBox}
        onChangeText={setText}
        placeholder="email"
        value={text}
      />
      <Text>Password :</Text>
      <TextInput
        style={styles.textBox}
        onChangeText={setPassword}
        placeholder="password"
        value={password}
      />
      <View style={{ padding: 20 }}>
        <Pressable onPress={auth}>
          <Text>Ok</Text>
        </Pressable>
      </View>
      <View style={{ padding: 20 }}>
        <Text>{JSON.stringify(value)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
  },
  textBox: {
    padding: 20,
  },
});
