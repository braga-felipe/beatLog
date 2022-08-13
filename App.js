import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from './screens/Dashboard';
// import Library from './screens/Library';
const Stack = createNativeStackNavigator();
export default App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{headerShown: false}}
        />
        {/* TODO: remove from stack?
        <Stack.Screen name="Library" component={Library} /> 
         */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
