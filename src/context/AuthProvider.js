import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  const signOut = () => {
    AsyncStorage.removeItem('user_session')
      .then(() => {
        auth()
          .signOut()
          .then(() => {})
          .catch(error => {
            console.log(error);
          });
      })
      .catch(e => {
        console.log('SignOutButton, logout: ' + e);
      });
  };

  return (
    <AuthContext.Provider value={{user, setUser, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};
