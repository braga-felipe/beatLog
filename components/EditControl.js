import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import SelectDropdown from 'react-native-select-dropdown';
import EditorButtons from '../components/EditorButtons';

export default EditControl = ({ selectedTap, setSelectedTap, setTaps }) => {
  const [volume, setVolume] = useState(null);
  const [sound, setSound] = useState('-');
  const sounds = ['beep', 'kick', 'openHiHat', 'shortHiHat', 'snareSynth'];
  const opacity =
    selectedTap.volume * 10 !== volume || selectedTap.sound !== sound
      ? 1
      : 0.65;
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
          {/* </View> */}
          {/* <View style={styles.controlContainer}> */}
          <Text style={styles.text}>Sound: </Text>
          <SelectDropdown
            data={sounds}
            onSelect={(selectedSound, index) => {
              setSound(selectedSound);
            }}
            defaultValue={sound}
          />
        </View>

        <Animated.View style={[styles.buttonContainer, { opacity: opacity }]}>
          <EditorButtons {...buttonProps} />
        </Animated.View>
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
    paddingVertical: 10,
    backgroundColor: '#303134',
    borderRadius: 3,
    marginVertical: '2%',
    height: '65%',
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: '9%',
    alignItems: 'center',
  },
});
