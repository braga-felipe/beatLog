import {Image, StyleSheet} from 'react-native';
import React from 'react';

const Background = () => {
  return (
    <Image source={require('../assets/ripple.gif')} style={styles.image} />
  );
};

export default Background;

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
});
