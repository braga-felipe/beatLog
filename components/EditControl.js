import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import EditorButtons from '../components/EditorButtons';

export default EditControl = ({ selectedTap, setSelectedTap, setTaps }) => {
  const [volume, setVolume] = useState(null);
  const [sound, setSound] = useState('-');
  const buttonProps = {
    selectedTap,
    setSelectedTap,
    setTaps,
    setVolume,
    volume,
    sound,
  };
  function update() {
    if (selectedTap !== undefined) {
      setVolume(selectedTap.volume * 10);
      setSound(selectedTap.sound);
    }
  }

  console.log({ selectedTap });
  useEffect(() => update(), [selectedTap]);
  return (
    selectedTap.isTap && (
      <Animated.View style={styles.container}>
        <View style={styles.controlContainer}>
          <Text style={styles.text}>Volume: {volume ? volume : 0}</Text>
          <MultiSlider
            values={[volume ? volume : 0]}
            onValuesChange={v => setVolume(v[0])}
            sliderLength={225}
            selectedStyle={{
              backgroundColor: '#f7f7f7',
              height: '200%',
            }}
          />
        </View>
        <View style={styles.controlContainer}>
          <Text style={styles.text}>Sound: {sound}</Text>
        </View>
        {selectedTap.volume * 10 !== volume && (
          <Animated.View style={styles.buttonContainer}>
            <EditorButtons {...buttonProps} />
          </Animated.View>
        )}
      </Animated.View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    top: '-3%',
    borderRadius: 3,
    height: '40%',
    width: '95%',
    marginVertical: '15.5%',
    backgroundColor: 'black',
  },
  text: {
    color: '#f7f7f7',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  controlContainer: {
    backgroundColor: '#303134',
    borderRadius: 3,
    marginVertical: '2%',
    height: '30%',
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: '9%',
    alignItems: 'center',
  },
});
