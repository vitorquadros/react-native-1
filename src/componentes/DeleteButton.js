import React from 'react';
import {Text, StyleSheet, TouchableHighlight} from 'react-native';

import {COLORS} from '../assets/colors';

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: COLORS.primaryDark,
  },
  button: {
    width: '95%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
});

const DeleteButton = ({texto, onClick}) => {
  return (
    <TouchableHighlight style={styles.button} onPress={() => onClick()}>
      <Text style={styles.text}>{texto}</Text>
    </TouchableHighlight>
  );
};
export default DeleteButton;
