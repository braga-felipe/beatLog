import React from 'react';
import { StyleSheet, SafeAreaView, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default BackgroundImage = ({ source, children }) => {
  return (
    <ImageBackground source={source} resizeMode="cover" style={styles.image}>
      <LinearGradient
        colors={['black', 'white']}
        style={styles.linearGradient}
      />
      <SafeAreaView style={styles.container}>{children}</SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
  },
  linearGradient: {
    height: '100%',
    opacity: 0.65,
  },
  container: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
  },
});
