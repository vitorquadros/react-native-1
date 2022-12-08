import React, {useEffect, useState} from 'react';
import Item from './Item';
import {Container, FlatList} from './styles';
import firestore from '@react-native-firebase/firestore';
import {CommonActions} from '@react-navigation/native';
import Loading from '../../componentes/Loading';

const Home = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUsers = () => {
    const unsubscribe = firestore()
      .collection('users')
      .onSnapshot(
        querySnapshot => {
          let d = [];
          querySnapshot.forEach(doc => {
            console.log(doc.id, ' => ', doc.data());
            const user = {
              id: doc.id,
              email: doc.data().email,
              name: doc.data().name,
            };
            d.push(user);
          });
          setData(d);
          setLoading(false);
        },
        e => console.log('Home, getUsers ' + e),
      );

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = getUsers();
    return () => unsubscribe();
  }, []);

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
