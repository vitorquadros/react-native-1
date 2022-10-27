import React from 'react';
import {TouchableHighlight, Text} from 'react-native';

const MyButton = props => {
  //console.log(props);
  return (
    <TouchableHighlight onPress={() => props.onClick()}>
      <Text>{props.texto}</Text>
    </TouchableHighlight>
  );
};
export default MyButton;
