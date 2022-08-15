import {Pressable, StyleSheet, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

export default BeatItem = ({beat, backgroundColor, color, onPress, list}) => {
  const width = useSharedValue('0%');
  const pop = useAnimatedStyle(() => {
    return {
      width: width.value,
    };
  });
  function popItem() {
    setTimeout(() => {
      width.value = withSpring('98%');
      //TODO: make sure this uses something other than the index
    }, 100 * list.indexOf(beat));
  }
  useEffect(() => {
    popItem();
  }, []);
  return (
    <Animated.View style={[styles.container, pop]}>
      <Pressable
        style={[styles.button, {backgroundColor}]}
        onPress={() => {
          if (beat.beats) setIsPressed(!isPressed);
          onPress();
        }}>
        <Text style={[styles.text, {color}]}>{beat.name}</Text>
        <Animated.View></Animated.View>
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
