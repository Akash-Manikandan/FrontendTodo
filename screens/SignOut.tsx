import { View, Text, Pressable } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const SignOut = () => {
  const navigation = useNavigation();
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
    <Pressable onPress={removeItemValue}>
      <Text>SignOut</Text>
    </Pressable>
  );
};

export default SignOut;
