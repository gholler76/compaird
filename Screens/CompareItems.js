import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import {FAB, IconButton} from 'react-native-paper';

import Slider from '@react-native-community/slider';

import Colors from '../constants/colors/colors';

const CompareScreen = props => {
  const itemList = props.navigation.getParam('itemList');
  const matchups = props.navigation.getParam('matchups');

  const lastMatchToggle = useRef(false); // indicates whether the last match has been rendered
  const lastMatch = lastMatchToggle.current;

  const [selectedId, setSelectedId] = useState(null); // track the item id selected by the user as the winner for each matchup
  const [gapValue, setGapValue] = useState(1); // track the gap value (1-5) chosen by the user for each matchup
  const [totalScore, setTotalScore] = useState(itemList); // track the score totals for each item for all matchups
  const [matchIndex, setMatchIndex] = useState(0); // set index for each matchup
  const [results, setResults] = useState(matchups); // map over matchups and populate the winner and score

  // takes selected item and gap value and updates result of the matchup, then sets up the next match
  const renderMatch = () => {
    // don't render match if a winner hasn't been selected
    if (!selectedId) {
      return alert("You must choose a winner for this matchup");
    } else {
      const updatedScore = totalScore.map(el => el.id === selectedId ? {...el, score: el.score + gapValue} : el);
      setTotalScore(updatedScore);

      const updatedResults = results.map(el => el.id === matchIndex + 1 ? {...el, winner: el.winner = selectedId, score: el.score = gapValue} : el);
      setResults(updatedResults);
    };
    // if current match is the final match, flip lastMatch toggle to true and don't try to render a new match
    if (matchIndex == matchups.length - 1) {
      lastMatchToggle.current = true;
    } else {
      setMatchIndex(matchIndex + 1);
      setSelectedId(null);
    };
  };

  // preserve the winner from the match if it's rerendered during back/next
  useEffect(() => {
    setSelectedId(results[matchIndex].winner);
  }, [matchIndex]);

  // send user to results screen after all matchups were decided and pass props for results, winners and full item list 
  const showResults = () => {
    props.navigation.navigate({
      routeName: 'Results',
      params: {results, totalScore, itemList}
    });
  };

  // move back through previous matchups and reset score for match so value doesn't duplicate
  const prevMatch = (index) => {
    // if starting from the last match, delete the last match score to keep the total correct
    if (lastMatch == true) {
      const lastMatchup = results[results.length - 1];
      setTotalScore(totalScore.map(el => el.id === lastMatchup.winner ? {...el, score: el.score -= lastMatchup.score} : el));
    }
    lastMatchToggle.current = false;
    setMatchIndex(prev => index);
    const thisMatch = results[index];
    setSelectedId(thisMatch.winner);
    // find the winner in the totalScore array and add the match score to that item's total
    setTotalScore(totalScore.map(el => el.id === thisMatch.winner ? {...el, score: el.score -= thisMatch.score} : el));
  };

  return (
    <View style={styles.screen}>
      <View style={styles.matchupBox}>
        <Text style={styles.matchupText}>Matchup {matchIndex + 1} of {matchups.length}</Text>
      </View>
      <View >
        <Text style={styles.headerText}>Pick a Winner</Text>
        <View style={styles.pickBox}>
          <View >
            <TouchableOpacity onPress={() => setSelectedId(results[matchIndex].itemOne.id)} style={[styles.item, {backgroundColor: results[matchIndex].itemOne.id === selectedId ? Colors.darkGreen : Colors.liteGray}]}>
              <Text style={{...styles.title, ...{color: results[matchIndex].itemOne.id === selectedId ? '#fff' : Colors.darkGray}}}>{results[matchIndex].itemOne.value}</Text>
            </TouchableOpacity>
          </View>
          <View >
            <TouchableOpacity onPress={() => setSelectedId(results[matchIndex].itemTwo.id)} style={[styles.item, {backgroundColor: results[matchIndex].itemTwo.id === selectedId ? Colors.darkGreen : Colors.liteGray}]}>
              <Text style={{...styles.title, ...{color: results[matchIndex].itemTwo.id === selectedId ? '#fff' : Colors.darkGray}}}>{results[matchIndex].itemTwo.value}</Text>
            </TouchableOpacity>
          </View>
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
            value={results[matchIndex].score}
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
      {/* show results button only when the lastMatch has been decided  */}
      <FAB
        style={styles.resultsButton}
        onPress={showResults}
        label="SHOW RESULTS"
        visible={lastMatch == true ? true : false}
        color={Colors.darkGreen}
      />
      {/* show the back button only when the rendered match isn't the first match */}
      <FAB
        style={styles.backButton}
        onPress={() => prevMatch(matchIndex - 1)}
        icon="arrow-left-bold"
        visible={matchIndex === 0 ? false : true}
      />
      {/* show next button until lastMatch has been decided */}
      <FAB
        style={styles.nextButton}
        onPress={renderMatch}
        icon="arrow-right-bold"
        visible={lastMatch == true ? false : true}
      />
    </View >
  );
};

const styles = StyleSheet.create({
  screen: {
    flexDirection: 'column',
    backgroundColor: Colors.mainGreen,
    flex: 1,
    justifyContent: 'flex-start',
  },
  matchupBox: {
    backgroundColor: Colors.darkGreen,
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.8,
    borderRadius: 50,
    alignSelf: 'center',
    paddingVertical: 12,
    elevation: 12,
    marginVertical: 16,
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
    marginVertical: 16,
  },
  pickBox: {
    width: Dimensions.get('window').width * 0.67,
    backgroundColor: 'white',
    elevation: 12,
    borderRadius: 12,
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 16,
  },
  item: {
    padding: 4,
    marginVertical: 6,
    width: Dimensions.get('window').width * 0.6,
    height: 44,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
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
  nextButton: {
    backgroundColor: Colors.mainYellow,
    position: 'absolute',
    bottom: 32,
    right: 32,
  },
  backButton: {
    backgroundColor: Colors.mainYellow,
    position: 'absolute',
    bottom: 32,
    left: 32,
  },
  resultsButton: {
    position: 'absolute',
    bottom: 32,
    backgroundColor: '#fff',
    alignSelf: 'center',
  },

});

export default CompareScreen;

