import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import {IconButton} from 'react-native-paper';

import ItemInput from '../components/items/ItemInput';
import ItemList from '../components/items/ItemList';

import Colors from '../constants/colors/colors';

const AddItemsScreen = (props) => {
  const [itemList, setItemList] = useState([]);
  const [isAddItem, setIsAddItem] = useState(false);
  const [itemCount, setItemCount] = useState(1);
  const [matchups, setMatchups] = useState([]);

  const firstMatchup = [itemList[0], itemList[1]];

  const handleEnteredItem = (enteredItem) => {
    setItemList(prevState => [
      ...itemList,
      {id: Math.floor(Math.random() * 10000).toString(), value: enteredItem, score: 0}
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
    if (itemList.length < 3) {
      return alert("Your list must include at least 3 items to be compared.");
    } else {
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
      setMatchups(prevState => [matchups]);
      props.navigation.navigate({
        routeName: 'CompareItems',
        params: {matchups, itemList, firstMatchup},
      });
    };
  };

  const handleClearItems = () => {
    setItemCount(1);
    setItemList([]);
  };

  const openAddItemModal = () => {
    setIsAddItem(true);
  };

  return (
    <View style={styles.screen}>
      {itemList.length !== 10 ?
        <View>
          <TouchableOpacity
            style={styles.inputButton}
            onPress={openAddItemModal}
          >
            <Text style={styles.buttonText}>Add an Item</Text>
          </TouchableOpacity>
        </View>
        :
        <View>
          <TouchableOpacity
            disabled={true}
            style={styles.disabledButton}
            onPress={() => setIsAddItem(true)}
          >
            <Text style={styles.disabledText}>Add an Item</Text>
          </TouchableOpacity>
        </View>
      }
      <ItemInput
        visible={isAddItem}
        onAddItem={handleEnteredItem}
        itemCount={itemCount}
        onCancel={handleCancelAddItem}
        itemList={itemList}
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
        onPress={() => handleClearItems()}
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
    paddingTop: 12,
    flexDirection: 'column',
    backgroundColor: Colors.mainGreen,
    flex: 1,
    justifyContent: 'center',
  },
  listRow: {
    flexDirection: 'row'
  },
  inputButton: {
    width: '80%',
    backgroundColor: Colors.mainYellow,
    alignItems: 'center',
    padding: 4,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 12,
    alignSelf: 'center',
  },
  disabledButton: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: Colors.mainGreen,
    padding: 4,
    marginBottom: 12,
    borderRadius: 12,
    alignSelf: 'center',
  },
  compareButton: {
    width: '80%',
    backgroundColor: Colors.mainYellow,
    alignItems: 'center',
    padding: 4,
    marginVertical: 12,
    borderRadius: 12,
    elevation: 12,
    alignSelf: 'center',
  },
  clearButton: {
    width: '50%',
    backgroundColor: Colors.liteGray,
    alignItems: 'center',
    padding: 4,
    marginVertical: 12,
    borderRadius: 12,
    elevation: 12,
    alignSelf: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'black',
  },
  disabledText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: Colors.mainGreen,
  },
  buttonBox: {
    justifyContent: 'center',
  }
}
);

export default AddItemsScreen;
;
