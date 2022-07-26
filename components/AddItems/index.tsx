import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";

const AddItems = () => {
  const colorScheme = useColorScheme();

  async function addTodo() {}
  return (
    <View style={styles.container}>
      <Pressable onPress={addTodo}>
        <Ionicons
          name="md-add-circle"
          size={58}
          color="black"
          style={{ color: Colors[colorScheme].text }}
        />
      </Pressable>
    </View>
  );
};

export default AddItems;
const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "flex-end",
    
  },
});
