/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * 
 * 
 * react-native run-android
 * react-native link react-native-vector-icons
 */


import Home from './src/components/screens/Home';
import Repository from './src/components/screens/Repository'

import { createStackNavigator } from 'react-navigation';


export default createStackNavigator({
  Home: {
    screen: Home
  },
  Repository: Repository,
});
