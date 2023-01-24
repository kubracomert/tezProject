/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
//import 'react-native-gesture-handler';

import React from 'react';
//import { NavigationContainer } from '@react-navigation/native';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';


import Root from './src/Root';


const App: () => React$Node = () => {
  
  return (
    <>
    <View style={{flex:1}}>
        <Root/>
    </View>
    </> 
  )
};

export default App;
