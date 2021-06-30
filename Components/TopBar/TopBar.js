import React from 'react';
import {View, StyleSheet, Image} from 'react-native';


const TopBar = () => {

  return (
    <View style={styles.topBar}>
      <Image
        style={styles.wordmark}
        source={require('../../constants/images/Compaird_wordmark_32_DARK.png')}
      />
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  topBar: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#669933',
    marginBottom: 12
  },
  wordmark: {
    marginVertical: 2
  }
});