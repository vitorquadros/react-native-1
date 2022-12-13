/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect} from 'react';
import {CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components';
import {AuthContext} from '../context/AuthProvider';
import {AppointmentContext} from '../context/AppointmentProvider';

const Preload = ({navigation}) => {
  const {setUser, getUsers} = useContext(AuthContext);
  const {getAppointments} = useContext(AppointmentContext);

  const getUserCache = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user_session');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error('Preload, getUserCache: ' + e);
    }
  };

  const loginUser = async () => {
    const user = await getUserCache();
    setUser(user);
    if (user) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Home'}],
        }),
      );
    }
  };

  useEffect(() => {
    loginUser();
    const unsubscribeAppointments = getAppointments();
    const unsubscribeUsers = getUsers();

    return () => {
      unsubscribeAppointments;
      unsubscribeUsers;
    };
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
