import React from 'react';
import { StackNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LandingScreen from '../screens/LandingScreen';

export const AppNavigator = StackNavigator({
  LoginScreen: { screen: LoginScreen },
  Registerscreen: { screen: RegisterScreen },
  Landingscreen: { screen: LandingScreen }
  
});