import React, {useEffect, useState} from 'react';
import SignOutButton from '../../componentes/SignOutButton';
import Item from './Item';
import {Container, FlatList} from './styles';
import firestore from '@react-native-firebase/firestore';
import {CommonActions} from '@react-navigation/native';

const Home = ({navigation}) => {
  const [data, setData] = useState([]);

  const getUsers = () => {
    firestore()
      .collection('users')
      .get()
      .then(querySnapshot => {
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
      })
      .catch(e => console.log('Home, getUsers ' + e));
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: false,
      title: 'Home page',
      headerStyle: {backgroundColor: 'darkred'},
      headerTitleStyle: {color: 'white'},
      headerRight: () => <SignOutButton texto="Logout" />,
    });

    getUsers();
  }, [navigation]);

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
    </Container>
  );
};
export default Home;
