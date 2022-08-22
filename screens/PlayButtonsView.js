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

  /* Beat state */
  const { reset, taps, setBeat, play, scale } = useBeatContext();

  /* Animation variables */
  // const scale = useSharedValue(0);
  const bottom = useSharedValue('20%');
  const opacity = useSharedValue(0);
  const container = useAnimatedStyle(() => {
    return {
      bottom: bottom.value,
      opacity: opacity.value,
    };
  });

  /* Mount Component */
  function open() {
    bottom.value = withTiming('35%');
    opacity.value = withTiming(1);
  }

  /* Unmount Component */
  function close() {
    /* Close Component only when there are no taps recorded */
    if (!reset()) {
      opacity.value = withTiming(0);
      setTimeout(() => {
        setIsPlay(false);
      }, 200);
    }
  }

  /* Update beat state and  open modal */
  function openSaveModal() {
    setBeat({ taps: taps.current });
    navigation.navigate('Save');
  }

  useEffect(() => {
    setTimeout(() => open(), 450);
  });
  return (
    <Animated.View style={[styles.container, container]}>
      <PlayButton icon="save" setter={openSaveModal} />
      <PlayButton icon="play" setter={() => play(scale, withTiming, true)} />
      <PlayButton icon="close" setter={close} />
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
