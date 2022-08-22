import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { updateTap } from '../services';
export default EditControl = ({ selectedTap, setSelectedTap }) => {
  const [volume, setVolume] = useState('');
  const [sound, setSound] = useState('-');

  function update() {
    if (selectedTap !== undefined) {
      setVolume(selectedTap.volume * 10);
      setSound(selectedTap.sound);
    }
  }
  useEffect(() => update(), [selectedTap]);
  return (
    <Animated.View style={styles.container}>
      <View style={styles.controlContainer}>
        <Text style={styles.text}>Volume: {volume ? volume : 0}</Text>
        <MultiSlider
          values={[volume ? volume : 0]}
          onValuesChange={setVolume}
        />
      </View>
      <View style={styles.controlContainer}>
        <Text style={styles.text}>Sound: {sound}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    height: '45%',
    width: '95%',
    marginTop: '17.5%',
    backgroundColor: '#f7f7f7',
  },
  text: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  controlContainer: {
    top: '2.5%',
    backgroundColor: '#C7C7C7',
    borderRadius: 3,
    marginVertical: '2%',
    height: '30%',
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
