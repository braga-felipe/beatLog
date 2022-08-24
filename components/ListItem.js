import { Pressable, StyleSheet, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { useBeatContext } from '../context/';
import Expandable from './Expandable';

export default ListItem = ({
  item,
  backgroundColor,
  color,
  select,
  index,
  selectedId,
}) => {
  /* Navigation for Beats and Collections */
  const navigation = useNavigation();

  /* Sounds */
  const { beep, sounds } = useBeatContext();

  /* Animation variables */
  const [isPressed, setIsPressed] = useState(false);

  // refactor for list
  const width = useSharedValue('0%');
  const margin = useSharedValue('0%');
  const animated = useAnimatedStyle(() => {
    return {
      width: width.value,
      marginBottom: margin.value,
    };
  });

  function popUp() {
    /* use diff in setTimeout in case list is Taps */
    const { diff } = item;
    setTimeout(
      () => {
        if (item.isTap) {
          const sound = sounds[item.sound];
          sound.stop();
          sound.setVolume(item.volume);
          sound.play();
        }
        width.value = withSpring('98%');
      },
      /* if not taps, use item's index */
      diff ? diff : index * 150,
    );
  }

  function press() {
    /* changes item theme when selected */
    select();
    if (selectedId === item.id) {
      /* navigate to editor is item is beat*/
      if (item.isBeat) return navigation.navigate('BeatEditor', { beat: item });

      if (isPressed) {
        console.log('isPressed and extended so unextended');
        margin.value = withTiming('0%');
        setTimeout(() => {
          setIsPressed(false);
        }, 300);
      } else {
        /* if it's selected increase margin */
        margin.value = withTiming('20%');
        /* handle rendering of expandable*/
        setIsPressed(true);
      }
    } else {
      margin.value = withTiming('0%');
    }
  }

  useEffect(() => {
    popUp();
    if (selectedId !== item.id) margin.value = withTiming('0%');
  }, [selectedId]);

  return (
    <>
      <Animated.View style={[styles.container, animated]}>
        <Pressable style={[styles.button, { backgroundColor }]} onPress={press}>
          <Text style={[styles.text, { color }]}>{item.name}</Text>
        </Pressable>
      </Animated.View>
      {isPressed && (
        <Expandable
          data={item}
          backgroundColor={backgroundColor}
          color={color}
          selectedId={selectedId}
          margin={margin}
        />
      )}
    </>
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
