import React, {useContext} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components';
import {COLORS} from '../assets/colors';
import {AuthContext} from '../context/AuthProvider';

export default function DrawerHeader() {
  const {user} = useContext(AuthContext);

  return (
    <Container>
      <DivIcon>
        <Icon name="person-outline" size={40} color={COLORS.white} />
      </DivIcon>

      <DivText>
        <TextWelcome>Bem vindo,</TextWelcome>
        <TextUsername>{user ? user.email : ''}</TextUsername>
      </DivText>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const DivIcon = styled.View`
  width: 20%;
  /* height: 100%; */
  justify-content: center;
  align-items: center;
  margin: 5px;
`;

const DivText = styled.View`
  flex: 4;
  justify-content: center;
  align-items: flex-start;
  margin-top: 20px;
`;

const TextWelcome = styled.Text`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;
  display: flex;
  align-items: center;
  color: ${COLORS.white};
`;

const TextUsername = styled.Text`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  display: flex;
  align-items: center;
  color: ${COLORS.white};
`;
