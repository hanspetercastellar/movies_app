/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Home from './src/screems/home';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MovieDetail from './src/screems/movieDetail';
import LoginScreem from './src/screems/login';
import NavigationS from './src/containers/navigationContainer';

const Stack = createStackNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(10,0,0)',
    card: 'rgb(10,0,0)',
    text: 'rgb(219,0,0)',
  },
};
const App = () => {
  return (
    <Provider store={store}>
      <NavigationS />

      {/*<StatusBar barStyle="dark-content" />*/}
      {/*<SafeAreaView>*/}
      {/*  <ScrollView*/}
      {/*    contentInsetAdjustmentBehavior="automatic"*/}
      {/*    style={styles.scrollView}>*/}

      {/*   <MovieList></MovieList>*/}
      {/*  </ScrollView>*/}
      {/*</SafeAreaView>*/}
    </Provider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
