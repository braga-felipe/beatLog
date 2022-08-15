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
  function unmountContainer() {
    opacity.value = withTiming(0);
    setTimeout(() => {
      setIsPlay(false);
    }, 200);
  }
  function mountContainer() {
    bottom.value = withTiming('35%');
    opacity.value = withTiming(1);
  }
  useEffect(() => {
    setTimeout(() => mountContainer(), 450);
  });
  return (
    <Animated.View style={[styles.container, container]}>
      <Animated.View>
        <PlayButton icon="save" />
      </Animated.View>
      <Animated.View>
        <PlayButton icon="play" />
      </Animated.View>
      <Animated.View>
        <PlayButton icon="close" setter={unmountContainer} />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: '63%',
    alignSelf: 'center',
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
