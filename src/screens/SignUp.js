import React, {useContext, useEffect, useState} from 'react';
import MyButton from '../componentes/MyButton';
import {Container, StyledInput} from './RecuperarSenha';
import {AuthContext} from '../context/AuthProvider';
import {Alert} from 'react-native';

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

  const handleSignUp = async () => {
    if (email !== '' && password !== '' && passwordConfirm !== '') {
      if (password.length > 6) {
        if (password === passwordConfirm) {
          let user = {};
          user.email = email;
          setLoading(true);
          await cadastrar(user, password);
          setLoading(false);
          navigation.goBack();
        } else {
          Alert.alert('Erro', 'As senhas digitadas são diferentes.');
        }
      } else {
        Alert.alert('Erro', 'A senha precisa ter mais de 6 caracteres.');
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
      <MyButton texto="Cadastrar" onClick={handleSignUp} />
    </Container>
  );
};

export default SignUp;
