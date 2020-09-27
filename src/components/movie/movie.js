import React from 'react';
import {Text, View, Image, Button, StyleSheet} from 'react-native';

const MovieCard = ({data, alto, navigation}) => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={{width: 120, height: alto || 200}}
          borderRadius={5}
          source={{uri: data.imagen}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 4,
    borderRadius: 5,
    marginBottom: 50,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  footer: {
    backgroundColor: 'red',
    height: 10,
    flex: 1,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
export default MovieCard;
