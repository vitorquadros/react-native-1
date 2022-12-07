import React from 'react';
import styled from 'styled-components/native';
import {COLORS} from '../../assets/colors';

const Button = styled.TouchableHighlight`
  width: 100%;
  height: 100px;
  background-color: ${COLORS.primaryLight};
  padding: 20px;
  margin-top: 10px;
  border-radius: 10px;
`;

const TextNome = styled.Text`
  font-size: 24px;
  text-align: justify;
  color: ${COLORS.white};
`;

const TextEmail = styled.Text`
  font-size: 16px;
  color: ${COLORS.white};
`;

const Item = ({item, onPress}) => {
  return (
    <Button onPress={onPress} underlayColor="transparent">
      <>
        <TextNome>{item.name}</TextNome>
        <TextEmail>{item.email}</TextEmail>
      </>
    </Button>
  );
};
export default Item;
