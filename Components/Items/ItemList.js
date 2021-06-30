import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

const ItemList = (props) => {

  return (
    <View style={styles.listContainer}>
      <View style={styles.itemNumberBox}>
        <Text style={styles.itemNumberText}> {props.itemNumber}</Text>
      </View>
      <View style={styles.listItem}>
        <Text >{props.item}</Text>
      </View >
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: 'white',
    width: '75%',
    borderColor: '#669933',
    borderWidth: 2,
    padding: 8,
    marginVertical: 6
  },
  itemNumberBox: {
    alignItems: 'center',
    width: '10%',
    backgroundColor: '#669933',
    paddingVertical: 4,
    fontSize: 24
  },
  itemNumberText: {
    fontWeight: '700',
    fontSize: 16,
    color: 'white'
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default ItemList;
