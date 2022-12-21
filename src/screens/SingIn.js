import React, {useContext, useState} from 'react';
import {Alert, ScrollView} from 'react-native';
import MyButton from '../componentes/MyButton';
import styled from 'styled-components';
import Loading from '../componentes/Loading';
import {AuthContext} from '../context/AuthProvider';
import {CommonActions} from '@react-navigation/native';

const SingIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(true);

  const {entrar} = useContext(AuthContext);

  const handleSignIn = () => {
    if (email !== '' && password !== '') {
      setLoading(true);
      entrar(email, password);
      setLoading(false);
    } else {
      Alert.alert('Erro', 'Por favor, digite email e senha.');
    }

    // setLoading(true);
    // if (entrar(email, password)) {
    //   navigation.dispatch(
    //     CommonActions.reset({
    //       index: 0,
    //       routes: [{name: 'Home'}],
    //     }),
    //   );
    // }
    // setLoading(false);
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
          <MyButton texto="ENTRAR" onClick={handleSignIn} />
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
        </DivInferior>
      </ScrollView>
      {loading && <Loading />}
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
  color: darkred;
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
  color: darkred;
  margin-left: 5px;
`;
