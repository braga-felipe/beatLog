import { StyleSheet, Image, Text, Pressable } from 'react-native';
import React from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

export default MenuItem = props => {
  const { navigate } = useNavigation();

  /* props to control animation */
  const {
    icon,
    name,
    width,
    height,
    modalTop,
    modalBgColor,
    setView,
    onTouch,
  } = props;
  /* to control scale animation */
  const scale = useSharedValue(1);
  const button = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  /* function to animate Library button and render Component */
  function onLibrary() {
    navigate('Auth');
    scale.value = withTiming(160, { duration: 500 });
    modalTop.value = withTiming(0);
    width.value = withTiming('100%');
    height.value = withTiming('100%');
    modalBgColor.value = withTiming('black');
    setTimeout(() => {
      setView(name);
    }, 300);
  }
  /* function to close the modal and bring up Play buttons */
  function onPlay() {
    onTouch();
    /* TODO: add loginc for rendering Play buttons */
    setView(true);
  }
  return (
    <Animated.View style={[button]}>
      <Pressable
        onPress={() => {
          name === 'Library' ? onLibrary() : onPlay();
        }}>
        <Image source={icon} style={styles.image} />
        <Text style={styles.iconText}>{name}</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  iconText: {
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
  },
  image: {
    height: 100,
    width: 100,
  },
});
