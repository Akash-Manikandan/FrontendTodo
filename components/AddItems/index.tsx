import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
} from "react-native";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";

const AddItems = () => {
  const colorScheme = useColorScheme();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputText, setInputText] = useState("");

  async function onPressSave() {
    setIsModalVisible(false);
    const jsonValue: any = await AsyncStorage.getItem("@kayee_login");
    const jsonValue1: any = await AsyncStorage.getItem("@kayee_details");
    var det = JSON.parse(jsonValue1);
    console.log(det);
    let tok = jsonValue;
    await axios.post(
      "https://first-nest.vercel.app/addTodo",
      {
        userId: det.id,
        content: inputText,
      },
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${tok.replace(/"/g, "")}`,
        },
      }
    );
  }

  const addTodo = () => {
    setIsModalVisible(true);
  };
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
      <Modal
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ margin: 20, fontWeight: "bold", fontSize: 25 }}>
            Add Todo
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setInputText(text)}
            defaultValue={inputText}
            editable={true}
            multiline={true}
          />
          <TouchableOpacity
            style={styles.touchableSave}
            onPress={() => onPressSave()}
          >
            <Text style={{ color: "white", fontSize: 20, padding: 12 }}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default AddItems;
const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "flex-end",
  },
  textInput: {
    width: "90%",
    height: 80,
    borderColor: "#e33062",
    borderWidth: 5,
    fontSize: 25,
    borderRadius: 30,
    padding: 20,
  },
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  touchableSave: {
    paddingHorizontal: 10,
    borderRadius: 30,
    backgroundColor: "#e33062",
    alignItems: "center",
    marginTop: 25,
  },
});
