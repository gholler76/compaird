import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions} from 'react-native';
import {IconButton, FAB} from 'react-native-paper';

import ItemInput from '../components/items/ItemInput';
import ItemList from '../components/items/ItemList';

import Colors from '../constants/colors/colors';

const AddItemsScreen = (props) => {
  const [itemList, setItemList] = useState([]); // keep list of items in state
  const [isAddItem, setIsAddItem] = useState(false); // boolean for whether "add item" has been touched
  const [itemCount, setItemCount] = useState(0); // keep count of items
  const [matchups, setMatchups] = useState([]); // 

  const firstMatchup = [itemList[0], itemList[1]]; // create default matchup for the compare render

  // add new item object to itemList
  const handleEnteredItem = (enteredItem) => {
    setItemList(prevState => [
      ...itemList,
      {id: Math.floor(Math.random() * 10000).toString(), value: enteredItem, score: 0}
    ]);
    setIsAddItem(false); // toggle to control appearance of modal for item input
    setItemCount(prevState => itemCount + 1);
  };

  // remove item from list and reduce count by 1
  const removeItemFromList = (itemId) => {
    setItemList(prevState => {
      return itemList.filter((item) => item.id !== itemId);
    });
    setItemCount(prevState => itemCount - 1);
  };

  // back out of input modal
  const handleCancelAddItem = () => {
    setIsAddItem(false);
  };

  // create an array of objects with all matchups between items on list
  function createMatchups() {
    if (itemList.length < 4) {
      return alert("Your list must include at least 4 items to be compared.");
    } else {
      let matchups = [];
      let one = 0;
      let id = 0;

      // set item one and loop through the other items
      for (let i = 0;i < itemList.length - 1;i++) {
        one = i;
        // set item two by looping through all items after item one
        for (let two = one + 1;two < itemList.length;two++) {
          id++;
          matchups.push({id: id, itemOne: itemList[one], itemTwo: itemList[two]});
        }
      }
      setMatchups(prevState => [matchups]);
      // set navigation to Compare screen and pass all matchups, the full itemList and the first matchup as default
      props.navigation.navigate({
        routeName: 'CompareItems',
        params: {matchups, itemList, firstMatchup},
      });
    };
  };

  // clear item list and reset count to 0
  const handleClearItems = () => {
    setItemCount(0);
    setItemList([]);
  };

  // set addItem toggle to true to open the input modal 
  const openAddItemModal = () => {
    setIsAddItem(true);
  };

  return (
    <View style={styles.screen}>
      {/* as long as item count is less than 10, show the Add Item button
          if count is 10, remove button so no new items can be added */}
      <ItemInput
        visible={isAddItem} // prop for modal component for true/false element value
        onAddItem={handleEnteredItem}
        itemCount={itemCount}
        onCancel={handleCancelAddItem}
        itemList={itemList}
      />
      {/* if item list is empty, show the message below and remove clear button */}
      {itemList.length === 0 ? <View style={styles.emptyMessageBox}>
        <Text style={styles.emptyMessageText}>Add Items to get started!</Text>
      </View>
        :
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
      }
      <FAB
        style={styles.clearButton}
        onPress={() => handleClearItems()}
        color={Colors.darkGray}
        icon='delete-sweep'
      />
      {/* don't show compare button until there are at least 4 items in list */}
      <FAB
        style={styles.compareButton}
        onPress={() => createMatchups([])}
        label='Compare Items'
        visible={itemList.length < 4 ? false : true}
        color={Colors.darkGreen}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        visible={itemList.length < 10 ? true : false}
        onPress={openAddItemModal}
      />
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
  fab: {
    position: 'absolute',
    margin: 36,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.mainYellow,
  },
  compareButton: {
    position: 'absolute',
    bottom: 36,
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
  clearButton: {
    position: 'absolute',
    bottom: 36,
    left: 36,
    backgroundColor: Colors.liteGray,
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
  },
  emptyMessageBox: {
    flex: 1,
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.8,
    alignSelf: 'center',
    paddingVertical: 6,
    marginVertical: 12,
  },
  emptyMessageText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 36,
  },
}
);

export default AddItemsScreen;
;
