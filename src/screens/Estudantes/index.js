import {CommonActions} from '@react-navigation/native';
import React, {useContext} from 'react';
import {View} from 'react-native';
import {EstudanteContext} from '../../context/EstudanteProvider';

// import { Container } from './styles';

const Estudantes = ({navigation}) => {
  const {estudantes} = useContext(EstudanteContext);

  const routeStudent = estudante => {
    navigation.dispatch(
      CommonActions.navigate({name: 'Estudante', params: {estudante}}),
    );
  };

  return (
    <View style={styles.container}>
      {estudantes.map((estudante, index) => {
        console.log(estudante);
        return (
          <Item item={estudante} onPress={() => routeStudent(v)} key={index} />
        );
      })}
    </View>
  );
};

export default Estudantes;
