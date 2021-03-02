import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Form, Schedule } from './Screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AuthStack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthStack.Navigator>
          <AuthStack.Screen name="Schedule" component={Schedule} />
          <AuthStack.Screen name="Form" component={Form} />
        </AuthStack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App
