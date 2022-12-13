import React, {useContext, useEffect, useState} from 'react';
import Item from './Item';
import {Container, FlatList} from './styles';
import {AuthContext} from '../../context/AuthProvider';
import {CommonActions} from '@react-navigation/native';
import Loading from '../../componentes/Loading';

const Home = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const {users} = useContext(AuthContext);

  useEffect(() => {
    setData(users);
    setLoading(false);
  }, [users]);

  const routeUser = item => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'User',
        params: {user: item},
      }),
    );
  };

  const renderItem = ({item}) => (
    <Item item={item} onPress={() => routeUser(item)} />
  );

  return (
    <Container>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      {loading && <Loading />}
    </Container>
  );
};
export default Home;
