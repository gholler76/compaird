import React, {useEffect} from 'react';
import {StyleSheet, Text, ScrollView, View} from 'react-native';

import Colors from '../constants/colors/colors';

const ResultsScreen = props => {
  const results = props.navigation.getParam('results');

  useEffect(() => {
    results.sort((a, b) => {
      return b.score - a.score;
    });
    console.log('****sorted results****');
    console.log(results);
  }, []);

  const remainder = results.slice(1);

  console.log('****remainder****');
  console.log(remainder);


  return (
    <View style={styles.screen}>
      <View style={styles.titleBox}>
        <Text style={styles.titleText}>WINNER</Text>
      </View>
      <View style={styles.winnerBox}>
        <Text style={styles.winnerText}>{results[0].value}</Text>
      </View>
      <View style={styles.listBox}>
        <ScrollView>
          {remainder.map((item) => {
            return (
              <Text style={styles.listText} key={item.id}>{item.value}</Text>
            );
          })}
        </ScrollView>
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
    width: '80%',
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
    backgroundColor: Colors.mainYellow,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderColor: Colors.darkGreen,
    borderWidth: 4,
    alignSelf: 'center',
    paddingVertical: 12,
    height: '25%',
    elevation: 12,
  },
  winnerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  listBox: {
    backgroundColor: Colors.darkGreen,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 12,
    alignSelf: 'center',
    padding: 12,
    marginTop: 24,
    elevation: 12,
  },
  listText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ResultsScreen;

