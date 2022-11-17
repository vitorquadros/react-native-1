import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, Alert} from 'react-native';
import MyButton from '../componentes/MyButton';
import auth from '@react-native-firebase/auth';

// import { Container } from './styles';

const RecuperarSenha = ({navigation}) => {
  const [email, setEmail] = useState('');

  const recuperarSenha = () => {
    if (email !== '') {
      auth()
        .sendPasswordResetEmail(email)
        .then(r => {
          Alert.alert(
            'Atenção',
            'Um email de recuperação foi enviado para: ' + email,
            [{text: 'OK', onPress: () => navigation.goBack()}],
          );
        })
        .catch(error => {
          console.log('ForgotPassword: ' + error);
          switch (error.code) {
            case 'auth/user-not-found':
              Alert.alert('Erro', 'Usuário não cadastrado.');
              break;
            case 'auth/invalid-email':
              Alert.alert('Erro', 'Email inválido.');
              break;
            case 'auth/user-disabled':
              Alert.alert('Erro', 'Usuário desabilitado.');
              break;
          }
        });
    } else {
      Alert.alert('Atenção', 'Preencha o email.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        returnKeyType="next"
        onChangeText={t => setEmail(t)}
      />
      <MyButton texto="Recuperar senha" onClick={recuperarSenha} />
    </View>
  );
};

export default RecuperarSenha;

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
    marginTop: 40,
  },
});
