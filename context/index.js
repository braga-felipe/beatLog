import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useRef,
} from 'react';
import { tapLogger } from '../helpers';

const BeatContext = createContext({
  listen: () => {},
  reset: () => {},
  beat: {},
});

export const BeatProvider = ({ children }) => {
  const [beat, setBeat] = useState({});
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
      return true;
    }
  }

  return (
    <BeatContext.Provider value={{ listen, reset, beat }}>
      {children}
    </BeatContext.Provider>
  );
};

export const useBeatContext = () => useContext(BeatContext);
