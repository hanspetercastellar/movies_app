import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  Dimensions,
  FlatList,
  ScrollView,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  filterStatus,
  getListMovies,
  searchMovies,
  setFilterStatus,
} from '../../redux/slices/movie.slice';

const SearchInput = () => {
  const dispatch = useDispatch();
  const [inputState, setInputState] = React.useState(false);
  const filter = useSelector(filterStatus);
  const handleChangeSearchin = (input) => {
    if (input.length !== 0) {
      dispatch(searchMovies(input));
    } else {
      console.log(typeof input, 'nada in inpu');
      dispatch(getListMovies);
      dispatch(setFilterStatus({input: null, results: null}));
    }
    console.log(input.length, 'input');
    setInputState(input);
  };
  React.useEffect(() => {
    {
      if (inputState == '' || inputState == null || inputState == false) {
        dispatch(getListMovies());
      }
    }
  }, [inputState]);
  return (
    <>
      <View style={styles.SectionStyle}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={(UserEmail) => handleChangeSearchin(UserEmail)}
          placeholder="Buscar Peli" //dummy@abc.com
          placeholderTextColor="#c1c1c1"
          autoCapitalize="none"
          keyboardType="default"
          returnKeyType="next"
          blurOnSubmit={false}
        />
      </View>
      <View>
        {filter.results !== null && (
          <Text style={{color: 'red'}}>
            Se Encontraron ( {filter.results} ) Resultados de Titulos con el
            nombre: {filter.input}
          </Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 60,
    marginTop: 20,
    margin: 10,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    height: 60,
    backgroundColor: '#303030',
    borderRadius: 5,
  },

  buttonStyle: {
    borderWidth: 1,
    color: '#FFFFFF',
    borderColor: '#564d4d',
    height: 40,
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 5,
    flex: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },

  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
});

export default SearchInput;
