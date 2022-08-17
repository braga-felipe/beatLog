import React, { createContext, useState, useContext, useRef } from 'react';
import { tapLogger } from '../helpers';
import { postBeat } from '../services';
const BeatContext = createContext(null);
const Sound = require('react-native-sound');
Sound.setCategory('Playback');

export const BeatProvider = ({ children }) => {
  /* Sounds!! */
  const beep = new Sound('beep.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    console.log('loaded sound successfully');
  });

  const [beat, setBeat] = useState({});
  const [isTapped, setIsTapped] = useState(false);
  /* ---> variables for listen function <--- */
  /* ---> using useRef to prevent rerendering(?) <--- */
  const tapNum = useRef(0);
  const timeArr = useRef([]);
  const taps = useRef([]);

  function listen() {
    tapLogger(tapNum.current, timeArr.current, taps.current);
    tapNum.current += 1;
    console.log('taps:', taps.current);
  }

  function reset() {
    if (taps.current.length) {
      tapNum.current = 0;
      timeArr.current = [];
      taps.current = [];
      setIsTapped(false);
      return true;
    }
  }

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
        // console.log(tap.diff);
      }, tap.diff);
    });
  }

  function dance(scale, cb, isPlay) {
    if (!isPlay) listen();
    beep.play();
    // to switch rendering of back button
    setIsTapped(true);
    scale.value = cb(0.85, { duration: 50 });
    setTimeout(() => {
      scale.value = cb(1, { duration: 50 });
    }, 50);
  }

  return (
    <BeatContext.Provider
      value={{
        beep,
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
