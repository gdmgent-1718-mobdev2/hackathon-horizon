import React,  { Component } from 'react';
import { StyleSheet, View, Image, TextInput, TouchableHighlight } from 'react-native';

const NavBar = (props) => (
  <View style={styles.navContainer}>
			<TouchableHighlight style={styles.navBtn}>
				<Image style={styles.navIcon} source={require('../images/icons/search.png')} />
			</TouchableHighlight>
			<TouchableHighlight style={styles.navBtn}>
				<Image style={styles.navIcon} source={require('../images/icons/parks.png')} />
			</TouchableHighlight>
			<TouchableHighlight style={styles.navBtn}>
				<Image style={styles.navIcon} source={require('../images/icons/leaderboard_active.png')} />
			</TouchableHighlight>
			<TouchableHighlight style={styles.navBtn}>
				<Image style={styles.navIcon} source={require('../images/icons/profile.png')} />
			</TouchableHighlight>
	</View>
);

const styles = StyleSheet.create({
  navContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		backgroundColor: 'white',
		width: '100%',
		padding: 24,
		backgroundColor: 'white'
	},
	navBtn:{
		flex: 1,
		width: "25%",
		height: 16,
		paddingVertical: 8,
		alignItems: 'center',
		justifyContent: 'center'
	},
	navIcon: {
		height: 16
	}
});


export default NavBar;