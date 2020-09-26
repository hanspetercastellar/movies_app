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
import {fetching, getListMovies, movies} from '../redux/slices/movie.slice';


const FavoriteList = ({navigation, data}) => {
    const dispatch = useDispatch()
    const moviesStore = useSelector(movies)
    const loading = useSelector(fetching)
    const getData = () => {
        dispatch(getListMovies())
    }
    React.useEffect(()=>{
        getData()
        console.log(moviesStore)
    },[dispatch])


    const renderItem = ({item}) => (
        <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() =>
                navigation.navigate('Details', {
                    detalle: item.MoviDetail,
                    titulo: item.nombre,
                    imagen: item.imagen,
                    duracion: item.duracion,
                })
            }>
            <MovieCard data={item} />
        </TouchableHighlight>
    );
    return (
        <View style={styles.container}>
            <View style={{height: 300}}>
                <Text style={styles.titulo}>Lista De Peliculas</Text>
                {loading ? <Text style={{color:'white'}}>...Cargando Peliculas</Text> : (
                    <FlatList
                        horizontal
                        data={moviesStore}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id_movi}
                        SeparatorComponent={() => <View style={{width: 5}} />}
                    />
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
        color:'#ffffff',
        fontFamily: 'Lato',
        fontWeight: 'bold',
    },
});

export default FavoriteList;