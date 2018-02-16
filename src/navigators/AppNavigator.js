import React from 'react';
import { StackNavigator } from 'react-navigation';
import { AppRegistry } from 'react-native';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LandingScreen from '../screens/LandingScreen';

export const AppNavigator = StackNavigator({
  LoginScreen: { screen: LoginScreen },
  Register: { screen: RegisterScreen },
  Landingscreen: { screen: LandingScreen }
  
});