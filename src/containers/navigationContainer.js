import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet} from 'react-native';

import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screems/home';
import MovieDetail from '../screems/movieDetail';
import LoginScreem from '../screems/login';
import AsyncStorage from '@react-native-community/async-storage';
import {storageHelpers} from '../helpers/storage.helper';
import RegisterScreen from '../screems/register';
import BorderlessButton from '@react-navigation/stack/src/views/BorderlessButton';
import {Text, Button} from 'react-native-reanimated';

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

const NavigationS = () => {
  // const [isLoggedIn, setLoggedIn] = React.useState(false);
  //
  // React.useEffect(() => {
  //   const auth = storageHelpers.getItem('auth').then((el) => el);
  //   console.log(JSON.parse(auth));
  //   if (auth !== null) {
  //     setLoggedIn(true);
  //   }
  // }, []);

  return (
    <NavigationContainer theme={MyTheme}>
      {}
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={MovieDetail} />
        <Stack.Screen
          name="Login"
          component={LoginScreem}
          options={{title: 'Pelis App'}}
        />
        <Stack.Screen name={'Register'} component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationS;
