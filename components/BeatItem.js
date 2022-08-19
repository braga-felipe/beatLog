import { Pressable, StyleSheet, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { getBeatTaps } from '../services';
import { useBeatContext } from '../context';
export default BeatItem = ({ beat, backgroundColor, color, onPress, list }) => {
  const [taps, setTaps] = useState([]);
  const navigation = useNavigation();
  const { beep } = useBeatContext();
  const width = useSharedValue('0%');
  const pop = useAnimatedStyle(() => {
    return {
      width: width.value,
    };
  });
  function popItem() {
    setTimeout(() => {
      width.value = withSpring('98%');
    }, 100 * list.indexOf(beat));
  }
  async function getTaps() {
    const res = await getBeatTaps(beat);
    console.log({ res });
    setTaps(res);
  }
  function play() {
    taps.forEach(tap =>
      setTimeout(() => {
        beep.play();
      }, tap.diff),
    );
  }
  useEffect(() => {
    getTaps();
    popItem();
  }, []);
  return (
    <Animated.View style={[styles.container, pop]}>
      <Pressable
        style={[styles.button, { backgroundColor }]}
        onPress={() => {
          if (beat.beats) setIsPressed(!isPressed);
          // play();
          navigation.navigate('EditBeat', { beat });
          onPress();
        }}>
        <Text style={[styles.text, { color }]}>{beat.name}</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: '0.5%',
  },
  button: {
    borderRadius: 3,
    marginVertical: '0.5%',
    left: '1%',
    width: '99.5%',
    height: 40,
  },
  text: {
    top: '25%',
    left: '2%',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
