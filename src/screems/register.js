import React, {useState} from 'react';

//Import all required component
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {user} from '../helpers/requests';

const RegisterScreen = (props) => {
  let [userName, setUserName] = useState('');
  let [userEmail, setUserEmail] = useState('');
  let [password, setPassword] = useState('');
  let [repeatPasswprd, setRepeatPassword] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');
  let [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  const handleSubmit = () => {
    if (!userName) {
      alert('Ingrese el Nombre de Usuario');
      return;
    }
    if (!userEmail) {
      alert('Ingrese un Correo Electronico');
      return;
    }
    if (!password) {
      alert('Ingrese el Contraseña');
      return;
    }
    if (!repeatPasswprd) {
      alert('Debe repetir la contraseña');
      return;
    }
    if (password !== repeatPasswprd) {
      alert('Las Contraseñas no Coinciden');
      return;
    }
    const dataTosend = {
      nickname: userName,
      email: userEmail,
      password: password,
    };
    setLoading(true);
    user.post(dataTosend).then((res) => {
      if (res.success) {
        setLoading(false);
        alert(res.message);
        setUserName('');
        setUserEmail('');
        setPassword('');
        setRepeatPassword('');
      }
    });
  };
  if (isRegistraionSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#307ecc',
          justifyContent: 'center',
        }}>
        {/*<Image*/}
        {/*  source={require('../Image/success.png')}*/}
        {/*  style={{height: 150, resizeMode: 'contain', alignSelf: 'center'}}*/}
        {/*/>*/}
        <Text style={styles.successTextStyle}>Registration Successful.</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonTextStyle}>Login Now</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{alignItems: 'center', marginTop: 50}}>
          <Text style={styles.titleLogin}>Registrar Usuario</Text>
        </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(userName) => setUserName(userName)}
              placeholder="Nombre de Usuario" //dummy@abc.com
              placeholderTextColor="#c1c1c1"
              autoCapitalize="none"
              keyboardType="default"
              maxLength={50}
              returnKeyType="next"
              blurOnSubmit={false}
            />
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
              maxLength={40}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(password) => setPassword(password)}
              placeholder="Contraseña" //dummy@abc.com
              placeholderTextColor="#c1c1c1"
              autoCapitalize="none"
              returnKeyType="next"
              maxLength={64}
              secureTextEntry={true}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(password) => setRepeatPassword(password)}
              placeholder="Repita la Contraseña" //dummy@abc.com
              placeholderTextColor="#c1c1c1"
              autoCapitalize="none"
              returnKeyType="next"
              maxLength={64}
              secureTextEntry={true}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            {loading ? (
              <Text>...Cargando</Text>
            ) : (
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={() => handleSubmit()}>
                <Text style={styles.buttonTextStyle}>Enviar</Text>
              </TouchableOpacity>
            )}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    borderWidth: 1,
    color: '#FFFFFF',
    borderColor: '#E50914',
    height: 40,
    alignItems: 'center',
    borderRadius: 3,
    marginLeft: 3,
    marginRight: 3,
    backgroundColor: '#E50914',
    marginTop: 5,
    flex: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  titleLogin: {
    color: '#E50914',
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderColor: '#c1c1c1',
    borderWidth: 1,
    height: 50,
    borderRadius: 5,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});
