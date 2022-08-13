import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import PlayButton from '../components/PlayButton';

export default PlayButtonsView = ({setIsPlay}) => {
  console.log({setIsPlay});
  return (
    <Animated.View style={styles.container}>
      <Animated.View style={styles.save}>
        <PlayButton icon="◘" />
      </Animated.View>
      <Animated.View style={[styles.play]}>
        <PlayButton icon="▶︎" />
      </Animated.View>
      <Animated.View style={styles.exit}>
        <PlayButton icon="✖︎" setter={setIsPlay} />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    left: '30%',
    bottom: '35%',
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  save: {},
  play: {},
  exit: {},
});
