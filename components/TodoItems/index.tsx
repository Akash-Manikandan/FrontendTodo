import { View, Text, SafeAreaView } from "react-native";
import React from "react";

const TodoItems = (todo: any) => {
  return (
    <SafeAreaView>
      <Text style={{ padding: 80 }}>{todo.id}</Text>
    </SafeAreaView>
  );
};

export default TodoItems;
