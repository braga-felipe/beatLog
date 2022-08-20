import React, { createContext, useState, useContext, useRef } from 'react';
import { tapLogger } from '../helpers';
import { postBeat } from '../services';
const BeatContext = createContext(null);
const Sound = require('react-native-sound');
Sound.setCategory('Playback');

/* Sounds!! */
const kick = new Sound('kick.wav', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load kick', error);
    return;
  }
  // kick.play();
  console.log('loaded kick successfully');
});
const welcome = new Sound('opening-cymbal.wav', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load opening cymbal', error);
    return;
  }
  // welcome.play();
  console.log('loaded opening cymbal successfully');
});
const beep = new Sound('beep.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load beep', error);
    return;
  }
  console.log('loaded beep successfully');
});

export const BeatProvider = ({ children }) => {
  const [beat, setBeat] = useState({});
  const [isTapped, setIsTapped] = useState(false);

  /* ---> Variables for listen function <--- */
  const tapNum = useRef(0);
  const timeArr = useRef([]);
  const taps = useRef([]);

  /* Function to log taps */
  function listen() {
    tapLogger(tapNum.current, timeArr.current, taps.current);
    tapNum.current += 1;
    console.log('taps:', taps.current);
  }

  /* Function to reset current taps state*/
  function reset() {
    if (taps.current.length) {
      tapNum.current = 0;
      timeArr.current = [];
      taps.current = [];
      setIsTapped(false);
      return true;
    }
  }
  /* POST beat and reset the state */
  function save(beat) {
    postBeat(beat);
    setBeat({});
    reset();
  }

  //TODO: refactor play function to use taps if passed
  function play(scale, cb, isPlay) {
    taps.current.forEach(tap => {
      setTimeout(() => {
        isPlay ? dance(scale, cb, isPlay) : beep.play();
      }, tap.diff);
    });
  }

  /* Diamond dance function 
    - takes Animation variabes (scale and withTiming cb)
    - isPlay Boolean to control log of taps
  */
  function dance(scale, cb, isPlay) {
    /* If is not playback, log taps */
    if (!isPlay) listen();
    /* TODO: add a switch to either play or not during listen
        i.e. if(soundSwitch) */
    beep.play();
    /* Controls rendering of back/close button */
    setIsTapped(true);
    /* Dance animation */
    scale.value = cb(0.85, { duration: 50 });
    setTimeout(() => {
      scale.value = cb(1, { duration: 50 });
    }, 50);
  }

  return (
    <BeatContext.Provider
      value={{
        beep,
        welcome,
        listen,
        reset,
        save,
        play,
        dance,
        taps,
        beat,
        setBeat,
        isTapped,
        setIsTapped,
      }}>
      {children}
    </BeatContext.Provider>
  );
};

export const useBeatContext = () => useContext(BeatContext);
