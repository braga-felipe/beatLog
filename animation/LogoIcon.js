import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Image} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

export default LogoIcon = () => {
  const [isPressed, setIsPressed] = useState(false);
  const scale = useSharedValue(0);
  const top = useSharedValue('44%');
  const bgColor = useSharedValue('transparent');
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: bgColor.value,
      top: top.value,
      transform: [{scale: scale.value}],
    };
  });
  useEffect(() => {
    setTimeout(() => {
      scale.value = withTiming(1);
    }, 500);
  }, []);
  function onTouch() {
    if (isPressed) {
      scale.value = withTiming(1);
      top.value = withTiming('44%');
      bgColor.value = withTiming('transparent');
    } else {
      scale.value = withTiming(0.2);
      top.value = withTiming('25%');
      bgColor.value = withTiming('white');
    }
    setIsPressed(!isPressed);
  }
  return (
    <Animated.View style={[styles.animated, reanimatedStyle]}>
      <Pressable onPress={onTouch}>
        <Image source={require('../assets/logo.png')} style={styles.image} />
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animated: {
    position: 'absolute',
    alignSelf: 'center',
    borderRadius: 50,
    width: '24%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 90,
    width: 90,
  },
});
