import React, {useState} from 'react';
import {StyleSheet, Button, View, FlatList} from 'react-native';
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
      <Button title="Add Item" onPress={() => setIsAddItem(true)} />
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
              size={32}
              onPress={removeItemFromList.bind(this, itemData.item.id)} />
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    padding: 48,
    backgroundColor: "#99CC66",
    flex: 1
  },
  listRow: {
    flexDirection: 'row'
  }
}
);