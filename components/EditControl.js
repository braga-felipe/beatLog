import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

export default EditControl = () => {
  return (
    <Animated.View style={styles.container}>
      <View style={[{ top: '2.5%' }, styles.controlContainer]}>
        <Text style={styles.text}>Volume</Text>
      </View>
      <View style={styles.controlContainer}>
        <Text style={styles.text}>Sound</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    height: '30%',
    width: '95%',
    marginTop: '17.5%',
    backgroundColor: '#f7f7f7',
  },
  text: {
    top: '4%',
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  controlContainer: {
    backgroundColor: '#C7C7C7',
    borderRadius: 5,
    marginVertical: '2%',
    height: '40%',
    width: '95%',
    alignSelf: 'center',
  },
});
