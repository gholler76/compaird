import React, {useState} from 'react';
import {StyleSheet, View, TextInput, Button, Modal} from 'react-native';

const ItemInput = (props) => {
  const [enteredItem, setEnteredItem] = useState('');

  const handleInputChange = (enteredItem) => {
    setEnteredItem(enteredItem);
  };

  return (
    <Modal visible={props.visible}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Item Here"
          style={styles.input}
          onChangeText={handleInputChange}
          value={enteredItem}
        />
        <Button title="Add" onPress={props.onAddItem.bind(this, enteredItem)} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    width: '90%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 8,
    fontSize: 16,
    borderRadius: 10,
    fontWeight: 'bold'
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
});

export default ItemInput;