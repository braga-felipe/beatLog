import { Pressable, StyleSheet, Image } from 'react-native';
import React, { useEffect } from 'react';
import { useBeatContext } from '../context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

export default PlayButton = ({ icon, setter }) => {
  const size = icon === 'play' ? 80 : 65;
  const top = icon === 'play' ? 0 : 15;
  const { isTapped } = useBeatContext();
  const scale = useSharedValue(0.5);
  const hidden = useSharedValue(0.5);
  const opacity = useAnimatedStyle(() => {
    return {
      opacity: hidden.value,
    };
  });
  const animated = useAnimatedStyle(() => {
    return {
      width: size,
      transform: [{ scale: scale.value }],
    };
  });
  function pop() {
    if (!isTapped) {
      hidden.value = withTiming(0.5);
    } else {
      hidden.value = withTiming(1);
    }
    scale.value = withTiming(0.75, { duration: 150 });
    setTimeout(() => {
      scale.value = withTiming(1, { duration: 150 });
    }, 150);
  }

  useEffect(() => {
    pop();
  }, [isTapped]);
  return (
    <Animated.View style={icon === 'save' ? [opacity, animated] : animated}>
      <Pressable
        style={[styles.button]}
        onPress={() => {
          if (icon === 'close') {
            setter();
          } else {
            if (isTapped) setter();
          }
        }}>
        {
          <Image
            source={
              icon === 'play' && isTapped
                ? require('../assets/play-white.png')
                : icon === 'play'
                ? require('../assets/play.png')
                : icon === 'close' && isTapped
                ? require('../assets/back.png')
                : icon === 'close'
                ? require('../assets/add-new.png')
                : require('../assets/add-new.png')
            }
            style={[
              {
                height: size,
                width: size,
                top: top,
              },
              icon === 'close'
                ? isTapped
                  ? { width: 75, height: 75 }
                  : { transform: [{ rotate: '45deg' }] }
                : '',
              styles.image,
            ]}
          />
        }
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: 50,
  },
});
