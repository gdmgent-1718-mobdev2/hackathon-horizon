import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Image, ListView, TextInput, TouchableHighlight, ScrollView } from 'react-native';
import NavBar from '../components/NavBar';

import { StackNavigator } from 'react-navigation';
import { AppNavigator } from '../navigators/AppNavigator';

class DetailScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let Dimensions = require('Dimensions');
		let { width, height } = Dimensions.get('window');
		const { navigation, screenProps } = this.props
		return (
			<View style={{ flex: 1 }}>
				<ScrollView style={{ height: height - 48 }}>
					<Image source={{ uri: screenProps.park.img }} style={detail.img} />
					<View style={detail.textContainer}>
						<View style={detail.title}>
							<Text style={detail.titleName}>{screenProps.park.name}</Text>
							<Text style={detail.xp}>150xp</Text>
						</View>
						<Text style={detail.description}>{screenProps.park.description}</Text>
						<TouchableHighlight style={detail.mapBtn} onPress={() => navigation.navigate('MapScreen')}>
							<Text style={{ color: 'white', fontWeight:"bold" }}>Toon op de kaart</Text>
						</TouchableHighlight>
					</View>
				</ScrollView>
				<NavBar />
			</View>
		);
	}
}

export default DetailScreen

const detail = StyleSheet.create({
	img: {
		height: 200,
	},
	textContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20
	},
	mapBtn: {
		backgroundColor: '#48CFAD',
		marginTop: 24,
		paddingVertical: 10,
		paddingHorizontal: 16,
		borderRadius: 20,
	},
	description: {
		width: '100%'
	},
	title: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		marginBottom: 30,
		width: '100%'
	},
	titleName: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#707070',
	},
	xp: {
		backgroundColor: '#48CFAD',
		marginLeft: 20,
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 20,
		color: '#FFF',
		fontSize: 11,
	},
});