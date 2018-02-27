import React from 'react';
import { StackNavigator } from 'react-navigation';
import { AppRegistry } from 'react-native';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LandingScreen from '../screens/LandingScreen';
import DetailScreen from '../screens/DetailScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import MapScreen from '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingScreen from '../screens/SettingScreen';
import BadgeScreen from '../screens/BadgeScreen';

export const AppNavigator = StackNavigator({

	LandingScreen: { screen: LandingScreen },
	LoginScreen: { screen: LoginScreen },
	RegisterScreen: { screen: RegisterScreen },

	
	DetailScreen: { screen: DetailScreen },
	BadgeScreen: { screen: BadgeScreen },
	MapScreen: { screen: MapScreen },
	LeaderboardScreen: { screen: LeaderboardScreen },
	ProfileScreen: { screen: ProfileScreen },
	SettingScreen: {screen: SettingScreen},
});