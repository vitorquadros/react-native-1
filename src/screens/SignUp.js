import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Alert, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';
import MyButton from '../componentes/MyButton';
import firestore from '@react-native-firebase/firestore';
import {Container, StyledInput} from './RecuperarSenha';

// import { Container } from './styles';

const SignUp = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      title: 'Realizar cadastro',
      headerStyle: {backgroundColor: 'darkred'},
      headerTitleStyle: {color: 'white'},
    });
  }, [navigation]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const cadastrar = () => {
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
                            onPress: () =>
                              navigation.dispatch(
                                CommonActions.reset({
                                  index: 0,
                                  routes: [{name: 'SingIn'}],
                                }),
                              ),
                          },
                        ],
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

  return (
    <Container>
      <StyledInput
        placeholder="Email"
        keyboardType="email-address"
        returnKeyType="next"
        onChangeText={t => setEmail(t)}
      />
      <StyledInput
        placeholder="Senha"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setPassword(t)}
      />
      <StyledInput
        placeholder="Confirmar senha"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setPasswordConfirm(t)}
      />
      <MyButton
        texto="Cadastrar"
        onClick={() => {
          console.log('teste');
          cadastrar();
        }}
      />
    </Container>
  );
};

export default SignUp;
