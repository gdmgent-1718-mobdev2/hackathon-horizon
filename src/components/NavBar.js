import React,  { Component } from 'react';
import { StyleSheet, View, Image, TextInput, TouchableHighlight } from 'react-native';
import { withNavigation } from 'react-navigation';

export class NavBar extends React.Component {
	render(){
		return ( 
			<View style={styles.navContainer}>
				<TouchableHighlight onPress={() => this.props.navigation.navigate('LandingScreen')} style={styles.navBtn}>
					<Image style={styles.navIcon} source={require('../images/icons/parks.png')} />
				</TouchableHighlight>
				<TouchableHighlight onPress={() => this.props.navigation.navigate('LeaderboardScreen')} style={styles.navBtn}>
					<Image style={styles.navIcon} source={require('../images/icons/leaderboard_active.png')} />
				</TouchableHighlight>
				<TouchableHighlight onPress={() => this.props.navigation.navigate('ProfileScreen')} style={styles.navBtn}>
					<Image style={styles.navIcon} source={require('../images/icons/profile.png')} />
				</TouchableHighlight>
				<TouchableHighlight style={styles.navBtn}>
					<Image style={styles.navIcon} source={require('../images/icons/settings.png')} />
				</TouchableHighlight>
		</View>
		)
	}
}
  
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
		height: 24,
		paddingVertical: 8,
		alignItems: 'center',
		justifyContent: 'center'
	},
	navIcon: {
		height: 24
	}
});


export default withNavigation(NavBar);