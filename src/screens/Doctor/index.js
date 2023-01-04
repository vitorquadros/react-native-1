import React, {useContext, useEffect, useState} from 'react';
import {Container, TextInput} from './styles';
import MeuButton from '../../componentes/MeuButton';
import {Alert} from 'react-native';
import Loading from '../../componentes/Loading';
import DeleteButton from '../../componentes/DeleteButton';
import {DoctorContext} from '../../context/DoctorProvider';

const Doctor = ({route, navigation}) => {
  const [uid, setUid] = useState('');
  const [name, setName] = useState('');
  const [crm, setCrm] = useState('');
  const [loading, setLoading] = useState(false);

  const {saveDoctor, deleteDoctor, updateDoctor} = useContext(DoctorContext);

  useEffect(() => {
    setUid('');
    setName('');
    setCrm('');

    if (route.params.doctor) {
      setUid(route.params.doctor.uid);
      setName(route.params.doctor.name);
      setCrm(route.params.doctor.crm);
    }
  }, [route]);

  const salvar = async () => {
    if (name && crm) {
      let doctorObject = {};
      doctorObject.uid = uid;
      doctorObject.name = name;
      doctorObject.crm = crm;
      setLoading(true);
      if (uid) await updateDoctor(doctorObject);
      else await saveDoctor(doctorObject);

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
          await deleteDoctor(uid);
          setLoading(false);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <Container>
      <TextInput
        placeholder="Nome do Médico"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={text => setName(text)}
        value={name}
      />
      <TextInput
        placeholder="CRM do Médico"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={text => setCrm(text)}
        value={crm}
      />
      <MeuButton texto="Salvar" onClick={salvar} />
      {uid ? <DeleteButton texto="Excluir" onClick={excluir} /> : null}
      {loading && <Loading />}
    </Container>
  );
};

export default Doctor;
