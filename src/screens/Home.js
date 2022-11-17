import React, {useEffect} from 'react';
import SignOutButton from '../componentes/SignOutButton';
import styled from 'styled-components';

const Home = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: false,
      title: 'Home page',
      headerStyle: {backgroundColor: 'darkred'},
      headerTitleStyle: {color: 'white'},
      headerRight: () => <SignOutButton texto="Logout" />,
    });
  }, [navigation]);

  return (
    <Container>
      <StyledText>Homepage do app</StyledText>
    </Container>
  );
};
export default Home;

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 20px;
  margin-top: 50px;
`;
