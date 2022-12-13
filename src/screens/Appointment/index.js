import React, {useContext, useEffect, useState} from 'react';
import {Container, TextInput} from './styles';
import MeuButton from '../../componentes/MeuButton';
import {Alert} from 'react-native';
import {AppointmentContext} from '../../context/AppointmentProvider';
import Loading from '../../componentes/Loading';
import DeleteButton from '../../componentes/DeleteButton';

const Appointment = ({route, navigation}) => {
  const [uid, setUid] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);

  const {saveAppointment, deleteAppointment} = useContext(AppointmentContext);

  useEffect(() => {
    setUid('');
    setDescription('');
    setType('');
    setDate('');

    if (route.params.appointment) {
      setUid(route.params.appointment.uid);
      setDescription(route.params.appointment.description);
      setType(route.params.appointment.type);
      setDate(route.params.appointment.date);
    }
  }, [route]);

  const salvar = async () => {
    if (description && type && date) {
      let appointmentObject = {};
      appointmentObject.uid = uid;
      appointmentObject.description = description;
      appointmentObject.type = type;
      appointmentObject.date = date;
      setLoading(true);
      await saveAppointment(appointmentObject);
      setLoading(false);
      navigation.goBack();
    } else {
      Alert.alert('Atenção', 'Preencha todos os campos!');
    }
  };

  const excluir = async () => {
    Alert.alert('Atenção', 'Deseja realmente excluir?', [
      {text: 'Não', onPress: () => {}, style: 'cancel'},
      {
        text: 'Sim',
        onPress: async () => {
          setLoading(true);
          await deleteAppointment(uid);
          setLoading(false);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <Container>
      <TextInput
        placeholder="Descrição da consulta"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={text => setDescription(text)}
        value={description}
      />
      <TextInput
        placeholder="Área da consulta"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={text => setType(text)}
        value={type}
      />
      <TextInput
        placeholder="Data da consulta"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={text => setDate(text)}
        value={date}
      />
      <MeuButton texto="Salvar" onClick={salvar} />
      {uid ? <DeleteButton texto="Excluir" onClick={excluir} /> : null}
      {loading && <Loading />}
    </Container>
  );
};

export default Appointment;
