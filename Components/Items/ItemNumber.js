import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const ItemNumber = (props) => {

  return (
    <View style={styles.itemNumber}>
      <Text>{props.index}</Text>
    </View>
  );
};

const styles = StyleSheet.create({

});

export default ItemNumber;
