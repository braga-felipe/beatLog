import React, { createContext, useState, useContext, useRef } from 'react';
import { tapLogger } from '../helpers';
import { postBeat } from '../services';
const BeatContext = createContext(null);
import { useSharedValue } from 'react-native-reanimated';
const Sound = require('react-native-sound');
Sound.setCategory('Playback');

/* Sounds!! */

const openDrumLoop = new Sound(
  'open-drum-loop.wav',
  Sound.MAIN_BUNDLE,
  error => {
    if (error) {
      console.log('failed to load open-drum-loop', error);
      return;
    }
    openDrumLoop.play();
    setTimeout(() => openDrumLoop.stop(), 3000);
    console.log('loaded open-drum-loop successfully');
  },
);
const hiHatLick = new Sound('hit-hat-lick.wav', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load hit-hat-lick', error);
    return;
  }
});
const openHiHat = new Sound('open-hi-hat.wav', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load open-hi-hat', error);
    return;
  }

  console.log('loaded open-hi-hat successfully');
});
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
const shortHiHat = new Sound('shortHiHat.wav', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load shortHiHat', error);
    return;
  }
  console.log('loaded shortHiHat successfully');
});
const snareSynth = new Sound('snare-synth.wav', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load snare-synth', error);
    return;
  }
  console.log('loaded snare-synth successfully');
});

const sounds = {
  snareSynth,
  shortHiHat,
  openDrumLoop,
  hiHatLick,
  openHiHat,
  kick,
  beep,
  welcome,
};

export const BeatProvider = ({ children }) => {
  const [beat, setBeat] = useState({});
  const [isTapped, setIsTapped] = useState(false);
  const [soundSwitch, setSoundSwitch] = useState(true);
  /* ---> Variables for listen function <--- */
  const tapNum = useRef(0);
  const timeArr = useRef([]);
  const taps = useRef([]);

  /* Scale context for Diamond */
  const scale = useSharedValue(0);

  /* Function to log taps */
  function listen() {
    tapLogger(tapNum.current, timeArr.current, taps.current);
    tapNum.current += 1;
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
        dance(scale, cb, isPlay, sounds[tap.sound]);
      }, tap.diff);
    });
  }

  /* Diamond dance function 
    - takes Animation variabes (scale and withTiming cb)
    - isPlay Boolean to control log of taps
  */
  function dance(scale, cb, isPlay, sound) {
    /* If is not playback, log taps */
    if (!isPlay) listen();
    /* TODO: add a switch to either play or not during listen
        i.e. if(soundSwitch) */
    if (soundSwitch) sound ? sound.play() : beep.play();
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
        kick,
        sounds,
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
        scale,
        soundSwitch,
        setSoundSwitch,
      }}>
      {children}
    </BeatContext.Provider>
  );
};

export const useBeatContext = () => useContext(BeatContext);
