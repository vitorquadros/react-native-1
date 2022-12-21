/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect} from 'react';
import {CommonActions} from '@react-navigation/native';
import styled from 'styled-components';
import {AuthContext} from '../context/AuthProvider';
import {AppointmentContext} from '../context/AppointmentProvider';
import {Alert} from 'react-native';

const Preload = ({navigation}) => {
  const {user, setUser, getUsers, getUserCache} = useContext(AuthContext);
  const {getAppointments} = useContext(AppointmentContext);

  useEffect(() => {
    // loginUser();
    storeContextUser();
    const unsubscribeAppointments = getAppointments();
    const unsubscribeUsers = getUsers();
    console.log(user);

    return () => {
      unsubscribeAppointments;
      unsubscribeUsers;
    };
  }, []);

  const storeContextUser = async () => {
    if (user) {
      const jsonValue = await getUserCache();
      const userCache = JSON.parse(jsonValue);
      setUser(userCache);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Home'}],
        }),
      );
    } else {
      auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then(() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Home'}],
            }),
          );
        })
        .catch(e => {
          console.log('SignIn: erro em entrar: ' + e);
          switch (e.code) {
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
        });
    }
  };

  // const loginUser = async () => {
  //   const user = await getUserCache();
  //   setUser(user);
  //   if (user) {
  //     navigation.dispatch(
  //       CommonActions.reset({
  //         index: 0,
  //         routes: [{name: 'Home'}],
  //       }),
  //     );
  //   }
  // };

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
