import { View, Text, FlatList, StyleSheet, StatusBar } from "react-native";
import React from "react";

import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import AddItems from "../AddItems";

const TodoItems = (props: any) => {
  const colorScheme = useColorScheme();
  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.item}>
        <Text style={{ color: Colors[colorScheme].text }}>{item.content}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={props.todo}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <View
        style={{
          width: 100,
          height: 100,
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
    width: "100%",
    height: "100%",
    padding: 10,
  },
  item: {
    borderWidth: 3,
    margin: 10,
    borderColor: "#e33062",
    padding: 15,

    borderRadius: 20,
  },
});
export default TodoItems;
