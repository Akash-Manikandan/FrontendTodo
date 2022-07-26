import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";

import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import AddItems from "../AddItems";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TodoItems = (props: any) => {
  const colorScheme = useColorScheme();
  const [data, setData] = useState(props.todo);

  const [isRender, setIsRender] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputText, setInputText] = useState("");
  const [editItem, setEditItem] = useState();
  useEffect(() => {
    setData(props.todo);
  }, [props.todo]);

  const onPressItem = (item: any) => {
    setIsModalVisible(true);
    setInputText(item.content);
    setEditItem(item.id);
  };
  const renderItem = ({ item }: any) => {
    // const ONE_SECOND_IN_MS = 1000;
    // const PATTERN = [1 * ONE_SECOND_IN_MS];
    return (
      <Pressable onPress={() => onPressItem(item)}>
        <View style={styles.item}>
          <Text style={{ color: Colors[colorScheme].text }}>
            {item.content}
          </Text>
        </View>
      </Pressable>
    );
  };
  const handleEditItem = async (editItem: any) => {
    let cpy:any;
    const newData = data.map((item: any) => {
      if (item.id == editItem) {
        item.content = inputText;
        cpy = item;
        return item;
      }
      return item;
    });
    setData(newData);
    const jsonValue: any = await AsyncStorage.getItem("@kayee_login");
    let tok = jsonValue;
    await axios.patch(
      "https://first-nest.vercel.app/updateTodo",
      {
        id: cpy.id,
        content: cpy.content,
      },
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${tok.replace(/"/g, "")}`,
        },
      }
    );
    setIsRender(!isRender);
  };
  const onPressSaveEdit = () => {
    handleEditItem(editItem);
    setIsModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={isRender}
      />
      <Modal
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modal}>
          <Text>Change Text: </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setInputText(text)}
            defaultValue={inputText}
            editable={true}
          />
          <TouchableOpacity onPress={() => onPressSaveEdit()}>
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View
        style={{
          position: "absolute",
          bottom: 2,
          right: 2,
        }}
      >
        <AddItems />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: "100%",
    height: "100%",
  },
  item: {
    borderWidth: 3,
    margin: 10,
    borderColor: "#e33062",
    padding: 15,

    borderRadius: 20,
  },
  textInput: {
    width: "90%",
    height: 70,
    borderColor: "grey",
    borderWidth: 1,
    fontSize: 25,
  },
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  touchableSave: {
    backgroundColor: "orange",
    paddingHorizontal: 100,
    alignItems: "center",
    marginTop: 20,
  },
});
export default TodoItems;
