import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';

export default PlayButtonsView = ({icon, setter}) => {
  const size = icon === '▶︎' ? 65 : 50;
  const top = icon === '▶︎' ? 0 : 20;
  return (
    <Pressable
      style={[styles.button, {height: size, width: size, top: top}]}
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
    borderRadius: 50,
    backgroundColor: '#f7f7f7',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
  },
});
