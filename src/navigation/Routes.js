import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import {AuthContext} from '../context/AuthProvider';
import auth from '@react-native-firebase/auth';
import {COLORS} from '../assets/colors';
import {StatusBar} from 'react-native';

export default function Routes() {
  const {user, setUser} = useContext(AuthContext);

  useEffect(() => {
    const unsubscriber = auth().onAuthStateChanged(authUser => {
      authUser && authUser.emailVerified ? setUser(authUser) : setUser(null);
    });

    return unsubscriber;
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.primaryDark} />
      {/* {user ? <AppStack /> : <AuthStack />} */}
      <AppStack />
    </NavigationContainer>
  );
}
