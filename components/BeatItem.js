import {Pressable, StyleSheet, Text} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

export default BeatItem = ({beat, backgroundColor, color, onPress}) => {
  const width = useSharedValue('0%');
  const pop = useAnimatedStyle(() => {
    return {
      width: width.value,
    };
  });

  function popItem() {
    setTimeout(() => {
      width.value = withSpring('98%');
    }, 100 * beat.id);
  }
  useEffect(() => {
    popItem();
  }, []);
  return (
    <Animated.View style={[styles.container, pop]}>
      <Pressable style={[styles.button, {backgroundColor}]} onPress={onPress}>
        <Text style={[styles.text, {color}]}>{beat.name}</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  button: {
    borderRadius: 3,
    marginVertical: '0.5%',
    left: '1%',
    width: '98%',
    height: 40,
  },
  text: {
    top: '25%',
    left: '2%',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
