import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BeatProvider } from './context';
import { AnimationProvider } from './context/Animation.Provider';
import Dashboard from './screens/Dashboard';
import Library from './screens/Library';
import SaveModal from './screens/SaveModal';
const Stack = createNativeStackNavigator();
export default App = () => {
  return (
    <BeatProvider>
      <AnimationProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Library" component={Library} />
            <Stack.Group
              screenOptions={{
                presentation: 'transparentModal',
                headerShown: false,
              }}>
              <Stack.Screen name="Save" component={SaveModal} />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </AnimationProvider>
    </BeatProvider>
  );
};
