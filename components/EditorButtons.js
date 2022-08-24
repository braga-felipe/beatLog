import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { updateTap } from '../services';

export default EditorButtons = ({
  setTaps,
  setSelectedTap,
  selectedTap,
  volume,
  setVolume,
}) => {
  function save() {
    const updatedTap = { ...selectedTap, volume: volume / 10 };
    console.log({ updatedTap });
    updateTap(updatedTap);
    setTaps(prev => [
      ...prev.filter(tap => tap.id !== updatedTap.id),
      updatedTap,
    ]);
  }
  function cancel() {
    setVolume(selectedTap.volume * 10);
  }

  // useEffect(() => {}, []);

  return (
    <Animated.View style={styles.container}>
      <Pressable style={styles.button} onPress={save}>
        <Text style={styles.text}>Save</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={cancel}>
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
