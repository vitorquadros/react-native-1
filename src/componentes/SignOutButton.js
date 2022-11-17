import React from 'react';
import {TouchableHighlight, Text, StyleSheet, Image} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Restart from 'react-native-restart';
import styled from 'styled-components';
import {padding} from '../utils/padding';

const SignOutButton = props => {
  const logout = () => {
    AsyncStorage.removeItem('user_session')
      .then(() => {
        auth()
          .signOut()
          .then(() => {})
          .catch(error => {
            console.log(error);
          });
        Restart.Restart();
      })
      .catch(e => {
        console.log('SignOutButton, logout: ' + e);
      });
  };

  return (
    <StyledButton style={{...padding(10, 20)}} onPress={logout}>
      <StyledImage source={require('../assets/images/logout.png')} />
    </StyledButton>
  );
};
export default SignOutButton;

const StyledButton = styled.TouchableHighlight`
  /* background-color: red; */
  border-radius: 10px;
  color: white;
  margin-top: 20px;
`;

const StyledImage = styled.Image`
  max-width: 30px;
  max-height: 30px;
`;
