import {FlatList, Pressable, StyleSheet, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {getCollectionBeats} from '../services';

export default Expandable = ({
  collection,
  backgroundColor,
  color,
  onPress,
  list,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [beats, setBeats] = useState([]);
  const width = useSharedValue('0%');
  const height = useSharedValue('0%');
  const margin = useSharedValue('1%');
  const container = useSharedValue(40);
  const opacity = useSharedValue(0);
  const beatStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });
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
    }, 100 * list.indexOf(collection));
  }
  
  function expand() {
    addBeats();
    if (!isPressed) {
      container.value = withTiming(120);
      height.value = withTiming('100%');
      margin.value = withTiming('11%');
      setTimeout(() => {
        opacity.value = withTiming(1);
      }, 300);
    } else {
      opacity.value = withTiming(0);
      setTimeout(() => {
        container.value = withTiming(40);
        height.value = withTiming('0%');
        margin.value = withTiming('1%');
      }, 300);
    }
    setIsPressed(!isPressed);
  }
  async function addBeats() {
    if (!beats.length) {
      const res = await getCollectionBeats(collection);
      console.log({res});
      setBeats(res);
    }
  }
  useEffect(() => {
    popItem();
  }, []);
  return (
    <Animated.View style={[styles.container, pop]}>
      <Pressable
        style={[styles.button, {backgroundColor}]}
        onPress={() => {
          setTimeout(
            () => {
              expand();
              onPress();
            },
            !beats.length ? 250 : 0,
          );
        }}>
        <Text style={[beatStyle, styles.text, {color}]}>{collection.name}</Text>
      </Pressable>
      <Animated.View style={[styles.expandable, expandable]}>
        <FlatList
          data={beats}
          renderItem={({item}) => (
            <Text
              style={{
                left: '3%',
                color: 'white',
                fontSize: 15,
                fontWeight: 'bold',
              }}>
              {item.name}
            </Text>
          )}
        />
      </Animated.View>
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
    top: 35,
    position: 'absolute',
    width: '99.5%',
    marginbottom: '1.5%',
  },
});
