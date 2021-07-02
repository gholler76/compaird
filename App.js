import React, {useState} from 'react';
import {StyleSheet, Button, View, FlatList, Text, TouchableOpacity} from 'react-native';
import ItemList from './Components/Items/ItemList';
import ItemInput from './Components/Items/ItemInput';
import TopBar from './Components/TopBar/TopBar';
import {IconButton} from 'react-native-paper';

import ResultsScreen from './Screens/Results';
import CompareScreen from './Screens/CompareItems';
import AddItemsScreen from './Screens/AddItems';

export default function App() {
  const [itemList, setItemList] = useState([]);
  const [isAddItem, setIsAddItem] = useState(false);
  const [itemCount, setItemCount] = useState(1);
  const [matchups, setMatchups] = useState([]);

  const handleEnteredItem = (enteredItem) => {
    setItemList(prevState => [
      ...itemList,
      {id: Math.random().toString(), value: enteredItem, score: 0}
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

  function createMatchups() {
    let matchups = [];
    let one = 0;
    let id = 0;

    for (let i = 0;i < itemList.length - 1;i++) {
      one = i;
      for (let two = one + 1;two < itemList.length;two++) {
        id++;
        matchups.push({id: id, itemOne: itemList[one], itemTwo: itemList[two]});
      }
    }
    setMatchups(prevState => (matchups));
  };


  return (
    <View style={styles.screen}>
      <TopBar />
      <View>
        <TouchableOpacity
          style={styles.inputButton}
          onPress={() => setIsAddItem(true)}
        >
          <Text style={styles.buttonText}>Add an Item</Text>
        </TouchableOpacity>
      </View>
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
      <TouchableOpacity
        style={styles.compareButton}
        onPress={() => createMatchups([])}
      >
        <Text style={styles.buttonText}>Compare Your Items</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    paddingTop: 36,
    flexDirection: 'column',
    backgroundColor: "#99CC66",
    flex: 1,
    justifyContent: 'center',
  },
  listRow: {
    flexDirection: 'row'
  },
  inputButton: {
    width: '80%',
    backgroundColor: '#ffff66',
    alignItems: 'center',
    padding: 4,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 12,
    alignSelf: 'center',
  },
  compareButton: {
    width: '80%',
    backgroundColor: '#ffff66',
    alignItems: 'center',
    padding: 4,
    marginBottom: 18,
    borderRadius: 12,
    elevation: 12,
    alignSelf: 'center',
  },
  clearButton: {
    width: '50%',
    backgroundColor: '#c0ccc0',
    alignItems: 'center',
    padding: 4,
    marginVertical: 12,
    borderRadius: 12,
    elevation: 12,
    alignSelf: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 24
  },
  buttonBox: {
    justifyContent: 'center',
  }
}
);