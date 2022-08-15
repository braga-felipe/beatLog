import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BeatList from '../components/BeatList';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
let beatlist = [
  {id: '1', name: 'Club'},
  {id: '2', name: 'Funk'},
  {id: '3', name: 'Hard Bop'},
  {id: '4', name: 'Samba'},
  {id: '5', name: 'Mambo'},
  {id: '6', name: 'Tresillo'},
];
let collectionlist = [
  {
    id: '7',
    name: 'Favorites',
    beats: [
      {id: '2', name: 'Funk'},
      {id: '4', name: 'Samba'},
    ],
  },
  {
    id: '8',
    name: 'Rhythm Study',
    beats: [
      {id: '3', name: 'Hard Bop'},
      {id: '5', name: 'Mambo'},
      {id: '6', name: 'Tresillo'},
    ],
  },
];

export default Library = ({setIsLibrary}) => {
  const opacity = useSharedValue(1);
  const value = useSharedValue('100%');
  const unmount = useAnimatedStyle(() => {
    return {
      height: value.value,
      width: value.value,
      opacity: opacity.value,
    };
  });

  function close() {
    opacity.value = withTiming(0);
    value.value = withTiming('0%');
    setTimeout(() => {
      setIsLibrary(false);
    }, 200);
  }
  return (
    <Animated.View style={[styles.container, unmount]}>
      <Text style={styles.text}>Library</Text>
      <BeatList name="Beats" list={beatlist} unmount={unmount} />
      <BeatList name="Collections" list={collectionlist} unmount={unmount} />
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 50,
          width: '20%',
          height: '9%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Pressable onPress={close}>
          <Image source={require('../assets/back.png')} style={styles.image} />
        </Pressable>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: 'black',
    alignItems: 'center',
  },
  text: {
    top: '5%',
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  image: {
    height: 85,
    width: 85,
  },
});
