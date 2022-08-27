import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { updateTap } from '../services';

export default EditorButtons = ({
  setTaps,
  setSelectedTap,
  selectedTap,
  volume,
  sound,
  setVolume,
}) => {
  const scale1 = useSharedValue(1);
  const animated1 = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale1.value }],
    };
  });
  const scale2 = useSharedValue(1);
  const animated2 = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale2.value }],
    };
  });

  function bounce(scale) {
    scale.value = withTiming(0.75, { duration: 150 });
    setTimeout(() => {
      scale.value = withTiming(1, { duration: 150 });
    }, 150);
  }

  function save() {
    bounce(scale1);
    const updatedTap = { ...selectedTap, volume: volume / 10, sound };
    console.log({ updatedTap });
    updateTap(updatedTap);
    setTaps(prev => [
      ...prev.filter(tap => tap.id !== updatedTap.id),
      updatedTap,
    ]);
    setSelectedTap(updatedTap);
  }
  function cancel() {
    bounce(scale2);
    setVolume(selectedTap.volume * 10);
  }

  return (
    <Animated.View style={styles.container}>
      <Animated.View style={[styles.button, animated1]}>
        <Pressable onPress={save}>
          <Text style={styles.text}>Save</Text>
        </Pressable>
      </Animated.View>
      <Animated.View style={[styles.button, animated2]}>
        <Pressable onPress={cancel}>
          <Text style={styles.text}>Cancel</Text>
        </Pressable>
      </Animated.View>
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
