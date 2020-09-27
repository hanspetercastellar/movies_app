import React from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  Image,
} from 'react-native';
import Bar from '../components/bar/bar';
import {storageHelpers} from '../helpers/storage.helper';
import {favoritos, movies} from '../helpers/requests';
import {getListFavorites} from '../redux/slices/movie.slice';
import {useDispatch} from 'react-redux';

const MovieDetail = ({route, navigation}) => {
  const [loading, setLoading] = React.useState(false);
  const [state, setState] = React.useState({});
  const {id_movie, imagen, nombre, duracion} = route.params;
  const dispatch = useDispatch();
  const handleTofavoriteClick = () => {
    storageHelpers
      .getItem('auth')
      .then((data) => data)
      .then((data) => {
        if (data !== null) {
          const {user} = JSON.parse(data);
          console.log(user);
          favoritos.post(user.id_usuario, id_movie).then((res) => {
            if (res.success) {
              alert('Has Agregado Esta Peli a Tus Favoritos');
              dispatch(getListFavorites(user.id_usuario));
            } else {
              if (res.message == 'Ya esta Peli se Encuentra en tus Favoritos') {
                alert('Ups! ' + res.message);
              }
            }
          });
        } else {
          console.log(data, 'error en la data');
        }
      });
  };

  React.useEffect(() => {
    console.log(id_movie);
    setLoading(true);
    movies.getDetail(id_movie).then((res) => {
      setState(res.data);
      console.log(res);
      setLoading(false);
    });
  }, [id_movie]);
  return (
    <SafeAreaView>
      {loading ? (
        <Text style={{color: 'white'}}>...Cargando Detalle</Text>
      ) : (
        <View style={{marginHorizontal: 20}}>
          <Text
            style={{
              marginVertical: 10,
              color: 'white',
              fontSize: 24,
              fontWeight: 'bold',
            }}>
            {nombre || 'sfsd'}
          </Text>
          <View
            style={{
              flex: 2,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Image
              style={{
                width: 150,
                height: 250,
                resizeMode: 'contain',
                justifyContent: 'space-around',
              }}
              source={{uri: imagen}}
            />
            <View>
              <View
                style={{
                  height: 250,
                  justifyContent: 'space-between',
                  marginLeft: 10,
                }}>
                <Text style={{marginVertical: 10, color: 'white'}}>
                  Fecha:{' '}
                  <Text style={{marginHorizontal: 30, color: 'white'}}>
                    {state.fecha}
                  </Text>{' '}
                </Text>
                <Text>Duracion: {duracion} </Text>

                <View style={{marginVertical: 10, width: 220}}>
                  <Text style={{fontWeight: 'bold', color: 'white'}}>
                    Reparto:
                  </Text>
                  <Text style={{color: 'white'}}>{state.reparto}</Text>
                </View>
                <View style={{marginVertical: 10, color: 'white'}}>
                  <Text style={{fontWeight: 'bold', color: 'white'}}>
                    Director:
                  </Text>
                  <Text style={{color: 'white'}}>{state.director}</Text>
                </View>
              </View>
            </View>
          </View>
          <Text
            style={{
              marginTop: 260,
              fontSize: 18,
              fontWeight: 'bold',
              color: 'white',
            }}>
            Descripcion:
          </Text>
          <Text style={{width: 390, marginVertical: 20, color: 'white'}}>
            {state.descripcion}
          </Text>
          <Button
            style={{marginTop: 20}}
            onPress={() => handleTofavoriteClick()}
            title="Favorito"
            color="#f194ff"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 2,
    flexDirection: 'column',
  },
});

export default MovieDetail;
