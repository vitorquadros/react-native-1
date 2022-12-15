import React, {useContext, useEffect, useState} from 'react';
import MyButton from '../componentes/MyButton';
import {Container, StyledInput} from './RecuperarSenha';
import {AuthContext} from '../context/AuthProvider';

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
  const [loading, setLoading] = useState(false);

  const {cadastrar} = useContext(AuthContext);

  const handleSignUp = () => {
    setLoading(true);
    if (cadastrar(email, password, passwordConfirm)) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'SingIn'}],
        }),
      );
    }
    setLoading(false);
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
      <MyButton texto="Cadastrar" onClick={handleSignUp} />
    </Container>
  );
};

export default SignUp;
