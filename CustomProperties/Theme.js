import React from 'react';
import {DefaultTheme} from 'react-native-paper';

const theme = ({
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    mainGreen: {
      color: "#99CC66"
    },
    darkGreen: {
      color: "#669933"
    },
    liteGreen: {
      color: "#CCFF99"
    },
    mainYellow: {
      color: "#FFFF66"
    },
    darkYellow: {
      color: "#CCCC33"
    },
    liteYellow: {
      color: "#FFFF99"
    },
    mainGray: {
      color: "#808C80"
    },
    darkGray: {
      color: "#404C40"
    },
    liteGray: {
      color: "#C0CCC0"
    }
  }
});

export default theme;