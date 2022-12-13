import React, {useContext, useEffect, useState} from 'react';
import {Container, FlatList, TextInput} from './styles';
import Loading from '../../componentes/Loading';
import Item from './Item';
import {CommonActions} from '@react-navigation/native';
import {AppointmentContext} from '../../context/AppointmentProvider';
import AddFloatButton from '../../componentes/AddFloatButton';
import {Text} from 'react-native';

const Appointments = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {appointment} = useContext(AppointmentContext);

  useEffect(() => {
    setData(appointment);
    setLoading(false);
  }, [appointment]);

  const renderItem = ({item}) => (
    <Item item={item} onPress={() => routeAppointment(item)} />
  );

  const routeAppointment = item => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Appointment',
        params: {appointment: item},
      }),
    );
  };

  const routeAddAppointment = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Appointment',
        params: {appointment: null},
      }),
    );
  };

  const search = searchInput => {
    if (searchInput) {
      const filteredData = appointment.filter(item => {
        const itemData = `${item.type.toUpperCase()}`;
        const textData = searchInput.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setData(filteredData);
    } else {
      setData(appointment);
    }
  };

  return (
    <Container>
      <TextInput
        placeholder="Pesquise aqui"
        onChangeText={searchInput => search(searchInput)}
      />

      {data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.uid}
        />
      ) : (
        <Text>Nenhum resultado encontrado.</Text>
      )}
      <AddFloatButton onClick={routeAddAppointment} />
      {loading && <Loading />}
    </Container>
  );
};

export default Appointments;
