import React from 'react';
import {TouchableHighlight, Text, StyleSheet} from 'react-native';

const MyButton = props => {
  //console.log(props);
  return (
    <TouchableHighlight
      style={styles.buttonEnviar}
      onPress={() => props.onClick()}>
      <Text>{props.texto}</Text>
    </TouchableHighlight>
  );
};
export default MyButton;

const styles = StyleSheet.create({
  buttonEnviar: {
    backgroundColor: 'green',
    padding: 20,
    borderRadius: 10,
    color: 'white',
  },
});
