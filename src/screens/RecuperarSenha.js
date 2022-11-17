import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, StyleSheet, Alert} from 'react-native';
import MyButton from '../componentes/MyButton';
import auth from '@react-native-firebase/auth';
import styled from 'styled-components';

// import { Container } from './styles';

const RecuperarSenha = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      title: 'Recuperar Senha',
      headerStyle: {backgroundColor: 'darkred'},
      headerTitleStyle: {color: 'white'},
    });
  }, [navigation]);

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
    <Container>
      <StyledInput
        placeholder="Email"
        keyboardType="email-address"
        returnKeyType="next"
        onChangeText={t => setEmail(t)}
      />
      <MyButton texto="Recuperar senha" onClick={recuperarSenha} />
    </Container>
  );
};

export default RecuperarSenha;

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const StyledInput = styled.TextInput`
  width: 95%;
  height: 50px;
  border-bottom-color: grey;
  border-bottom-width: 2px;
  font-size: 16px;
  padding-left: 2px;
  padding-bottom: 1px;
  margin-top: 40px;
`;
