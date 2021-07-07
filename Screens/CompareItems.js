import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';

import Slider from '@react-native-community/slider';

import Colors from '../constants/colors/colors';

const Item = ({item, onPress, backgroundColor, textColor}) => (
  <View style={styles.itemBox}>
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.value}</Text>
    </TouchableOpacity>
  </View>
);

const CompareScreen = props => {
  const itemList = props.navigation.getParam('itemList');
  console.log('****ITEMLIST****');
  console.log(itemList);
  const matchups = props.navigation.getParam('matchups');
  console.log('****MATCHUPS****');
  console.log(matchups.length);
  console.log(matchups);
  const firstMatchup = props.navigation.getParam('firstMatchup');

  const [gapValue, setGapValue] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [results, setResults] = useState([]);
  const [matchIndex, setMatchIndex] = useState(0);
  const [match, setMatch] = useState(firstMatchup);
  const [topScore, setTopScore] = useState('');


  function renderMatch() {
    if (matchIndex > matchups.length) {
      return null;
    } else {
      let thisMatch = matchups[matchIndex + 1];
      setMatch([thisMatch.itemOne, thisMatch.itemTwo]);
    };
  };

  function updateIndex() {
    setMatchIndex(matchIndex + 1);
  }

  function resetSelectedId() {
    setSelectedId(null);
  }
  console.log('****thisMatch****');
  console.log(match);
  console.log(matchIndex);


  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? Colors.darkGreen : Colors.liteGray;
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
      />
    );
  };

  return (
    <View style={styles.screen}>
      <View >
        <Text style={styles.headerText}>Pick a Winner</Text>
        <View style={styles.pickBox}>
          <FlatList
            data={match}
            renderItem={renderItem}
            extraData={selectedId}
          />
        </View>
      </View>
      <View >
        <Text style={styles.headerText}>How Far Apart Are They?</Text>
        <View style={styles.gapBox}>
          <Slider
            style={{width: '80%', height: 54}}
            minimumValue={1}
            maximumValue={5}
            onValueChange={(value) => setGapValue(value)}
            step={2}
            value={1}
            thumbTintColor={Colors.mainYellow}
            minimumTrackTintColor={Colors.mainGreen}
            maximumTrackTintColor={Colors.darkGreen}
          />
          <Text style={styles.gapText}>
            {gapValue === 1 ? 'NOT FAR' : gapValue === 5 ? "VERY FAR" : "FAR"}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => {renderMatch(), updateIndex(), resetSelectedId();}}>
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
  item: {
    padding: 12,
    marginVertical: 12,
    width: '100%',
  },
  itemBox: {
    flex: 1,
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12
  },
  gapText: {
    fontSize: 48,
    fontWeight: '700',
    textAlign: 'center',
    color: 'white'
  },
  pickBox: {
    width: '67%',
    backgroundColor: 'white',
    elevation: 12,
    borderRadius: 12,
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 12,
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

