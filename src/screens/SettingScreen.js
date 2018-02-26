import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableHighlight, ScrollView } from 'react-native';
import NavBar from '../components/NavBar';
import * as firebase from 'firebase';
import { initializeFirebase, subscribeToTrack, listenFirebaseChanges } from '../../utils/firebaseService';
import { StackNavigator } from 'react-navigation';
import { AppNavigator } from '../navigators/AppNavigator';

class SettingScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let Dimensions = require('Dimensions');
		let { width, height } = Dimensions.get('window');
		const { navigation, screenProps } = this.props;
		return (
			<View style={{ flex: 1 }}>
				<ScrollView style={{ height: height - 48 }}>
					<View style={settings.container}>
						<Text>Hello i am setting</Text>
					</View>
				</ScrollView>
				<NavBar />
			</View>
		);
	}
}

export default SettingScreen

const settings = StyleSheet.create({
	container: {
		paddingVertical:16,
		paddingHorizontal: '5%',
		flex: 1,
		backgroundColor: '#f5f5f5',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%'
	},
});    