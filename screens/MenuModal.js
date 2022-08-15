import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import MenuItem from '../components/MenuItem';

export default MenuModal = props => {
  const {onTouch, setIsLibrary, setIsPlay, isAnimated, setIsAnimated} = props;

  const modalBgColor = useSharedValue('#f7f7f7');
  const modalTop = useSharedValue('34%');
  const width = useSharedValue('0%');
  const height = useSharedValue('0%');
  const iconOpacity = useSharedValue(0);
  const buttonProps = {
    width,
    height,
    modalTop,
    modalBgColor,
    onTouch,
  };
  const animated = useAnimatedStyle(() => {
    return {
      backgroundColor: modalBgColor.value,
      top: modalTop.value,
      width: width.value,
      height: height.value,
    };
  });
  const icons = useAnimatedStyle(() => {
    return {opacity: iconOpacity.value};
  });
  function onAnimate() {
    if (!isAnimated) {
      width.value = withTiming('80%');
      height.value = withTiming('20%');
      setTimeout(() => {
        iconOpacity.value = withTiming(1);
      }, 300);
    } else {
      iconOpacity.value = withTiming(0);
      setTimeout(() => {
        height.value = withTiming('5%');
        width.value = withTiming('0%');
      }, 200);
      setTimeout(() => {
        setIsAnimated(!isAnimated);
      }, 500);
    }
  }
  useEffect(() => {
    onAnimate();
  }, [isAnimated]);

  return (
    <Animated.View style={[styles.container, animated]}>
      <Animated.View style={[styles.iconContainer, icons]}>
        <MenuItem
          icon={require('../assets/dash-icon.png')}
          name="Library"
          setView={setIsLibrary}
          {...buttonProps}
        />
        <MenuItem
          icon={require('../assets/play-icon.png')}
          name="Play"
          setView={setIsPlay}
          {...buttonProps}
        />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    borderRadius: 3,
  },
  iconContainer: {
    top: '6%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
