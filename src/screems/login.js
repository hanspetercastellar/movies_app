import React, {useState} from 'react';
import {
  StyleSheet,
  Button,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  Text,
  TextInput,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  error,
  fetching,
  fetchingAuth,
  setError,
  requestAuth,
  user,
} from '../redux/slices/auth.slice';
import {storageHelpers} from '../helpers/storage.helper';
import {uri} from '../helpers/requests';

const LoginScreem = (props) => {
  const [value, onChangeText] = useState('Useless Placeholder');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const errorStatus = useSelector(error);
  const load = useSelector(fetching);
  const dispatch = useDispatch();
  const userSession = useSelector(user);
  const handleSubmit = () => {
    if (!userEmail) {
      alert('Ingrese el Email');
      return;
    }
    if (!userPassword) {
      alert('Ingrese la Contraseña');
      return;
    }
    var dataToSend = {user_email: userEmail, user_password: userPassword};
    console.log(dataToSend);
    dispatch(fetchingAuth());
    fetch(`${uri}/api/auth/login`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((res) => {
        switch (res.status) {
          case 200:
            console.log(res, 'respuesta del login');
            dispatch(requestAuth(res));
            storageHelpers
              .setItem('auth', res)
              .then((r) => console.log(r, 'setiando storage auth'))
              .catch((err) =>
                console.log(err, 'ocurrio un problema al crear storage auth'),
              );

            props.navigation.replace('Home');
            break;
          case 404:
            dispatch(
              setError({
                status: true,
                message: 'El Usuario No se Encuentra Registrado',
              }),
            );
        }
      })
      .catch((err) => console.log(err, 'eruuuror'));
  };
  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{marginTop: 100}}>
          <KeyboardAvoidingView enabled>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.titleLogin}>Login</Text>
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                placeholder="Email" //dummy@abc.com
                placeholderTextColor="#c1c1c1"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(password) => setUserPassword(password)}
                placeholder="Password" //dummy@abc.com
                placeholderTextColor="#c1c1c1"
                autoCapitalize="none"
                returnKeyType="next"
                secureTextEntry={true}
                blurOnSubmit={false}
              />
            </View>
            {errorStatus.status && (
              <View
                style={{flexDirection: 'row', marginRight: 35, marginLeft: 35}}>
                <Text style={{color: 'red', paddingHorizontal: 10}}>
                  {errorStatus.message}
                </Text>
              </View>
            )}
            <View style={styles.SectionStyle}>
              {load ? (
                <Text style={{color: 'red'}}>...Ingresando</Text>
              ) : (
                <TouchableOpacity
                  style={styles.buttonStyle}
                  activeOpacity={0.5}
                  onPress={() => handleSubmit()}>
                  <Text style={styles.buttonTextStyle}>LOGIN</Text>
                </TouchableOpacity>
              )}
            </View>
            <Text
              style={styles.registerTextStyle}
              onPress={() => props.navigation.navigate('Register')}>
              Nuevo aqui ? Registrate
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 60,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
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
  titleLogin: {
    color: '#E50914',
    fontSize: 24,
    fontWeight: 'bold',
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
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
});

export default LoginScreem;
