import { View, Text, FlatList,StyleSheet ,StatusBar} from "react-native";
import React from "react";

const TodoItems = (props:any) => {

  const renderItem = ({ item }: any) => {
    return (
    <View style={styles.item}>
      <Text>{item.content}</Text>
    </View>);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={props.todo}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );  
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
 
});
export default TodoItems;
