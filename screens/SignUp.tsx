import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Text, View } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
export default function SignUp() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  };
  const toggleLoading = () => {
    setIsLoading(!isLoading);
  };
  async function auth() {
    toggleLoading();
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
  useEffect(() => {
    const fetchData = async () => {
      const jsonValue: any = await AsyncStorage.getItem("@kayee_login");
      const jsonValue1: any = await AsyncStorage.getItem("@kayee_details");
      if (jsonValue && jsonValue1) {
        navigation.replace("Todo");
      }
    };
    fetchData();
    setIsCheck(true);
    return () => {
      setText("");
      setPassword("");
      setIsLoading(true);
      setIsCheck(true);
    };
  }, []);
  if (!isCheck) {
    return null;
  } else {
    return (
      <View>
        <Text
          style={{
            color: Colors[colorScheme].text,
            fontWeight: "bold",
            fontSize: 25,
          }}
        >
          Name :
        </Text>
        <TextInput
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
          onChangeText={setName}
          placeholder="name"
          value={name}
        />
        <Text
          style={{
            color: Colors[colorScheme].text,
            fontWeight: "bold",
            fontSize: 25,
          }}
        >
          E-mail :
        </Text>
        <TextInput
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
          onChangeText={setText}
          placeholder="email"
          value={text}
        />
        <Text
          style={{
            color: Colors[colorScheme].text,
            fontWeight: "bold",
            fontSize: 25,
          }}
        >
          Password :
        </Text>
        <TextInput
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
          secureTextEntry
          onChangeText={setPassword}
          placeholder="password"
          value={password}
        />
        <View>
          {isLoading && <ActivityIndicator size="large" color="#e33062" />}

          <Pressable
            onPress={auth}
            disabled={isLoading}
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
              Go!
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    // padding: 40,
  },
  textBox: {
    // padding: 20,
  },
});
