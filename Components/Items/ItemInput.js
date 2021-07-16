import React, {useState} from 'react';
import {StyleSheet, View, TextInput, Text, Button, Modal, TouchableOpacity, Dimensions} from 'react-native';

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
        <Text style={styles.inputTitle}>Add Item to Compare</Text>
        <Text style={styles.itemCount}>{props.itemCount + 1} of 10</Text>
        <TextInput
          autoFocus={true}
          style={styles.input}
          onChangeText={handleInputChange}
          value={enteredItem}
        />
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleCancel}>
          <Text style={styles.buttonText}>CANCEL</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddItem}>
          <Text style={styles.buttonText}>ADD ITEM</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width * 0.75,
    padding: 8,
    marginBottom: 12,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
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
    backgroundColor: '#ffff66',
    alignItems: 'center',
    padding: 4,
    width: Dimensions.get('window').width * 0.50,
    marginBottom: 12,
    borderRadius: 12
  },
  cancelButton: {
    backgroundColor: '#c0ccc0',
    alignItems: 'center',
    padding: 4,
    width: Dimensions.get('window').width * 0.50,
    marginBottom: 12,
    borderRadius: 12
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 24
  }
});

export default ItemInput;