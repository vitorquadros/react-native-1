import React from 'react';
import {TouchableHighlight, Text, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Restart from 'react-native-restart';

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
    <TouchableHighlight style={styles.logout} onPress={logout}>
      <Text>{props.texto}</Text>
    </TouchableHighlight>
  );
};
export default SignOutButton;

const styles = StyleSheet.create({
  logout: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    color: 'white',
    marginTop: 20,
  },
});
