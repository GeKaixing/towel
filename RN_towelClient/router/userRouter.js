// UserStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserProfile from '../components/User';
import Login from '../components/UserLoginSignupComponents/Login';
import Signup from '../components/UserLoginSignupComponents/Signup';

const Stack = createStackNavigator();

function UserStack() {
  return (
    <Stack.Navigator initialRouteName="UserProfile">
      <Stack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}

export default UserStack;

