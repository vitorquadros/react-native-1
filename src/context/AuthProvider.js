import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    const unsubscribe = firestore()
      .collection('users')
      .onSnapshot(
        querySnapshot => {
          let d = [];
          querySnapshot.forEach(doc => {
            const user = {
              id: doc.id,
              email: doc.data().email,
              name: doc.data().name,
            };
            d.push(user);
          });
          setUsers(d);
        },
        e => console.log('Home, getUsers ' + e),
      );

    return unsubscribe;
  };

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
    <AuthContext.Provider value={{user, setUser, signOut, getUsers, users}}>
      {children}
    </AuthContext.Provider>
  );
};
