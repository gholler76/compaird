import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';

import Colors from '../../constants/colors/colors';

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
    width: Dimensions.get('window').width * 0.70,
    padding: 5,
    borderWidth: 2,
    borderColor: Colors.darkGreen,
    marginVertical: 6,
  },
  itemNumberBox: {
    width: Dimensions.get('window').width * 0.10,
    alignItems: 'center',
    backgroundColor: Colors.darkGreen,
    paddingVertical: 6,
    fontSize: 24,
    marginLeft: 16
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
