import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MyButton from '../componentes/MyButton';
import auth from '@react-native-firebase/auth';
import SignOutButton from '../componentes/SignOutButton';

const Home = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: false,
      title: 'Home page',
      headerStyle: {backgroundColor: 'orange'},
      headerTitleStyle: {color: 'white'},
      headerRight: () => <SignOutButton texto="Logout" />,
    });
  }, [navigation]);

  const [cont, setCont] = useState(0);

  const incrementar = () => {
    setCont(cont + 1);
  };

  const decrementar = () => {
    setCont(cont - 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Contador= {cont}</Text>
      <MyButton onClick={incrementar} texto="incrementar" textoX="fasdfs" />
      <MyButton onClick={decrementar} texto="decrementar" />
      <SignOutButton texto="Deslogar" />
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  texto: {
    fontSize: 30,
  },
});
