import {Container, TextInput} from './styles';
import MeuButton from '../../componentes/MeuButton';
import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
import {showToast} from '../../utils/showToast';

const User = ({route, navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [uid, setUid] = useState('');

  useEffect(() => {
    setName(route.params.user.nome);
    setEmail(route.params.user.email);
    setUid(route.params.user.id);
  }, []);

  const salvar = () => {
    firestore()
      .collection('users')
      .doc(uid)
      .set({name}, {merge: true})
      .then(() => {
        setName('');
        setEmail('');
        setUid('');
        showToast('Dados salvos.');
        navigation.goBack();
      })
      .catch(error => {
        console.log('User, salvar ' + error);
      });
  };

  return (
    <Container>
      <TextInput
        placeholder="Nome"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setName(t)}
        value={name}
      />
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        editable={false}
        value={email}
      />
      <MeuButton texto="Salvar" onClick={salvar} />
    </Container>
  );
};

export default User;
