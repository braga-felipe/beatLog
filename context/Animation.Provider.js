import React, { createContext, useState, useContext, useRef } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const AnimationContext = createContext(null);

export const AnimationProvider = ({ children }) => {
  const scale = useSharedValue(0);
  return (
    <AnimationContext.Provider value={{ scale, withTiming }}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimationContext = () => useContext(AnimationContext);
