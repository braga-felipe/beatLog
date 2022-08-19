import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

export default EditBeat = ({ route }) => {
  const { beat } = route.params;

  return (
    <View>
      <ImageBackground
        source={require('../assets/edit-bg.jpg')}
        resizeMode="cover"
        style={styles.image}>
        <Text style={styles.text}>{beat.name}</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    top: '5%',
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    opacity: 0.7,
  },
});
