import React, {} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import Slider from '@react-native-community/slider';

import Colors from '../constants/colors/colors';

const CompareScreen = props => {
  const;
  return (
    <View style={styles.screen}>
      <View >
        <Text style={styles.headerText}>Pick a Winner</Text>
        <View style={styles.pickBox}>
          <TouchableOpacity style={styles.itemButton}>
            <Text style={styles.itemButtonText}>ITEM 1</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>OR</Text>
          <TouchableOpacity style={styles.itemButton}>
            <Text style={styles.itemButtonText}>ITEM 2</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View >
        <Text style={styles.headerText}>How Far Apart Are They?</Text>
        <View style={styles.gapBox}>
          <Slider
            style={{width: '80%', height: 54}}
            minimumValue={1}
            maximumValue={3}
            onValueChange={() => {}}
            step={1}
            value={1}
            thumbTintColor={Colors.mainYellow}
            minimumTrackTintColor={Colors.mainGreen}
            maximumTrackTintColor={Colors.darkGreen}
          />

          {/* <TouchableOpacity style={styles.itemButton}>
            <Text style={styles.itemButtonText}>ITEM 1</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>OR</Text>
          <TouchableOpacity style={styles.itemButton}>
            <Text style={styles.itemButtonText}>ITEM 2</Text>
          </TouchableOpacity> */}
        </View>
      </View>
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>SEE RESULTS</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingTop: 36,
    flexDirection: 'column',
    backgroundColor: Colors.mainGreen,
    flex: 1,
    justifyContent: 'space-around',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12
  },
  pickBox: {
    width: '67%',
    backgroundColor: 'white',
    elevation: 12,
    borderRadius: 12,
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    justifyContent: 'space-between'
  },
  gapBox: {
    width: '67%',
    backgroundColor: Colors.darkGray,
    elevation: 12,
    borderRadius: 12,
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    justifyContent: 'space-between'
  },
  itemButton: {
    width: '80%',
    backgroundColor: Colors.darkGreen,
    alignItems: 'center',
    padding: 4,
    borderRadius: 12,
    elevation: 12,
    alignSelf: 'center',
  },
  itemButtonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white'
  },
  submitButton: {
    width: '80%',
    backgroundColor: Colors.mainYellow,
    alignItems: 'center',
    padding: 4,
    borderRadius: 12,
    elevation: 12,
    alignSelf: 'center',
    marginVertical: 18,
  },
  submitButtonText: {
    fontWeight: 'bold',
    fontSize: 24,
  },

});

export default CompareScreen;
