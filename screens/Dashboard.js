import React from 'react';
import {View} from 'react-native';

import Background from '../components/Background';
import LogoIcon from '../animation/LogoIcon';

export default Dashboard = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Background />
      <LogoIcon />
    </View>
  );
};
