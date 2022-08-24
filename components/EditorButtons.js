import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import Animated from 'react-native-reanimated';
import { updateTap } from '../services';

export default EditorButtons = ({ selectedTap, volume }) => {
  function save() {
    volume = volume / 10;
    updateTap({ ...selectedTap, volume });
  }
  return (
    <Animated.View style={styles.container}>
      <Pressable style={styles.button} onPress={save}>
        <Text style={styles.text}>Save</Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Text style={styles.text}>Cancel</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    height: '50%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    bottom: '10%',
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#303134',
    width: '40%',
    height: '75%',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
