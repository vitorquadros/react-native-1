import React, {useContext} from 'react';
import styled from 'styled-components';
import {COLORS} from '../assets/colors';
import DrawerHeader from './DrawerHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../context/AuthProvider';

export default function CustomDrawerContent({navigation}) {
  const {signOut} = useContext(AuthContext);

  return (
    <Page>
      <Header>
        <DrawerHeader />
      </Header>
      <Body>
        <ScrollView>
          <DivItem>
            <IconMaterial
              name="home-outline"
              size={25}
              color={COLORS.primaryDark}
            />
            <ItemMenuText onPress={() => navigation.navigate('Home')}>
              Página Inicial
            </ItemMenuText>
          </DivItem>

          <DivItem>
            <Icon name="fitness-outline" size={25} color={COLORS.primaryDark} />
            <ItemMenuText onPress={() => console.log('implementar')}>
              Médicos
            </ItemMenuText>
          </DivItem>

          <DivItem>
            <Icon
              name="clipboard-outline"
              size={25}
              color={COLORS.primaryDark}
            />
            <ItemMenuText onPress={() => navigation.navigate('Appointments')}>
              Consultas
            </ItemMenuText>
          </DivItem>

          <DivItem>
            <Icon name="map-outline" size={25} color={COLORS.primaryDark} />
            <ItemMenuText
              onPress={() => navigation.navigate('MapAppointments')}>
              Localizar Consultas
            </ItemMenuText>
          </DivItem>

          <DivItem>
            <IconMaterial name="needle" size={25} color={COLORS.primaryDark} />
            <ItemMenuText onPress={() => navigation.navigate('Vaccines')}>
              Vacinas
            </ItemMenuText>
          </DivItem>

          <DivItem>
            <IconMaterial name="logout" size={25} color={COLORS.primaryDark} />
            <ItemMenuText onPress={() => signOut()}>Sair</ItemMenuText>
          </DivItem>
        </ScrollView>
      </Body>
    </Page>
  );
}

const Page = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Header = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  background-color: ${COLORS.primaryDark};
`;

const Body = styled.View`
  flex: 6;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 18px;
  padding-top: 30px;
`;

const ScrollView = styled.ScrollView`
  width: 100%;
`;

const DivItem = styled.View`
  width: 100%;
  height: 25px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 10px;
`;

const ItemMenuText = styled.Text`
  font-size: 16px;
  margin-left: 10px;
  color: ${COLORS.primaryDark};
`;
