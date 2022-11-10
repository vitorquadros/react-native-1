import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MyButton from '../componentes/MyButton';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';

const Home = ({navigation}) => {
  const [cont, setCont] = useState(0);

  //exemplos de controle de ciclo de vida
  //na construção do componente
  useEffect(() => {
    console.log('na construção do componente');
  }, []);

  //na atualização do componente
  useEffect(() => {
    console.log('na atualização do componente');
  }, [cont]);

  useEffect(() => console.log('ao dertiur o componente'), []);

  const incrementar = () => {
    setCont(cont + 1);
    //console.log(cont);
  };

  const decrementar = () => {
    setCont(cont - 1);
  };

  function signout() {
    auth()
      .signOut()
      .then(() => console.log('Deslogado!'));
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'AppStack'}],
      }),
    );
  }

  return (
    <View>
      <Text style={styles.texto}>Contador= {cont}</Text>
      <MyButton onClick={incrementar} texto="incrementar" textoX="fasdfs" />
      <MyButton onClick={decrementar} texto="decrementar" />
      <MyButton onClick={signout} texto="Deslogar" />
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  texto: {
    fontSize: 30,
  },
});
