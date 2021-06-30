import React, {useState} from 'react';
import {StyleSheet, Button, View, FlatList, Text, TouchableOpacity} from 'react-native';
import ItemList from './Components/Items/ItemList';
import ItemInput from './Components/Items/ItemInput';
import {IconButton} from 'react-native-paper';

export default function App() {
  const [itemList, setItemList] = useState([]);
  const [isAddItem, setIsAddItem] = useState(false);
  const [itemCount, setItemCount] = useState(1);

  const handleEnteredItem = (enteredItem) => {
    setItemList(prevState => [
      ...itemList,
      {id: Math.random().toString(), value: enteredItem}
    ]);
    setIsAddItem(false);
    setItemCount(prevState => itemCount + 1);
  };

  const removeItemFromList = (itemId) => {
    setItemList(prevState => {
      return itemList.filter((item) => item.id !== itemId);
    });
    setItemCount(prevState => itemCount - 1);
  };

  const handleCancelAddItem = () => {
    setIsAddItem(false);
  };

  return (
    <View style={styles.screen}>
      <TouchableOpacity
        style={styles.inputButton}
        onPress={() => setIsAddItem(true)}
      >
        <Text style={styles.buttonText}>Add an Item</Text>
      </TouchableOpacity>
      <ItemInput
        visible={isAddItem}
        onAddItem={handleEnteredItem}
        itemCount={itemCount}
        onCancel={handleCancelAddItem}
      />
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={itemList}
        renderItem={(itemData) => (
          <View style={styles.listRow}>
            <ItemList item={itemData.item.value} itemNumber={itemData.index + 1} itemId={itemData.item.id} />
            <IconButton
              icon="delete"
              color="#404c40"
              size={24}
              onPress={removeItemFromList.bind(this, itemData.item.id)} />
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.clearButton}
        onPress={() => setItemList([])}
      >
        <Text style={styles.buttonText}>Clear All</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    padding: 48,
    backgroundColor: "#99CC66",
    flex: 1,
    justifyContent: "center",
  },
  listRow: {
    flexDirection: 'row'
  },
  inputButton: {
    backgroundColor: '#ffff66',
    alignItems: 'center',
    padding: 4,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 8,
  },
  clearButton: {
    backgroundColor: '#c0ccc0',
    alignItems: 'center',
    padding: 4,
    marginTop: 12,
    borderRadius: 10,
    elevation: 8,

  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 24
  }
}
);