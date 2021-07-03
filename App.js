import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';

import ItemsNavigator from './navigation/ItemsNavigator';

// const fetchFonts = () => {
//   Font.loadAsync({
//     'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
//     'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
//   });
// };

const App = () => {
  // const [fontLoaded, setFontLoaded] = useState(false);

  // if (!fontLoaded) {
  //   return (
  //     <AppLoading
  //       startAsync={fetchFonts}
  //       onFinish={() => setFontLoaded(true)}
  //     />
  //   );
  // }

  return (
    <ItemsNavigator />
  );
};

export default App;