import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Image, ListView, TextInput, TouchableHighlight, ScrollView, Button } from 'react-native';
import NavBar from '../components/NavBar';
import * as firebase from 'firebase';
import { StackNavigator } from 'react-navigation';
import { AppNavigator } from '../navigators/AppNavigator';
class ProfileScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {

		let user = firebase.auth().currentUser;
		userArray = Object.values(user);
		console.log(userArray);
	}

	render() {
		
		let Dimensions = require('Dimensions');
		let { width, height } = Dimensions.get('window');
		const { navigation, screenProps } = this.props;
		return (
			<View style={{ flex: 1 }}>
				<ScrollView style={{ height: height - 48 }}>
					<View style={profile.textContainer}>
						<Image source={{ uri: "https://getinkspired.com/static//upload/151587060935.jpg" }} style={[profile.img]} />
						<Button style={profile.btn} onPress={() => navigation.navigate('LandingScreen')} title="+"></Button>
						<Text style={profile.name}>{userArray[12]}<Text style={profile.lvl}>lvl 10</Text>
					</Text>
					</View>
					<View style={profile.badges}>
						<Text style={profile.title}>Badges</Text>
						<Text style={profile.link} onPress={()=> navigation.navigate('')}>
  							Alle badges >
						</Text>
					</View>
					<View style={profile.badges}>
						<Text style={profile.title}>Raking</Text>
						<Text style={profile.link}onPress={()=> navigation.navigate('LeaderboardScreen')}>
  							Ranglijst >
						</Text>
					</View>
				</ScrollView>
				<NavBar />
			</View>
		);
	}
}



export default ProfileScreen

const profile = StyleSheet.create({
	img: {
        height: 0,
        width: 80,
		height: 80,
		borderRadius: 80/2,
		margin: 30,
		position: 'relative'
	},
	textContainer: {
		flex: 1,
		height:139,
        flexDirection: 'row',
		alignItems: 'center',
        width: '100%',
        padding: 5,
        backgroundColor: "#f2f2f2"
    },badges: {
		width: '100%',
		height: 300,
		backgroundColor: "white",
		padding: 30,
    },
	btn: {
		backgroundColor: "#5fbba4",
		position: 'absolute',
		top: 80,
		left: 100,
		width: 32,
		height: 32,
		textAlign: 'center',
		paddingTop: 7,
		color: 'white'
	},name: {
        width: "100%",
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "normal",
        lineHeight: 19,
        letterSpacing: 0,
        textAlign: "left",
        color: "#707070"
    },
    lvl: {
        width: 32,
        fontSize: 14,
        fontWeight: "300",
        fontStyle: "normal",
        lineHeight: 17,
        letterSpacing: 0,
        textAlign: "left",
        color: "#707070", 
	},
	title: {
		fontSize: 20,
		fontWeight: "normal",
		fontStyle: "normal",
		lineHeight: 24,
		letterSpacing: 0,
		textAlign: "left",
		color: "#707070",
	}, link: {
		width: 100,
		fontSize: 14,
		fontWeight: "300",
		fontStyle: "normal",
		lineHeight: 17,
		letterSpacing: 0,
		textAlign: "left",
		color: "#5fbba4"	
	}
});    