import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import ResultsScreen from '../screens/Results';
import CompareScreen from '../screens/CompareItems';
import AddItemsScreen from '../screens/AddItems';

const ItemsNavigator = createStackNavigator({
  AddItems: AddItemsScreen,
  CompareItems: CompareScreen,
  Results: ResultsScreen
},
  {
    initialRouteName: 'AddItems'
  });

export default createAppContainer(ItemsNavigator);