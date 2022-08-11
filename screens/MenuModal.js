import React, {useEffect} from 'react';
import {StyleSheet, Text, Image, Pressable} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
export default MenuModal = ({isAnimated, setIsAnimated}) => {
  const width = useSharedValue('0%');
  const height = useSharedValue('0%');
  const opacity = useSharedValue(0);
  const animated = useAnimatedStyle(() => {
    return {
      width: width.value,
      height: height.value,
    };
  });
  const icons = useAnimatedStyle(() => {
    return {opacity: opacity.value};
  });
  function onAnimate() {
    if (!isAnimated) {
      width.value = withTiming('80%');
      height.value = withTiming('20%');
      setTimeout(() => {
        opacity.value = withTiming(1, {duration: 500});
      }, 400);
    } else {
      opacity.value = withTiming(0, {duration: 200});
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
      {
        <Animated.View
          style={[
            {top: '6%', flexDirection: 'row', justifyContent: 'space-around'},
            icons,
          ]}>
          <Pressable>
            <Image
              source={require('../assets/dash-icon.png')}
              style={styles.image}
            />
            <Text style={styles.iconText}>Library</Text>
          </Pressable>
          <Pressable>
            <Image
              source={require('../assets/play-icon.png')}
              style={styles.image}
            />
            <Text style={styles.iconText}>Play</Text>
          </Pressable>
        </Animated.View>
      }
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    top: '34%',
    position: 'absolute',
    borderRadius: 3,
    backgroundColor: '#f7f7f7',
  },
  iconText: {
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    alignSelf: 'center',
  },
  image: {
    height: 100,
    width: 100,
  },
});
