import React, {useContext, useEffect, useState} from 'react';
import {Container, FlatList} from './styles';
import Loading from '../../componentes/Loading';
import Item from './Item';
import {CommonActions} from '@react-navigation/native';
import {AppointmentContext} from '../../context/AppointmentProvider';
import AddFloatButton from '../../componentes/AddFloatButton';

const Appointments = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {appointment} = useContext(AppointmentContext);

  useEffect(() => {
    setData(appointment);
    console.log(appointment);
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

  return (
    <Container>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.uid}
      />
      <AddFloatButton onClick={routeAddAppointment} />
      {loading && <Loading />}
    </Container>
  );
};

export default Appointments;
