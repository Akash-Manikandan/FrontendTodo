//@ts-nocheck
import axios from "axios";
import React from "react";
import { useState } from "react";
import { TextInput, Pressable } from "react-native";
import { View, Text } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignIn() {
  const [text, setText] = useState("ellen@gmail.com");
  const [password, setPassword] = useState("ellen");

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
      .then(async function (response) {
        await AsyncStorage.setItem(
          "@kayee_login",
          JSON.stringify(response.data.access_token)
        );
        await axios
          .get("https://first-nest.vercel.app/users/me", {
            headers: { Authorization: `Bearer ${response.data.access_token}` },
          })
          .then(async function (res) {
            await AsyncStorage.setItem(
              "@kayee_details",
              JSON.stringify(res.data)
            );
            if (res.data && response.data) {
              navigation.replace("Todo");
            }
          })
          .catch(function (error) {
            console.log(error + "1333");
          });
      })
      .catch(function (error) {
        console.log(error + "1");
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
    </View>
  );
}
