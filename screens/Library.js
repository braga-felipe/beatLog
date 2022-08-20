import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import List from '../components/List';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import BackgroundImage from '../components/BackgroundImage';
import { getBeats, getCollections } from '../services';

export default Library = ({ setIsLibrary }) => {
  /* Lists state */
  const [beatlist, setBeatlist] = useState([]);
  const [collectionList, setCollectionList] = useState([]);

  /* Animation variables*/
  const opacity = useSharedValue(0);
  const value = useSharedValue('100%');
  const animated = useAnimatedStyle(() => {
    return {
      height: value.value,
      width: value.value,
      opacity: opacity.value,
    };
  });

  /* Mount Component */
  function open() {
    setTimeout(() => {
      opacity.value = withTiming(1);
    }, 200);
  }

  /* Unmount Component */
  function close() {
    value.value = withTiming('0%');
    setTimeout(() => {
      setIsLibrary(false);
    }, 200);
  }

  /* Fetch lists and update state */
  function getLists() {
    getBeats(setBeatlist);
    getCollections(setCollectionList);
  }

  useEffect(() => {
    open();
    getLists();
  }, []);

  return (
    /* Animated container to managed the unmount of the Component with the 'close' function
    TODO: ADD COMPONENT HEADER
    */
    <Animated.View style={[styles.container, animated]}>
      <BackgroundImage source={require('../assets/isolines.jpg')}>
        <Text style={styles.text}>Library</Text>
        <List name="Beats" list={beatlist} />
        <List name="Collections" list={collectionList} />
        <View style={styles.buttonContainer}>
          <Pressable onPress={close}>
            <Image
              source={require('../assets/go-back.png')}
              style={styles.image}
            />
          </Pressable>
        </View>
      </BackgroundImage>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: 'black',
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: 'white',
    borderRadius: 50,
    width: '20%',
    height: '9%',
    justifyContent: 'center',
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
