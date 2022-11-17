import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  View,
  Text,
  Alert,
} from 'react-native';
import MyButton from '../componentes/MyButton';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components';

const SingIn = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      title: 'Fazer login',
      headerStyle: {backgroundColor: 'lightgray'},
      headerTitleStyle: {color: 'white'},
    });
  }, [navigation]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(true);

  async function storeUserSession(localUser) {
    try {
      await EncryptedStorage.setItem('user_session', JSON.stringify(localUser));
    } catch (error) {
      console.error('SingIn, storeUserSession: ' + error);
    }
  }

  const getUser = () => {};

  const entrar = async () => {
    if (email !== '' && password !== '') {
      try {
        await auth().signInWithEmailAndPassword(email, password);
        if (!auth().currentUser.emailVerified) {
          Alert.alert('Atenção', 'Email não verificado!');
          return;
        }
        getUser();
        const user = {email, password};
        AsyncStorage.setItem('user_session', JSON.stringify(user));
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'AppStack'}],
          }),
        );
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
      }
    } else {
      Alert.alert('Atenção', 'Você deve preencher todos os campos.');
    }
  };

  return (
    <Container>
      <ScrollView>
        <DivSuperior>
          <StyledImage
            source={require('../assets/images/chama.png')}
            accessibilityLabel="logo do app"
          />
          <StyledInput
            placeholder="Email"
            keyboardType="email-address"
            returnKeyType="next"
            onChangeText={t => setEmail(t)}
          />
          <StyledInput
            secureTextEntry={showPass}
            placeholder="Senha"
            keyboardType="default"
            returnKeyType="go"
            onChangeText={t => setPassword(t)}
          />
          <TextEsqueceuSenha
            onPress={() => navigation.navigate('RecuperarSenha')}>
            Esqueceu sua senha?
          </TextEsqueceuSenha>
          <MyButton texto="ENTRAR" onClick={entrar} />
        </DivSuperior>
        <DivInferior>
          <DivOuHr>
            <DivHr />
            <TextOu>OU</TextOu>
            <DivHr />
          </DivOuHr>
          <DivCadastrarSe>
            <TextNormal>Não tem uma conta?</TextNormal>
            <TextCadastrarSe onPress={() => navigation.navigate('SignUp')}>
              Cadastre-se
            </TextCadastrarSe>
          </DivCadastrarSe>
          {/* {loading && <Loading />} */}
        </DivInferior>
      </ScrollView>
    </Container>
  );
};
export default SingIn;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 20px;
`;

const DivSuperior = styled.View`
  flex: 5;
  align-items: center;
`;

const DivInferior = styled.View`
  flex: 1;
  align-items: center;
  margin-top: 20px;
`;

const StyledImage = styled.Image`
  width: 150px;
  height: 150px;
  margin: 5px;
`;

const StyledInput = styled.TextInput`
  width: 95%;
  height: 50px;
  border-bottom-color: grey;
  border-bottom-width: 2px;
  font-size: 16px;
  padding-left: 2px;
  padding-bottom: 1px;
`;

const TextEsqueceuSenha = styled.Text`
  font-size: 15px;
  color: blue;
  align-self: flex-end;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const DivOuHr = styled.View`
  width: 100%;
  height: 30px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const DivHr = styled.View`
  width: 30%;
  height: 1px;
  border-bottom-color: grey;
  border-bottom-width: 2px;
`;

const TextOu = styled.Text`
  margin-left: 20px;
  margin-right: 20px;
  font-size: 20px;
  color: grey;
`;

const DivCadastrarSe = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const TextNormal = styled.Text`
  font-size: 18px;
`;

const TextCadastrarSe = styled.Text`
  font-size: 16px;
  color: blue;
  margin-left: 5px;
`;
