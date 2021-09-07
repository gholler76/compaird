import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, Modal, Dimensions } from 'react-native';
import { FAB } from 'react-native-paper';

import Colors from '../../constants/colors/colors';

const ItemInput = (props) => {
  const [enteredItem, setEnteredItem] = useState(''); // track the contents of the item input field
  const itemList = props.itemList;

  // update item value with each change to the input
  const handleInputChange = (enteredItem) => {
    setEnteredItem(enteredItem);
  };

  // do not allow blank input or duplicate value to be entered, otherwise, add item to list and reset item input to empty string
  const handleAddItem = () => {
    const dup = itemList.some(item => item.value === enteredItem);
    enteredItem.length < 1 ? alert("Item field cannot be empty.") :
      enteredItem.length > 20 ? alert("Item cannot exceed 20 characters.") :
        dup ? alert("Item has already been entered") :
          props.onAddItem(enteredItem);
    setEnteredItem('');
  };

  // cancel item input and reset to empty string
  const handleCancel = () => {
    props.onCancel();
    setEnteredItem('');
  };

  return (
    <Modal
      visible={props.visible}
      animationType='fade'
      transparent={true}
    >
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Add Item to Your List</Text>
        <Text style={styles.itemCount}>{props.itemCount + 1} of 10</Text>
        <TextInput
          autoFocus={true}
          style={styles.input}
          onChangeText={handleInputChange}
          value={enteredItem}
          maxLength={20}
        />
        <Text style={styles.charCount}>{20 - enteredItem.length} characters remaining</Text>
        {props.itemCount < 4 ? <Text style={styles.itemCount}>You need {4 - props.itemCount} more {props.itemCount === 3 ? "item" : "items"} to begin comparing</Text> : null}
        <FAB
          style={styles.addButton}
          icon="plus"
          label='Add item'
          onPress={handleAddItem}
          color={'#000'}
        />
        <FAB
          style={styles.cancelButton}
          icon="close"
          small
          onPress={handleCancel}
          color={'#fff'}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width * 0.75,
    padding: 8,
    marginBottom: 4,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  charCount: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 12,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#000000bf',
  },
  inputTitle: {
    marginVertical: 12,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24
  },
  itemCount: {
    marginBottom: 12,
    color: '#ffff99',
    fontWeight: 'bold',
    fontSize: 18,
  },
  addButton: {
    position: 'absolute',
    margin: 64,
    bottom: 0,
    backgroundColor: Colors.mainYellow,
  },
  cancelButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 24
  }
});

export default ItemInput;