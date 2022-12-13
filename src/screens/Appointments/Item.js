import React from 'react';
import styled from 'styled-components/native';
import {COLORS} from '../../assets/colors';

const Button = styled.TouchableHighlight`
  width: 100%;
  height: 100px;
  background-color: ${COLORS.primaryDark};
  padding: 20px;
  margin-top: 10px;
  border-radius: 10px;
`;

const DivTextos = styled.View`
  width: 100%;
`;

const TextType = styled.Text`
  font-size: 24px;
  text-align: justify;
  color: ${COLORS.white};
`;

const TextDescription = styled.Text`
  font-size: 16px;
  color: ${COLORS.white};
`;

const TextDate = styled.Text`
  font-size: 14px;
  text-align: right;
  color: white;
`;

const Item = ({item, onPress}) => {
  return (
    <Button onPress={onPress} underlayColor="transparent">
      <>
        <DivTextos>
          <TextType>{item.type}</TextType>
          <TextDescription>{item.description}</TextDescription>
        </DivTextos>
        <TextDate>{item.date}</TextDate>
      </>
    </Button>
  );
};
export default Item;
