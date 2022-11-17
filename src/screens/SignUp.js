import React, {useState} from 'react';
import {View, Text, TextInput, Alert, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';
import MyButton from '../componentes/MyButton';

// import { Container } from './styles';

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const cadastrar = () => {
    if (email !== '' && password !== '' && passwordConfirm !== '') {
      if (password.length > 5) {
        if (password === passwordConfirm) {
          auth()
            .createUserWithEmailAndPassword(email, password)
            .then(res => {
              Alert.alert('Informação', 'Usuário cadastro com sucesso.');
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'Preload'}],
                }),
              );
            })
            .catch(error => {
              if (error.code === 'auth/email-already-in-use') {
                console.log('Email em uso!');
              }

              if (error.code === 'auth/invalid-email') {
                console.log('Email inválido!');
              }
            });
        } else {
          Alert.alert('Validação', 'As senhas precisam ser iguais.');
        }
      } else {
        Alert.alert('Validação', 'A senha precisa ter 6 ou mais caracteres.');
      }
    } else {
      Alert.alert('Erro', 'Por favor, digite email e senha.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>SignUp</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        returnKeyType="next"
        onChangeText={t => setEmail(t)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setPassword(t)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar senha"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setPasswordConfirm(t)}
      />
      <MyButton
        texto="Cadastrar"
        onClick={() => {
          console.log('teste');
          cadastrar();
        }}
      />
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    width: '95%',
    height: 50,
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    fontSize: 16,
    paddingLeft: 2,
    paddingBottom: 1,
    marginTop: 10,
  },
});
