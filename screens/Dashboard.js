import React, { useState } from 'react';
import { View } from 'react-native';

/* components imports */
import BackgroundPulse from '../components/BackgroundPulse';
import Diamond from '../components/Diamond';
import Library from '../screens/Library';
import PlayButtonsView from '../screens/PlayButtonsView';
import SoundIcon from '../components/SoundIcon';

/* Auth */

export default Dashboard = () => {
  /* swtich states to render components conditionally */
  const [isLibrary, setIsLibrary] = useState(false);
  const [isPlay, setIsPlay] = useState(false);

  /* to pass switch as props */
  const props = {
    setIsLibrary,
    isPlay,
    setIsPlay,
  };

  return (
    <View
      style={{ flex: 1, justifyContent: 'center', backgroundColor: 'black' }}>
      {isLibrary ? (
        <>
          {/* User's Space */}
          <Library setIsLibrary={setIsLibrary} />
        </>
      ) : (
        <>
          {/* Dashboard Screen */}
          <BackgroundPulse />
          <Diamond {...props} />
          {isPlay && (
            <>
              {/* Buttons to manage Play */}
              <SoundIcon />
              <PlayButtonsView isPlay={isPlay} setIsPlay={setIsPlay} />
            </>
          )}
        </>
      )}
    </View>
  );
};
