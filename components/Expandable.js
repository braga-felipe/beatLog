import {Pressable, StyleSheet, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

export default Expandable = ({beat, backgroundColor, color, onPress, list}) => {
  const [isPressed, setIsPressed] = useState(false);
  const width = useSharedValue('0%');
  const height = useSharedValue('0%');
  const margin = useSharedValue('1%');
  const container = useSharedValue(40);
  const expandable = useAnimatedStyle(() => {
    return {
      backgroundColor,
      height: height.value,
    };
  });

  const pop = useAnimatedStyle(() => {
    return {
      marginVertical: margin.value,
      height: container.value,
      width: width.value,
    };
  });
  function popItem() {
    setTimeout(() => {
      width.value = withSpring('98%');
      //TODO: make sure this uses something other than the index
    }, 100 * list.indexOf(beat));
  }
  function expand() {
    if (!isPressed) {
      container.value = withTiming(120);
      height.value = withTiming('100%');
      margin.value = withTiming('11%');
    } else {
      container.value = withTiming(40);
      height.value = withTiming('0%');
      margin.value = withTiming('1%');
    }
    setIsPressed(!isPressed);
  }
  useEffect(() => {
    popItem();
  }, []);
  return (
    <Animated.View style={[styles.container, pop]}>
      <Pressable
        style={[styles.button, {backgroundColor}]}
        onPress={() => {
          expand();
          onPress();
        }}>
        <Text style={[styles.text, {color}]}>{beat.name}</Text>
      </Pressable>
      <Animated.View style={[styles.expandable, expandable]}></Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: '0.5%',
    marginVertical: '1%',
  },
  button: {
    borderRadius: 3,
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
  expandable: {
    borderRadius: 3,
    left: '1.3%',
    top: 37,
    position: 'absolute',
    width: '99.5%',
    marginbottom: '1.5%',
  },
});
