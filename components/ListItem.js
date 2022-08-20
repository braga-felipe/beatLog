import { Pressable, StyleSheet, Text } from 'react-native';
import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { useBeatContext } from '../context/';
export default ListItem = ({ item, backgroundColor, color, select, index }) => {
  /* Navigation for Beats and Collections */
  const navigation = useNavigation();

  /* Sounds */
  const { beep } = useBeatContext();

  /* Animation variables */
  const width = useSharedValue('0%');
  const animated = useAnimatedStyle(() => {
    return {
      width: width.value,
    };
  });
  function popUp() {
    /* use diff in setTimeout in case list is Taps */
    const { diff } = item;
    // TODO: use different animation for taps
    setTimeout(
      () => {
        if (item.isTap) beep.play();
        width.value = withSpring('98%');
      },
      /* if not taps, use item's index */
      diff ? diff : index * 150,
    );
  }

  useEffect(() => popUp(), []);
  return (
    <Animated.View style={[styles.container, animated]}>
      <Pressable
        style={[styles.button, { backgroundColor }]}
        onPress={() => {
          /* changes item theme when selected */
          select();
          if (item.isBeat) navigation.navigate('BeatEditor', { beat: item });
          //TODO: create expandable for Taps and Collections
        }}>
        <Text style={[styles.text, { color }]}>{item.name}</Text>
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
