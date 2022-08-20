import React from 'react';
/* Navigation */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
/* Screens */
import Dashboard from './screens/Dashboard';
import Library from './screens/Library';
import SaveModal from './screens/SaveModal';
import BeatEditor from './screens/BeatEditor';
/* Context */
import { BeatProvider } from './context';

const Stack = createNativeStackNavigator();
export default App = () => {
  return (
    <BeatProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Library" component={Library} />
          <Stack.Screen
            name="BeatEditor"
            component={BeatEditor}
            options={{ headerShown: false }}
          />
          <Stack.Group
            screenOptions={{
              presentation: 'transparentModal',
              headerShown: false,
            }}>
            <Stack.Screen name="Save" component={SaveModal} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </BeatProvider>
  );
};
