import React,  { Component } from 'react';
import { StyleSheet, View, Image, TextInput, TouchableNativeFeedback } from 'react-native';

const NavBar = (props) => (
  <View style={styles.navContainer}>
		<View style={styles.navBtn}>
			<TouchableNativeFeedback>
				<Image style={styles.navIcon} source={require('../images/icons/search.png')} />
			</TouchableNativeFeedback>
		</View>
		<View style={styles.navBtn}>
			<TouchableNativeFeedback>
				<Image style={styles.navIcon} source={require('../images/icons/parks.png')} />
			</TouchableNativeFeedback>
		</View>
		<View style={styles.navBtn}>
			<TouchableNativeFeedback>
				<Image style={styles.navIcon} source={require('../images/icons/leaderboard_active.png')} />
			</TouchableNativeFeedback>
		</View>
		<View style={styles.navBtn}>
			<TouchableNativeFeedback>
				<Image style={styles.navIcon} source={require('../images/icons/profile.png')} />
			</TouchableNativeFeedback>
		</View>
	</View>
);

const styles = StyleSheet.create({
  navContainer: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: 'white',
		width: '100%',
		padding: 24,
		backgroundColor: 'white'
	},
	navBtn:{
		flex: 1,
		width: "25%",
		height: "100%",
		alignItems: 'center',
		justifyContent: 'center'
	},
	navIcon: {
		height: 16
	}
});


export default NavBar;