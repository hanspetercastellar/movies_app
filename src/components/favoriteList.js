import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableHighlight,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';
import MovieCard from './movie/movie';
import {useDispatch, useSelector} from 'react-redux';
import {
  favorites,
  loadingFavorite,
  getListFavorites,
} from '../redux/slices/movie.slice';
import {storageHelpers} from '../helpers/storage.helper';

const FavoriteList = ({navigation, data}) => {
  const dispatch = useDispatch();
  const favoritesStore = useSelector(favorites);
  const loading = useSelector(loadingFavorite);
  const [user_id, setUserID] = React.useState(false);
  const getData = () => {
    console.log('init favoritos');
    storageHelpers
      .getItem('auth')
      .then((res) => {
        if (res !== null) {
          const {user} = JSON.parse(res);
          console.log(user, 'desde favoritos');
          dispatch(getListFavorites(user.id_usuario));
          setUserID(user.id_usuario);
          console.log(user.id_usuario, 'idActual');
        }
      })
      .catch((e) => console.log(e, 'error desde favoritos'));
  };
  React.useLayoutEffect(() => {
    getData();
    console.log(favoritesStore, 'favorite stao');
  }, [navigation]);

  const renderItem = ({item}) => (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      key={item.id_movi}
      onPress={() =>
        navigation.navigate('Details', {
          id_movie: item.id_movi,
          nombre: item.nombre,
          imagen: item.imagen,
          duracion: item.duracion,
        })
      }>
      <MovieCard alto={150} data={item} />
    </TouchableHighlight>
  );
  return (
    <View style={styles.container}>
      <View style={{height: 300}}>
        {console.log(favoritesStore, 'aqui cacio')}
        <Text style={styles.titulo}>Lista De Favoritos</Text>
        {loading ? (
          <Text style={{color: 'white'}}>...Cargando Peliculas</Text>
        ) : favoritesStore.length ? (
          <FlatList
            horizontal
            data={favoritesStore}
            renderItem={renderItem}
            keyExtractor={(item, index) => item + '_' + index}
            SeparatorComponent={() => <View style={{width: 5}} />}
          />
        ) : (
          <Text style={{color: 'white'}}>Aun No tiene Favoritos</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titulo: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 18,
    color: '#ffffff',
    fontFamily: 'Lato',
    fontWeight: 'bold',
  },
});

export default FavoriteList;
