import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BeatProvider} from './context';
import Dashboard from './screens/Dashboard';
import Library from './screens/Library';
const Stack = createNativeStackNavigator();
export default App = () => {
  return (
    <BeatProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Library" component={Library} />
        </Stack.Navigator>
      </NavigationContainer>
    </BeatProvider>
  );
};
