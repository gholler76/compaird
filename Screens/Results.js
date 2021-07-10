import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, ScrollView, View, TouchableOpacity} from 'react-native';

import Colors from '../constants/colors/colors';

const ResultsScreen = props => {
  const results = props.navigation.getParam('results');

  const [remainder, setRemainder] = useState([]);
  useEffect(() => {
    results.sort((a, b) => {
      return b.score - a.score;
    });
    console.log('****sorted results****');
    console.log(results);

    setRemainder(results.slice(1));

    console.log('****remainder****');
    console.log(remainder);
  }, []);


  const goHome = () => {
    props.navigation.navigate('AddItems');
  };


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
          {remainder.map((item, index) => {
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
    backgroundColor: Colors.liteGray,
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
    color: Colors.darkGray,
    lineHeight: 28,
  },
  homeBox: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  homeButton: {
    width: '80%',
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

