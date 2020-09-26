
import React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


import MovieList from '../components/movieList';
import FavoriteList from '../components/favoriteList';
const Separator = () => (
    <View style={styles.separator} />
);

const Home = (props) => {
    return (
        <SafeAreaView style={styles.container}>
                <MovieList {...props}></MovieList>
                <FavoriteList {...props}></FavoriteList>
            <Separator />
        </SafeAreaView>
    );
}

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
