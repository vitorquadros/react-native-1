import React from 'react';
import {TouchableHighlight, Text} from 'react-native';
import styled from 'styled-components';
import {padding} from '../utils/padding';

const MyButton = props => {
  //console.log(props);
  return (
    <StyledButton style={{...padding(10, 20)}} onPress={() => props.onClick()}>
      <Text>{props.texto}</Text>
    </StyledButton>
  );
};
export default MyButton;

const StyledButton = styled.TouchableHighlight`
  background-color: gray;
  border-radius: 10px;
  color: white;
  margin-top: 20px;
`;
