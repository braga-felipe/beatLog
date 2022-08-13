import React, {useState} from 'react';
import {View} from 'react-native';
/* components imports */
import Background from '../components/Background';
import LogoIcon from '../animation/LogoIcon';
import Library from '../screens/Library';

export default Dashboard = () => {
  /* swtich states to render components conditionally */
  const [isLibrary, setIsLibrary] = useState(false);
  const [isPlay, setIsPlay] = useState(false);

  /* to pass switch as props */
  const props = {
    setIsLibrary,
    setIsPlay,
  };
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      {isLibrary ? (
        <>
          {/* User's Space */}
          <Library />
        </>
      ) : isPlay ? (
        <>
          {/* TODO: Buttons to manage Play */}
          ''
        </>
      ) : (
        <>
          {/* Dashboard Screen */}
          <Background />
          <LogoIcon {...props} />
        </>
      )}
    </View>
  );
};
