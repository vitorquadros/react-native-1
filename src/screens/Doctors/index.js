import React, {useContext, useEffect, useState} from 'react';
import {Container, FlatList, TextInput} from './styles';
import Loading from '../../componentes/Loading';
import Item from './Item';
import {CommonActions} from '@react-navigation/native';
import {AppointmentContext} from '../../context/AppointmentProvider';
import AddFloatButton from '../../componentes/AddFloatButton';
import {Text} from 'react-native';
import {DoctorContext} from '../../context/DoctorProvider';

const Doctors = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {getDoctors, doctors} = useContext(DoctorContext);

  const fetchData = async () => {
    await getDoctors();
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setData(doctors);
  }, [doctors]);

  const renderItem = ({item}) => (
    <Item item={item} onPress={() => routeDoctor(item)} />
  );

  const routeDoctor = item => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Doctor',
        params: {doctor: item},
      }),
    );
  };

  const routeAddDoctor = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Doctor',
        params: {doctor: null},
      }),
    );
  };

  return (
    <Container>
      {data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.uid}
        />
      ) : (
        <Text>Nenhum resultado encontrado.</Text>
      )}
      <AddFloatButton onClick={routeAddDoctor} />
      {loading && <Loading />}
    </Container>
  );
};

export default Doctors;
