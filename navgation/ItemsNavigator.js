import {createAppContainer} from 'react-navigation';
import createStackNavigator from 'react-navigation-stack';
import ResultsScreen from './Screens/Results';
import CompareScreen from './Screens/CompareItems';
import AddItemsScreen from './Screens/AddItems';

const ItemsNavigator = createStackNavigator({
  AddItems: AddItemsScreen,
  CompareItems: CompareScreen,
  Results: ResultsScreen

});

export default createAppContainer(ItemsNavigator);