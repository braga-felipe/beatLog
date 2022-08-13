import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';

export default PlayButtonsView = ({icon, setter}) => {
  return (
    <Pressable
      style={styles.button}
      onPress={() => {
        setter(false);
      }}>
      <Text style={styles.text}>{icon}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: '#f7f7f7',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
  },
});
