import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {IconButton} from 'react-native-paper';

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
  const matchups = props.navigation.getParam('matchups');
  const firstMatchup = props.navigation.getParam('firstMatchup');

  const [gapValue, setGapValue] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [results, setResults] = useState(itemList);
  const [matchIndex, setMatchIndex] = useState(0);
  const [match, setMatch] = useState(firstMatchup);

  const renderMatch = () => {
    const updatedResults = results.map(el => el.id === selectedId ? {...el, score: el.score + gapValue} : el);
    setResults(updatedResults);

    let nextMatch = matchups[matchIndex + 1];
    setMatch([nextMatch.itemOne, nextMatch.itemTwo]);
    setMatchIndex(matchIndex + 1);
    setSelectedId(null);
    setGapValue(1);
  };

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

  const showResults = () => {
    props.navigation.navigate({
      routeName: 'Results',
      params: {results}
    });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.matchupBox}>
        <Text style={styles.matchupText}>Matchup {matchIndex + 1} of {matchups.length}</Text>
      </View>
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
        <Text style={styles.headerText}>How Wide is the Gap?</Text>
        <View style={styles.gapBox}>
          <Slider
            style={{width: '80%', height: 54}}
            minimumValue={1}
            maximumValue={5}
            onValueChange={(value) => setGapValue(value)}
            step={1}
            value={1}
            thumbTintColor={Colors.mainYellow}
            minimumTrackTintColor={Colors.mainGreen}
            maximumTrackTintColor={Colors.darkGreen}
          />
          <View style={styles.gapScale}>
            <Text style={styles.gapText}>
              Small
            </Text>
            <IconButton
              icon="chevron-left"
              color={Colors.mainYellow}
              size={24}
            />
            <IconButton
              icon="chevron-right"
              color={Colors.mainYellow}
              size={24}
            />
            <Text style={styles.gapText}>
              Large
            </Text>
          </View>
        </View>
      </View>
      {matchIndex == matchups.length - 1 && selectedId != null ?
        <TouchableOpacity
          style={styles.submitButton} onPress={() => showResults()}>
          <Text style={styles.submitButtonText}>SHOW RESULTS</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity
          style={styles.submitButton} onPress={() => renderMatch()}>
          <Text style={styles.submitButtonText}>NEXT MATCHUP</Text>
        </TouchableOpacity>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexDirection: 'column',
    backgroundColor: Colors.mainGreen,
    flex: 1,
    justifyContent: 'space-around',
  },
  item: {
    padding: 6,
    marginVertical: 6,
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
  matchupBox: {
    backgroundColor: Colors.darkGreen,
    alignItems: 'center',
    width: '80%',
    borderRadius: 50,
    alignSelf: 'center',
    paddingVertical: 12,
    elevation: 12,
  },
  matchupText: {
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
    color: 'white',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12
  },
  gapText: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: 'white'
  },
  gapScale: {
    alignItems: 'center',
    flexDirection: 'row',
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

