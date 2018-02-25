import React from 'react';
import { StackNavigator } from 'react-navigation';
import { AppRegistry } from 'react-native';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LandingScreen from '../screens/LandingScreen';
import DetailScreen from '../screens/DetailScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import MapScreen from '../screens/MapScreen';

export const AppNavigator = StackNavigator({
	LandingScreen: { screen: LandingScreen },
	LeaderboardScreen: { screen: LeaderboardScreen },
	LoginScreen: { screen: LoginScreen },
	Register: { screen: RegisterScreen },
	DetailScreen: { screen: DetailScreen },
	LeaderboardScreen: { screen: LeaderboardScreen },
	MapScreen: { screen: MapScreen }
});