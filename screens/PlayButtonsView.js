import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import PlayButton from '../components/PlayButton';

export default PlayButtonsView = ({setIsPlay}) => {
  const bottom = useSharedValue('20%');
  const opacity = useSharedValue(0);
  const container = useAnimatedStyle(() => {
    return {
      bottom: bottom.value,
      opacity: opacity.value,
    };
  });
  function mountContainer() {
    bottom.value = withTiming('35%');
    opacity.value = withTiming(1);
  }
  useEffect(() => {
    setTimeout(() => mountContainer(), 450);
  });
  return (
    <Animated.View style={[styles.container, container]}>
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
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
  },
  save: {},
  play: {},
  exit: {},
});
