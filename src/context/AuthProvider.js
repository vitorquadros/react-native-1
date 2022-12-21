import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  // STORE USER CACHE
  const storeUserCache = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('user', jsonValue);
    } catch (e) {
      console.error('AuthUserProvider: erro ao salvar o user no cache: ' + e);
    }
  };

  // GET USER CACHE
  const getUserCache = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      return jsonValue !== null ? jsonValue : null;
    } catch (e) {
      console.error('Preload, getUserCache: ' + e);
    }
  };

  // Sign Up
  const cadastrar = async (userValues, password) => {
    await auth()
      .createUserWithEmailAndPassword(userValues.email, password)
      .then(async () => {
        let userFirebase = auth().currentUser;
        firestore()
          .collection('users')
          .doc(userFirebase.uid)
          .set({
            email: userValues.email,
            name: 'Usuário Comum',
          })
          .then(() => {
            console.log('Usuário adicionado.');
            userFirebase
              .sendEmailVerification()
              .then(() => {
                Alert.alert(
                  'Atenção',
                  'Um email de verificação foi enviado para: ' +
                    userValues.email,
                );
              })
              .catch(error => {
                console.log('SignUp, cadastrar: ' + error);
              });
          })
          .catch(error => {
            console.log('SignUp, cadastrar: ' + error);
          });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('Email em uso!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('Email inválido!');
        }
      });
  };

  // Sign In
  const entrar = async (email, password) => {
    console.log('entrar 1');
    console.log(email, password);
    await auth()
      .signInWithEmailAndPassword(email, String(password))
      .then(() => {
        console.log('entrar 2');
        if (auth().currentUser.emailVerified) {
          console.log('foi entrar');
          getUser(password);
        } else {
          Alert.alert(
            'Erro',
            'Você deve verificar o seu email para prosseguir.',
          );
          auth()
            .signOut()
            .then(() => {})
            .catch(e => {
              console.error('AuthUserProvider, signIn: ' + e);
            });
        }
        return 'foi';
      })
      .catch(e => {
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
  };
  // const entrar = async (email, password) => {
  //   if (email !== '' && password !== '') {
  //     try {
  //       await auth().signInWithEmailAndPassword(email, password);
  //       if (!auth().currentUser.emailVerified) {
  //         Alert.alert('Atenção', 'Email não verificado!');
  //         return false;
  //       }
  //       const user = {email, password};
  //       AsyncStorage.setItem('user', JSON.stringify(user));

  //       return true;
  //     } catch (error) {
  //       console.error('SignIn, entrar: ' + error);
  //       switch (error.code) {
  //         case 'auth/user-not-found':
  //           Alert.alert('Erro', 'Usuário não cadastrado.');
  //           break;
  //         case 'auth/wrong-password':
  //           Alert.alert('Erro', 'Erro na senha.');
  //           break;
  //         case 'auth/invalid-email':
  //           Alert.alert('Erro', 'Email inválido.');
  //           break;
  //         case 'auth/user-disabled':
  //           Alert.alert('Erro', 'Usuário desabilitado.');
  //           break;
  //       }
  //       return false;
  //     }
  //   } else {
  //     Alert.alert('Atenção', 'Você deve preencher todos os campos.');
  //   }
  // };

  // Get Users
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

  // GET USER
  const getUser = async password => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log('foii');
          doc.data().password = password;
          storeUserCache(doc.data());
          return doc.data();
        } else {
          console.log('AuthUserProvider, getUser: documento não localizado');
        }
      })
      .catch(e => {
        console.error('AuthUserProvider: getUser: ' + e);
      });
  };

  // Sign Out
  const signOut = () => {
    setUser(null);
    AsyncStorage.removeItem('user')
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
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signOut,
        getUsers,
        users,
        entrar,
        cadastrar,
        getUserCache,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
