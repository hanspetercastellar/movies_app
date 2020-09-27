import React from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import MovieList from '../components/movieList';
import FavoriteList from '../components/favoriteList';
import {storageHelpers} from '../helpers/storage.helper';
import SearchInput from '../components/search/search';
const Separator = () => <View style={styles.separator} />;
export const SessionContext = React.createContext();

const Home = (props) => {
  const [userName, setUserName] = React.useState('Bienvenido');
  const [userSession, setUserSession] = React.useState({});
  const logout = () => {
    storageHelpers.getItem('auth').then((el) => console.log(el, 'esto'));
    storageHelpers.cleanSession().then(() => {
      props.navigation.replace('Login');
    });
  };
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: () => <Text style={{color: 'white'}}> {userName}</Text>,
      headerRight: () => (
        <Button onPress={() => logout()} title="Salir" color="rgb(219,0,0)" />
      ),
    });
    storageHelpers.getItem('auth').then((el) => {
      if (el !== null) {
        const {user} = JSON.parse(el);
        setUserSession(user);
        console.log(user, 'desde el usuario Home');
        setUserName('Bienvenido ' + user.nickname);
      }
    });
  }, [userName]);

  return (
    <SafeAreaView style={styles.container}>
      <SearchInput {...props} />
      <FavoriteList {...props} />
      <MovieList {...props} />
      <Separator />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default Home;
