import axios from "axios";
import React from "react";
import { useState } from "react";
import { TextInput, Pressable } from "react-native";
import { View, Text } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { useNavigation } from "@react-navigation/native";

export default function SignIn() {
  const [text, setText] = useState("ellen@gmail.com");
  const [password, setPassword] = useState("ellen");
  const [value, setValue] = useState({});
  const navigation = useNavigation();
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
        navigation.navigate("Todo");
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <View>
      <Text
        style={{
          color: Colors[colorScheme].text,
          fontWeight: "bold",
          fontSize: 25,
        }}
      >
        E-mail
      </Text>
      <TextInput
        onChangeText={setText}
        placeholder="email"
        value={text}
        style={{
          padding: 18,
          borderWidth: 2,
          borderRadius: 20,
          borderColor: "#e33062",
          color: Colors[colorScheme].text,
          fontSize: 18,
          width: "100%",
          marginVertical: 25,
        }}
      />
      <Text
        style={{
          color: Colors[colorScheme].text,
          fontWeight: "bold",
          fontSize: 25,
        }}
      >
        Password
      </Text>
      <TextInput
        onChangeText={setPassword}
        placeholder="password"
        value={password}
        secureTextEntry
        style={{
          padding: 18,
          borderWidth: 2,
          borderRadius: 20,
          borderColor: "#e33062",
          color: Colors[colorScheme].text,
          fontSize: 18,
          width: "100%",
          marginVertical: 25,
        }}
      />

      <View>
        <Pressable
          onPress={auth}
          style={{
            backgroundColor: "#e33062",
            height: 50,
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Login
          </Text>
        </Pressable>
      </View>
      <View>
        <Text>{JSON.stringify(value)}</Text>
      </View>
    </View>
  );
}
