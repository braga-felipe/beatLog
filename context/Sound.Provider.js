import React, { useContext, createContext } from 'react';
const Sound = require('react-native-sound');
const SoundContext = createContext(null);

Sound.setCategory('Playback');
export const SoundProvider = ({ children }) => {
  const kick = new Sound('kick.wav', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load kick', error);
      return;
    }
    console.log('loaded kick successfully');
  });
  const welcome = new Sound('opening-cymbal.wav', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load opening cymbal', error);
      return;
    }
    console.log('loaded opening cymbal successfully');
  });
  const beep = new Sound('beep.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load beep', error);
      return;
    }
    console.log('loaded beep successfully');
  });

  const sounds = { kick, welcome, beep };
  return (
    <SoundContext.Provider value={sounds}>{children}</SoundContext.Provider>
  );
};

export const useSoundContext = useContext(SoundContext);
