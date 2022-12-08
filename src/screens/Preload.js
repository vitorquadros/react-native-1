/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {View, Text, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../componentes/Loading';
import styled from 'styled-components';

const Preload = ({navigation}) => {
  const entrar = async (email, password) => {
    if (email !== '' && password !== '') {
      try {
        await auth().signInWithEmailAndPassword(email, password);
        // navigation.dispatch(
        //   CommonActions.reset({
        //     index: 0,
        //     routes: [{name: 'Home'}],
        //   }),
        // );
      } catch (error) {
        console.error('Preload, entrar: ' + error);
        switch (error.code) {
          case 'auth/user-not-found':
            Alert.alert('Erro', 'Usuário não cadastrado.');
            break;
          case 'auth/wrong-password':
            Alert.alert('Erro', 'Erro na senha.');
            break;
          case 'auth/invalid-email':
            Alert.alert('Erro', 'Email inválido.');
            break;
          case 'auth/user-disabled':
            Alert.alert('Erro', 'Usuário desabilitado.');
            break;
        }
      }
    } else {
      Alert.alert('Atenção', 'Você deve preencher todos os campos.');
    }
  };

  async function retrieveUserSession() {
    try {
      const session = await AsyncStorage.getItem('user_session');

      if (session) {
        let localUser = JSON.parse(session);
        entrar(localUser.email, localUser.password);
      } else {
        // navigation.dispatch(
        //   CommonActions.reset({
        //     index: 0,
        //     routes: [{name: 'SingIn'}],
        //   }),
        // );
      }
    } catch (error) {
      console.error('Preload, retrieveUserSession: ' + error);
    }
  }

  async function loginAutomatico() {
    await retrieveUserSession();
  }

  useEffect(() => {
    loginAutomatico();
  }, []);

  return (
    <Container>
      <StyledImage
        source={require('../assets/images/chama.png')}
        accessibilityLabel="Logo do app"
      />
    </Container>
  );
};

export default Preload;

const Container = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
`;

const StyledImage = styled.Image`
  width: 150px;
  height: 150px;
`;
