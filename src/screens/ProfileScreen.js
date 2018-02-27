import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Image, ListView, TextInput, TouchableHighlight, ScrollView, Button } from 'react-native';
import NavBar from '../components/NavBar';
import * as firebase from 'firebase';
import { initializeFirebase, subscribeToTrack, listenFirebaseChanges } from '../../utils/firebaseService';
import { StackNavigator } from 'react-navigation';
//import { listenForBadges } from './BadgeScreen';

class ProfileScreen extends React.Component {
	constructor(props) {
		super(props);
		//Get current logged in User
		this.userAuth = firebase.auth().currentUser || {email:"mtransez@dev.com"};

		const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		
		//'snapshot' maken van de data uit database
		this.database = firebase.database();
		this.rootRef = firebase.database().ref();
		this.badgeRef = this.rootRef.child("badges");

		//Get userstable from Firebase
		this.userRef = this.rootRef.child("users");

		//Define currentUser placeholder
		this.state = {
			currentUser: {
				email: '',
				first_name: '',
				last_name:'',
				xp: 0,
				img: 'https://getinkspired.com/static//upload/151587060935.jpg'
			},
			dataSource: ds,
		}
	}

	listenForUser(userRef, userMail) {
		//Get user data based on current user's email
		userRef.orderByChild('email').equalTo(userMail).on('value', (dataSnapshot) => {
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

	listenForBadges(badgesRef) {
		badgesRef.orderByChild('xp').on('value', (badgeSnapshot) => {
			let badges = [];
			badgeSnapshot.forEach((child) => {
				badges.push({
					name: child.val().name,
					description: child.val().description,
					lvl_required: child.val().lvl_required,
					xp: child.val().xp,
					img: child.val().img
				});
			});

			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(badges),
			});
		});
	}

	componentDidMount() {
		// start listening for firebase updates
		this.listenForUser(this.userRef, this.userAuth.email);
		this.listenForBadges(this.badgeRef);
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
					</View>
				
					<View style={profile.container}>
						<ListView
							style={profile.listView}
							dataSource={this.state.dataSource}
							renderRow={(rowData) =>
								<View style={profile.listViewItem}>
									<Image source={{ uri: rowData.img }} style={profile.imgBadge} />
									<Text style={profile.name}><Text style={profile.bold}>{rowData.name}</Text>{"\n"}{rowData.description}</Text>
									<Text  style={profile.xp}>{rowData.xp} xp</Text>
								</View>}
						/>
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
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		height: "100%",
		padding:20,
		paddingTop:-20
	},
	img: {
    	height: 0,
    	width: 80,
		height: 80,
		borderRadius: 80/2,
		margin: 30,
		position: 'relative'
	},
	imgBadge: {
		width: 54,
		height: 54,
		borderRadius: 54/2,
		borderColor: 'transparent',
		borderWidth: 5
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
		height: 80,
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
	},
	listView: {
		width: '100%',
		marginBottom: 5
	},
	listViewItem: {
		paddingVertical:8,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	name: {
		fontWeight: 'normal',
		marginLeft: 5,
		paddingTop: 12,
		width: 185,
		height: 60,
		color: '#707070',
	},
	bold: {
		fontWeight: 'bold'
	},
	xp: {
		backgroundColor: '#48CFAD',
		paddingTop: 10,
		paddingVertical: 10,
		paddingHorizontal: 10,
		borderRadius: 20,
		color: '#FFF',
		fontSize: 11,
	},
});  

