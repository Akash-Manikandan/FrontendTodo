//@ts-nocheck
import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";

const SignOut = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  async function removeItemValue() {
    try {
      await AsyncStorage.removeItem("@kayee_login");
      await AsyncStorage.removeItem("@kayee_details");
      navigation.replace("Root");
    } catch (exception) {
      return false;
    }
  }
  return (
    <View style={styles.button}>
      <Pressable onPress={removeItemValue}>
        {/*<Text>SignOut</Text>
        <AntDesign  name="logout" size={24} color="black" />*/}
        <Ionicons
          name="ios-log-out-outline"
          size={24}
          color="black"
          style={{ color: Colors[colorScheme].text }}
        />
      </Pressable>
    </View>
  );
};

export default SignOut;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",

    height: "100%",
  },
  button: {
    padding: 10,
  },
});
