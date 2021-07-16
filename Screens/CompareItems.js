import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions} from 'react-native';
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
  const [matchupWinners, setMatchupWinners] = useState(matchups);

  const renderMatch = () => {
    if (!selectedId) {
      return alert("You must choose a winner for this matchup");
    } else {
      const updatedResults = results.map(el => el.id === selectedId ? {...el, score: el.score + gapValue} : el);
      setResults(updatedResults);

      const updatedWinners = matchupWinners.map(el => el.id === matchIndex + 1 ? {...el, winner: selectedId} : el);
      setMatchupWinners(updatedWinners);
    }

    if (matchIndex == matchups.length - 1) {
      return;
    } else {
      const nextMatch = matchups[matchIndex + 1];
      setMatch([nextMatch.itemOne, nextMatch.itemTwo]);
      setMatchIndex(matchIndex + 1);
      setSelectedId(null);
    };
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
      params: {results, matchupWinners, itemList}
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
      {matchupWinners[matchups.length - 1].winner ?
        <TouchableOpacity
          style={styles.resultsButton} onPress={() => showResults()}>
          <Text style={styles.resultsButtonText}>SHOW RESULTS</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity
          style={styles.submitButton} onPress={() => renderMatch()}>
          <Text style={styles.submitButtonText}>SUBMIT</Text>
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
    width: Dimensions.get('window').width * 1.0,
  },
  itemBox: {
    flex: 1,
    flexDirection: 'row',
    width: Dimensions.get('window').width * 0.9,
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
    width: Dimensions.get('window').width * 0.8,
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
    width: Dimensions.get('window').width * 0.67,
    backgroundColor: 'white',
    elevation: 12,
    borderRadius: 12,
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    justifyContent: 'space-between'
  },
  gapBox: {
    width: Dimensions.get('window').width * 0.67,
    backgroundColor: Colors.darkGray,
    elevation: 12,
    borderRadius: 12,
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    justifyContent: 'space-between'
  },
  itemButton: {
    width: Dimensions.get('window').width * 0.8,
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
    width: Dimensions.get('window').width * 0.8,
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
  resultsButton: {
    width: Dimensions.get('window').width * 0.8,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 4,
    borderRadius: 12,
    elevation: 12,
    alignSelf: 'center',
    marginVertical: 18,
  },
  resultsButtonText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: Colors.darkGreen,
  },

});

export default CompareScreen;

