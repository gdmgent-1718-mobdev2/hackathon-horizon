import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Image, ListView, TextInput, TouchableHighlight, ScrollView, Button } from 'react-native';
import NavBar from '../components/NavBar';
import * as firebase from 'firebase';
import { initializeFirebase, subscribeToTrack, listenFirebaseChanges } from '../../utils/firebaseService';
import { StackNavigator } from 'react-navigation';
import { AppNavigator } from '../navigators/AppNavigator';

class ProfileScreen extends React.Component {
	constructor(props) {
		super(props);
		//Get current logged in User
		this.userAuth = firebase.auth().currentUser || {email:"mtransez@dev.com"};

		//Get userstable from Firebase
		this.database = firebase.database();
		this.rootRef = firebase.database().ref();
		this.ref = this.rootRef.child("users");

		//Define currentUser placeholder
		this.state = {
			currentUser: {
				email: '',
				first_name: '',
				last_name:'',
				xp: 0,
				img: 'https://getinkspired.com/static//upload/151587060935.jpg'
			}
		}
	}

	listenForUser(ref, userMail) {
		//Get user data based on current user's email
		ref.orderByChild('email').equalTo(userMail).on('value', (dataSnapshot) => {
			//empty user object
			let user = {};
			dataSnapshot.forEach((child) => {
				user.email = child.val().email;
				user.first_name = child.val().first_name;
				user.last_name = child.val().last_name;
				user.xp = child.val().xp;
				user.img = child.val().profile_picture;
				//End ForEach after one loop
				return true;
			});
			//Update placeholder state to data from DB
			this.setState({
				currentUser: {
					email: user.email,
					first_name: user.first_name,
					last_name: user.last_name,
					xp: user.xp,
					img: user.img,
				}
			});
		});
	}

	componentDidMount() {
		// start listening for firebase updates
		this.listenForUser(this.ref, this.userAuth.email);
	}

	render() {
		let Dimensions = require('Dimensions');
		let { width, height } = Dimensions.get('window');
		const { navigation, screenProps } = this.props;
		return (
			<View style={{ flex: 1 }}>
				<ScrollView style={{ height: height - 48 }}>
					<View style={profile.textContainer}>
						<Image source={{ uri: this.state.currentUser.img }} style={[profile.img]} />
						<View style={{width: width - 188}}>
							<Text style={profile.name}>{this.state.currentUser.first_name} {this.state.currentUser.last_name}</Text>
							<Text style={profile.lvl}>lvl {Math.floor(this.state.currentUser.xp / 100)}</Text>
							<View style={{borderRadius: 4, marginTop: 16, height: 8, backgroundColor: 'white', width: '100%'}}>
								<View style={{borderRadius: 4, height: 8, backgroundColor: '#5FBBA4', width:'50%'}}></View>
							</View>
						</View>
					</View>
					<View style={profile.badges}>
						<Text style={profile.title}>Badges</Text>
						<Text style={profile.link} onPress={()=> navigation.navigate('BadgeScreen')}>
  							Alle badges >
						</Text>
					</View>
					<View style={profile.badges}>
						<Text style={profile.title}>Leader</Text>
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
		width: 'auto',
		height:139,
    flexDirection: 'row',
		alignItems: 'center',
    width: '100%',
    padding: 5,
    backgroundColor: "#f2f2f2"
	},
	badges: {
		width: '100%',
		height: 300,
		backgroundColor: "white",
		padding: 30,
  },
	name: {
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
	},
	link: {
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