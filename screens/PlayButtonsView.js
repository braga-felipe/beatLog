import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import PlayButton from '../components/PlayButton';
import { useBeatContext } from '../context';
import { useNavigation } from '@react-navigation/native';

export default PlayButtonsView = ({ setIsPlay }) => {
  const navigation = useNavigation();
  const { reset, taps, setBeat } = useBeatContext();
  const bottom = useSharedValue('20%');
  const opacity = useSharedValue(0);
  const container = useAnimatedStyle(() => {
    return {
      bottom: bottom.value,
      opacity: opacity.value,
    };
  });
  function unmountContainer() {
    if (!reset()) {
      opacity.value = withTiming(0);
      setTimeout(() => {
        setIsPlay(false);
      }, 200);
    }
  }
  function mountContainer() {
    bottom.value = withTiming('35%');
    opacity.value = withTiming(1);
  }
  function openModal() {
    setBeat({ taps: taps.current });
    navigation.navigate('Save');
  }
  useEffect(() => {
    setTimeout(() => mountContainer(), 450);
  });
  return (
    <Animated.View style={[styles.container, container]}>
      <PlayButton icon="save" setter={openModal} />
      <PlayButton icon="play" />
      <PlayButton icon="close" setter={unmountContainer} />
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
