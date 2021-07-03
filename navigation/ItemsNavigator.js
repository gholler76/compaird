import React from 'react';
import {Image} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import ResultsScreen from '../screens/Results';
import CompareScreen from '../screens/CompareItems';
import AddItemsScreen from '../screens/AddItems';

import Colors from '../constants/colors/colors';

class Wordmark extends React.Component {
  render() {
    return (
      <Image
        source={require('../constants/images/Compaird_wordmark_32_DARK.png')}
      />
    );
  }
}

const ItemsNavigator = createStackNavigator(
  {
    AddItems: AddItemsScreen,
    CompareItems: CompareScreen,
    Results: ResultsScreen
  },
  {
    initialRouteName: 'AddItems',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.darkGreen,
        height: 96
      },
      headerTitle: () => <Wordmark />,
      headerTitleAlign: 'center'
    }
  }
);

export default createAppContainer(ItemsNavigator);