import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import BeatItem from './BeatItem';

export default BeatList = ({name, list}) => {
  const [selectedId, setSelectedId] = useState(null);

  const opacity = useSharedValue(0);
  const animateContainer = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });
  function render({item}) {
    const renderProps = {
      list,
      backgroundColor: selectedId === item.id ? '#303134' : '#C7C7C7',
      color: selectedId === item.id ? 'white' : 'black',
    };

    return (
      <BeatItem
        beat={item}
        {...renderProps}
        onPress={() => setSelectedId(item.id)}
      />
    );
  }
  useEffect(() => {
    setTimeout(() => {
      opacity.value = withTiming(1);
    }, 200);
    return () => (opacity.value = 0);
  }, []);
  return (
    <>
      {name && <Text style={styles.text}>{name}</Text>}
      <Animated.View style={[styles.container, animateContainer]}>
        <FlatList
          data={list}
          renderItem={render}
          keyExtractor={item => item.id}
        />
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    borderRadius: 5,
    height: '30%',
    width: '95%',
    top: '5%',
    backgroundColor: '#f7f7f7',
  },
  text: {
    top: '5%',
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    left: '3%',
    fontSize: 25,
  },
});
