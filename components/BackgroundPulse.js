import { Image, StyleSheet } from 'react-native';
import React from 'react';

export default BackgroundPulse = () => {
  return (
    <Image source={require('../assets/ripple.gif')} style={styles.image} />
  );
};

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
});
