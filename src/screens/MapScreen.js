import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { AppNavigator } from '../navigators/AppNavigator';
import { MapView } from 'expo';

import NavBar from '../components/NavBar';

class MapScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {

		let Dimensions = require('Dimensions');
		let { width, height } = Dimensions.get('window');
		const { navigation, screenProps } = this.props
		return (
			<View style={{flex:1}}>
				<ScrollView style={{ height: height - 48 }}>
					<MapView style={{height: height - 48}}
						initialRegion={{
							latitude: screenProps.park.lat,
							longitude: screenProps.park.lng,
							latitudeDelta: 0.0922,
							longitudeDelta: 0.0421,
						}}
					>
						<MapView.Marker
							coordinate={{
								latitude: screenProps.park.lat, longitude: screenProps.park.lng
							}}
						/>
					</MapView>
				</ScrollView>
				<NavBar />
			</View>
		);
	}
};

export default MapScreen;
