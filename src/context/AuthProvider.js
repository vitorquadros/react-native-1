import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  // Sign Up
  const cadastrar = (email, password, passwordConfirm) => {
    if (email !== '' && password !== '' && passwordConfirm !== '') {
      if (password.length > 5) {
        if (password === passwordConfirm) {
          auth()
            .createUserWithEmailAndPassword(email, password)
            .then(res => {
              let userFirebase = auth().currentUser;
              firestore()
                .collection('users')
                .doc(userFirebase.uid)
                .set({
                  email: email,
                  name: 'Usuário teste',
                })
                .then(() => {
                  console.log('Usuário adicionado');
                  userFirebase
                    .sendEmailVerification()
                    .then(() => {
                      Alert.alert(
                        'Atenção',
                        'Um email de verificação foi enviado para: ' + email,
                        [
                          {
                            text: 'OK',
                            onPress: () => {
                              return true;
                            },
                          },
                        ],
                      );
                    })
                    .catch(error => {
                      console.log('SignUp, cadastrar: ' + error);
                      return false;
                    });
                })
                .catch(error => {
                  console.log('SignUp, cadastrar: ' + error);
                  return false;
                });
            })
            .catch(error => {
              if (error.code === 'auth/email-already-in-use') {
                console.log('Email em uso!');
                return false;
              }

              if (error.code === 'auth/invalid-email') {
                console.log('Email inválido!');
                return false;
              }
            });
        } else {
          Alert.alert('Validação', 'As senhas precisam ser iguais.');
        }
      } else {
        Alert.alert('Validação', 'A senha precisa ter 6 ou mais caracteres.');
      }
    } else {
      Alert.alert('Erro', 'Por favor, digite email e senha.');
    }
  };

  // Sign In
  const entrar = async (email, password) => {
    if (email !== '' && password !== '') {
      try {
        await auth().signInWithEmailAndPassword(email, password);
        if (!auth().currentUser.emailVerified) {
          Alert.alert('Atenção', 'Email não verificado!');

          return false;
        }
        const user = {email, password};
        AsyncStorage.setItem('user_session', JSON.stringify(user));

        return true;
      } catch (error) {
        console.error('SignIn, entrar: ' + error);
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
        return false;
      }
    } else {
      Alert.alert('Atenção', 'Você deve preencher todos os campos.');
    }
  };

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

  // Sign Out
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
    <AuthContext.Provider
      value={{user, setUser, signOut, getUsers, users, entrar, cadastrar}}>
      {children}
    </AuthContext.Provider>
  );
};
