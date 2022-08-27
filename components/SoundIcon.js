import React, { useState } from 'react';
import { StyleSheet, Text, Image, View, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useBeatContext } from '../context';
export default SoundIcon = () => {
  const { soundSwitch, setSoundSwitch } = useBeatContext();
  const opacity = soundSwitch ? 1 : 0.6;
  const animated = useAnimatedStyle(() => {
    return {};
  });
  function soundOnOff() {
    setSoundSwitch(!soundSwitch);
  }
  return (
    <Animated.View style={[styles.container, animated, { opacity: opacity }]}>
      <Pressable onPress={soundOnOff}>
        <Image source={require('../assets/sound.png')} style={styles.image} />
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 100,
    right: 25,
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 50,
  },
  image: {
    width: 65,
    height: 65,
  },
});
