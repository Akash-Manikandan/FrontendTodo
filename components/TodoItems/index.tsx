import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Modal,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";

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
  const deleteItem = async (item: any) => {
    const jsonValue: any = await AsyncStorage.getItem("@kayee_login");
    let tok = jsonValue;
    const filteredData = data.filter((v: any) => v.id !== item.id);
    setData(filteredData);
    await axios.delete("https://first-nest.vercel.app/delete", {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${tok.replace(/"/g, "")}`,
      },
      data: {
        id: item.id,
      },
    });
  };
  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.item}>
        <Pressable onPress={() => onPressItem(item)}>
          <Text style={{ color: Colors[colorScheme].text, padding: 4 }}>
            {item.content}
          </Text>
        </Pressable>
        <Pressable onPress={() => deleteItem(item)}>
          <MaterialIcons
            name="delete"
            size={24}
            color={Colors[colorScheme].text}
          />
        </Pressable>
      </View>
    );
  };
  const AddItems = () => {
    const colorScheme = useColorScheme();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [inputText, setInputText] = useState("");

    async function onPressSave() {
      setIsModalVisible(false);
      const jsonValue: any = await AsyncStorage.getItem("@kayee_login");
      const jsonValue1: any = await AsyncStorage.getItem("@kayee_details");
      var det = JSON.parse(jsonValue1);

      let tok = jsonValue;

      const dataReq = await axios.post(
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
      const valId = dataReq.data.id;
      const valContent = dataReq.data.content;
      setData([...data, { id: valId, content: valContent }]);
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
            <View style={{ flexDirection: "row" }}>
              <Pressable
                style={styles.touchableSave}
                onPress={() => onPressSave()}
              >
                <Text style={{ color: "white", fontSize: 20, padding: 12 }}>
                  Save
                </Text>
              </Pressable>
              <View style={{ width: 30 }}></View>
              <Pressable
                style={styles.touchableSave}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={{ color: "white", fontSize: 20, padding: 12 }}>
                  Exit
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  const handleEditItem = async (editItem: any) => {
    let cpy: any;
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
      {data.length == 0 ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            width: "100%",
            height: "100%",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: Colors[colorScheme].text, fontSize: 40 }}>
            No Todos
          </Text>
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={isRender}
        />
      )}
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
            Edit
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setInputText(text)}
            defaultValue={inputText}
            editable={true}
            multiline={true}
          />
          <View style={{ flexDirection: "row" }}>
            <Pressable
              style={styles.touchableSave}
              onPress={() => onPressSaveEdit()}
            >
              <Text style={{ color: "white", fontSize: 20, padding: 12 }}>
                Update
              </Text>
            </Pressable>
            <View style={{ width: 30 }}></View>
            <Pressable
              style={styles.touchableSave}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={{ color: "white", fontSize: 20, padding: 12 }}>
                Exit
              </Text>
            </Pressable>
          </View>
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
    flexDirection: "row",
    borderRadius: 20,
    width: "98%",
    justifyContent: "space-between",
    textAlign: "center",
    alignSelf: "center",
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

  touchableSave: {
    width: "30%",
    height: "65%",

    borderRadius: 30,
    backgroundColor: "#e33062",
    alignItems: "center",
    marginTop: 25,
  },
});
export default TodoItems;
