import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, ScrollView, View, TouchableOpacity, Dimensions} from 'react-native';

import Colors from '../constants/colors/colors';

const ResultsScreen = props => {
  const results = props.navigation.getParam('results');
  const matchupWinners = props.navigation.getParam('matchupWinners');
  const itemList = props.navigation.getParam('itemList');

  const [winnerId, setWinnerId] = useState('');
  const [sortedLosers, setSortedLosers] = useState([]);
  const [winner, setWinner] = useState('');

  useEffect(() => {
    results.sort((a, b) => {
      return b.score - a.score;
    });
    if (results[0].score == results[1].score) {
      const tiedItemsIndex = matchupWinners.findIndex(el => el.itemOne.id == results[0].id &&
        el.itemTwo.id == results[1].id);
      const tiebreaker = matchupWinners[tiedItemsIndex].winner;
      setWinnerId(tiebreaker);
    } else {
      setWinnerId(results[0].id);
    }
  }, []);

  useEffect(() => {
    const remainingItemsSorted = results.filter(el => el.id !== winnerId);
    setSortedLosers(remainingItemsSorted);
    const getWinnerValue = itemList.filter(el => el.id === winnerId)
      .map(el => {return el.value;});
    setWinner(getWinnerValue);
  }, [winnerId]);

  const goHome = () => {
    props.navigation.navigate('AddItems');
  };


  return (
    <View style={styles.screen}>
      <View style={styles.titleBox}>
        <Text style={styles.titleText}>WINNER</Text>
      </View>
      <View style={styles.winnerBox}>
        <Text style={styles.winnerText}>{winner}</Text>
      </View>
      <View style={styles.listBox}>
        <ScrollView>
          {sortedLosers.map((item, index) => {
            return (
              <Text style={styles.listText} key={item.id}>{index + 2}. {item.value}</Text>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.homeBox}>
        <TouchableOpacity style={styles.homeButton} onPress={() => goHome()}>
          <Text style={styles.buttonText}>HOME</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexDirection: 'column',
    backgroundColor: Colors.mainGreen,
    flex: 1,
    justifyContent: 'flex-start',
  },
  titleBox: {
    backgroundColor: Colors.darkGreen,
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.8,
    borderColor: 'white',
    borderWidth: 4,
    alignSelf: 'center',
    borderRadius: 10,
    paddingVertical: 6,
    marginVertical: 12,
    elevation: 12,
  },
  titleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 48,
  },
  winnerBox: {
    backgroundColor: Colors.darkYellow,
    width: Dimensions.get('window').width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderColor: 'white',
    borderWidth: 4,
    alignSelf: 'center',
    paddingVertical: 12,
    height: Dimensions.get('window').height * 0.25,
    elevation: 12,
  },
  winnerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  listBox: {
    backgroundColor: Colors.liteGray,
    width: Dimensions.get('window').width * 0.8,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 12,
    borderWidth: 4,
    borderColor: 'white',
    alignSelf: 'center',
    padding: 12,
    marginTop: 24,
    elevation: 12,
  },
  listText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.darkGray,
    lineHeight: 28,
  },
  homeBox: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  homeButton: {
    width: Dimensions.get('window').width * 0.8,
    backgroundColor: Colors.mainYellow,
    alignItems: 'center',
    padding: 4,
    borderRadius: 12,
    elevation: 12,
    alignSelf: 'center',
    marginBottom: 12,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'black',
  },
});

export default ResultsScreen;