import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableHighlight, ScrollView } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'
import NavBar from '../components/NavBar';
import * as firebase from 'firebase';
import { initializeFirebase, subscribeToTrack, listenFirebaseChanges } from '../../utils/firebaseService';
import { StackNavigator } from 'react-navigation';
import { AppNavigator } from '../navigators/AppNavigator';

class SettingScreen extends React.Component {
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
				password:'',
				xp: 0,
				img: 'https://getinkspired.com/static//upload/151587060935.jpg'
			}
		}
	}

	listenForUser(ref, userMail) {
		//Get user data based on current user's email
		ref.orderByChild('email').equalTo(userMail).on('value', (dataSnapshot) => {
			let user = {};
			dataSnapshot.forEach((child) => {
				user.key = child.key;
				user.email = child.val().email;
				user.first_name = child.val().first_name;
				user.last_name = child.val().last_name;
				user.xp = child.val().xp;
				user.img = child.val().profile_picture;
			});
			//Update placeholder state to data from DB
			this.setState({
				currentUser: {
					key: user.key,
					email: user.email,
					first_name: user.first_name,
					last_name: user.last_name,
					xp: user.xp,
					img: user.img,
				}
			});
		});
	}

	loginUser = (email,password) =>{
		try {
		  if (this.state.currentUser.password.length<6) {
			alert('please enter 6 characters')
			return; 
		  }
		  
		  firebase.auth().signInWithEmailAndPassword(email,password).then((firebaseUser) => {
			//Success, move to homepage.
			console.log("logged in!")
			this.props.navigation.navigate('ProfileScreen')
		  }).catch(function(error){
			console.log(error)
			console.log(this.props)
		  });
		  startFirebase(store);
	
		} catch (error) {
		  console.log(error.toString())
		}
	  }

	updateProfile(firstName, lastName, userEmail, userPassword) {
		this.ref.child(this.state.currentUser.key).update({ first_name: firstName, last_name: lastName, email: userEmail });
		this.userAuth.updateEmail(userEmail);
		this.userAuth.updatePassword(userPassword);
		this.loginUser(userEmail,userPassword);
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
					<View style={settings.textContainer}>
						<Image source={{ uri: this.state.currentUser.img }} style={[settings.img]} />
						<View style={{width: width - 188}}>
							<Text style={settings.name}>{this.state.currentUser.first_name} {this.state.currentUser.last_name}</Text>
							<Text style={settings.lvl}>lvl {Math.floor(this.state.currentUser.xp / 100)}</Text>
							<View style={{marginTop: 16,height: 8, backgroundColor: 'white', width: '100%'}}>
								<View style={{height: 8, backgroundColor: '#5FBBA4', width:'50%'}}></View>
							</View>
						</View>
					</View>
					<Form>
						<Item floatingLabel style={settings.field}>
							<Label>Voornaam</Label>
							<Input 
							autoCorrect = {false}
							autoCapitalize="none"
							value= {this.state.currentUser.first_name}
							onChangeText={(firstname)=> this.setState({currentUser: {...this.state.currentUser,first_name: firstname}})}
							/>
						</Item>
						<Item floatingLabel style={settings.field}>
							<Label>Achternaam</Label>
							<Input 
							autoCorrect = {false}
							autoCapitalize="none"
							value = {this.state.currentUser.last_name}
							onChangeText={(lastname)=> this.setState({currentUser: {...this.state.currentUser,last_name: lastname}})}
							/>
						</Item>
						<Item floatingLabel style={settings.field}>
							<Label>E-mail</Label>
							<Input 
							autoCorrect = {false}
							autoCapitalize="none"
							value = {this.state.currentUser.email}
							onChangeText={(useremail)=> this.setState({currentUser: {...this.state.currentUser,email: useremail}})}
							/>
						</Item>
						<Item floatingLabel style={settings.field}>
							<Label>Wachtwoord</Label>
							<Input 
							secureTextEntry= {true}
							autoCorrect = {false}
							autoCapitalize="none"
							onChangeText={(userpassword)=> this.setState({currentUser: {...this.state.currentUser,password: userpassword}})}
							/>
						</Item>
						<Button style={settings.button}
							full
							rounded
							primary
							onPress={()=> this.updateProfile(this.state.currentUser.first_name,this.state.currentUser.last_name,this.state.currentUser.email,this.state.currentUser.password)}
						>
						<Text style={settings.buttonText}>Update</Text>
						</Button>
					</Form>
				</ScrollView>
				<NavBar />
			</View>
		);
	}
}

export default SettingScreen

const settings = StyleSheet.create({
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
	button: {
		backgroundColor: '#58BFA5',
		justifyContent: 'center',
		marginTop: 20,
		marginLeft: 20,
		marginRight: 20,
	},
	buttonText: {
		color: '#FFF',	
	},
	field: {
		margin: 30,
	},
});    