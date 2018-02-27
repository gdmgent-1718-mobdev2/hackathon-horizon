import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Linking } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { AppNavigator } from '../navigators/AppNavigator';
import { MapView } from 'expo';

import marker from '../images/marker.png'

import NavBar from '../components/NavBar';

class MapScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {

		let Dimensions = require('Dimensions');
		let { width, height } = Dimensions.get('window');
		const { navigation, screenProps } = this.props
		xpColor = function (xp) {
			switch(xp) {
				case 50:
					return {backgroundColor: '#41AFDC'}
					break;
				case 100:
					return {backgroundColor: '#44E1E6'}
					break;
				case 150:
					return {backgroundColor: '#48CFAD'}
					break;
				case 200:
					return {backgroundColor: '#44E690'}
					break;
				case 250:
					return {backgroundColor: '#41DC5E'}
					break;
				default:
					return {backgroundColor: '#48CFAD'}
			}
		}
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
							image={marker}
							coordinate={{
								latitude: screenProps.park.lat, longitude: screenProps.park.lng
							}}
						>
							<MapView.Callout style={{padding: 8}} onPress={ ()=>{ Linking.openURL('http://maps.google.com/?q=' + screenProps.park.name  +  '+Gent')}}>
								<View style={{flex:1,flexDirection:'row',justifyContent:'flex-start' }}>
									<Text style={{fontSize: 16,fontWeight: 'bold',color: '#707070'}}>{screenProps.park.name}</Text>
									<Text style={[xpColor(screenProps.park.xp),{marginLeft: 20,paddingVertical: 5,paddingHorizontal: 10,borderRadius: 20,color: '#FFF',fontSize: 11,}]}>{screenProps.park.xp}xp</Text>
								</View>
								<Text style={{color: '#48CFAD'}}>Show directions</Text>
							</MapView.Callout>
						</MapView.Marker>
					</MapView>
				</ScrollView>
				<NavBar />
			</View>
		);
	}
};

export default MapScreen;
