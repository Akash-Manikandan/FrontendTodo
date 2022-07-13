import axios from "axios";
import React from "react";
import { useState } from "react";
import { StyleSheet, TextInput, Pressable } from "react-native";
import { View, Text } from "../components/Themed";

export default function SignIn() {
  const [text, setText] = useState("ellen@gmail.com");
  const [password, setPassword] = useState("ellen");
  const [value, setValue] = useState({});
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
    <View style={styles.container}>
      <Text>E-mail</Text>
      <TextInput
        style={styles.textBox}
        onChangeText={setText}
        placeholder="email"
        value={text}
      />
      <Text>Password</Text>
      <TextInput
        style={styles.textBox}
        onChangeText={setPassword}
        placeholder="password"
        value={password}
      />

      <View style={{ padding: 20 }}>
        <Pressable onPress={auth}>
          <Text>Login</Text>
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
