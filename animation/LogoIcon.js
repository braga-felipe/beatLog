import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Image, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useBeatContext } from '../context';

import MenuModal from '../screens/MenuModal';
export default LogoIcon = ({ setIsLibrary, setIsPlay, isPlay }) => {
  const { listen, setIsTapped, beep } = useBeatContext();
  const [isPressed, setIsPressed] = useState(false);
  const [isBlack, setIsBlack] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const scale = useSharedValue(0);
  const top = useSharedValue('44%');
  const bgColor = useSharedValue('transparent');
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: bgColor.value,
      top: top.value,
      transform: [{ scale: scale.value }],
    };
  });
  const modalProps = {
    isPlay,
    setIsLibrary,
    setIsPlay,
    isAnimated,
    setIsAnimated,
    onTouch,
  };

  function onTouch() {
    if (isPressed) {
      setIsAnimated(true);
      setTimeout(() => {
        setIsModal(!isModal);
        scale.value = withTiming(1);
        top.value = withTiming('44%');
        bgColor.value = withTiming('transparent');
        setIsBlack(!isBlack);
      }, 500);
    } else {
      // change icon size
      scale.value = withTiming(0.2);
      // move icon up
      top.value = withTiming('25%');
      // backgroundColor white
      bgColor.value = withTiming('#f7f7f7');
      // wait for change in background
      setTimeout(() => {
        // change to black icon
        setIsBlack(true);
      }, 200);
      // wait for change in icon
      setTimeout(() => {
        // open modal
        setIsModal(true);
      }, 250);
    }
    // switch isPressed on/off
    setIsPressed(!isPressed);
  }
  function dance() {
    beep.play();
    listen();
    // to switch rendering of back button
    setIsTapped(true);
    scale.value = withTiming(0.85, { duration: 50 });
    setTimeout(() => {
      scale.value = withTiming(1, { duration: 50 });
    }, 50);
  }
  // handles icon scale on mount
  useEffect(() => {
    // setTimeout to wait for ripples to load
    setTimeout(() => {
      scale.value = withTiming(1);
    }, 500);
  }, []);

  return (
    <>
      <Animated.View style={[styles.animated, reanimatedStyle]}>
        <Pressable onPress={isPlay ? dance : onTouch}>
          <Image
            source={
              isBlack
                ? require('../assets/logo-black.png')
                : require('../assets/logo.png')
            }
            style={styles.image}
          />
        </Pressable>
      </Animated.View>
      {isModal ? <MenuModal {...modalProps} /> : null}
    </>
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
