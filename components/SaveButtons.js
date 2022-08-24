import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useBeatContext } from '../context';

export default function SaveButtons({ goBack, reset, beatName }) {
  const { beat, save } = useBeatContext();
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={styles.button}
        onPress={() => {
          save({ ...beat, name: beatName });
          goBack();
        }}>
        <Text style={styles.text}>Save</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={goBack ? goBack : reset}>
        <Text style={styles.text}>Cancel</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '70%',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  button: {
    top: -25,
    borderRadius: 2,
    backgroundColor: 'black',
    height: 45,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
