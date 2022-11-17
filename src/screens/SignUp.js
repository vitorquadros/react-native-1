import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';

// import { Container } from './styles';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // auth()
  //   .createUserWithEmailAndPassword(email, password)
  //   .then(() => {
  //     console.log('User account created & signed in!');
  //     alert('Cadastrado com sucesso');
  //   })
  //   .catch(error => {
  //     if (error.code === 'auth/email-already-in-use') {
  //       console.log('That email address is already in use!');
  //     }

  //     if (error.code === 'auth/invalid-email') {
  //       console.log('That email address is invalid!');
  //     }

  //     console.error(error);
  //   });

  return (
    <View>
      <Text>SignUp</Text>
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        returnKeyType="next"
        onChangeText={t => setEmail(t)}
      />
      <TextInput
        placeholder="Senha"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setPassword(t)}
      />
    </View>
  );
};

export default SignUp;
