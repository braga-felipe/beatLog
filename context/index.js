import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useRef,
} from 'react';
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
  return (
    <BeatContext.Provider
      value={{
        beep,
        listen,
        reset,
        save,
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
