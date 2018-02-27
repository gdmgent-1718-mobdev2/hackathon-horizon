import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Image, ListView, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'
import * as firebase from 'firebase';
import { initializeFirebase, subscribeToTrack, listenFirebaseChanges } from '../../utils/firebaseService';
import { StackNavigator } from 'react-navigation';
import { AppNavigator } from '../navigators/AppNavigator';
import SearchBar from '../components/SearchBar';
import NavBar from '../components/NavBar';

class LandingScreen extends React.Component {

	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		this.state = {
			dataSource: ds,
		};

		//'snapshot' maken van de data uit database
		this.database = firebase.database();
		this.rootRef = firebase.database().ref();
		this.ref = this.rootRef.child("parks");

	}
	listenForParks(ref) {
		ref.orderByChild('name').on('value', (dataSnapshot) => {
			let parks = [];
			dataSnapshot.forEach((child) => {
				parks.push({
					name: child.val().name,
					img: child.val().image,
					description: child.val().description,
					lat: child.val().latitude,
					lng: child.val().longitude,
					xp: child.val().xp,
				});
			});
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(parks),
			});
		});
	}

	componentDidMount() {
		// start listening for firebase updates
		this.listenForParks(this.ref);
	}

	render() {
		let Dimensions = require('Dimensions');
		let { width, height } = Dimensions.get('window');
		const { navigation, screenProps } = this.props
		return (
			<View style={{ flex: 1 }}>
				<ScrollView style={{ height: height - 48 }}>
					<View style={styles.container}>
						<SearchBar />
						<ListView
							style={styles.listView}
							dataSource={this.state.dataSource}
							renderRow={(rowData) =>
								<TouchableOpacity onPress={() => { screenProps.park = rowData, navigation.navigate('DetailScreen') }}>
									<View style={styles.listViewItem}>
										<Image source={{ uri: rowData.img }} style={styles.img} />
										<Text style={styles.name}><Text style={styles.bold}>{rowData.name}</Text> {"\n"}120 m</Text>
										<Text style={styles.xp}>{rowData.xp}xp</Text>
										<Image style={styles.arrow} source={require('../images/arrowRight.png')} />
									</View>
								</TouchableOpacity>
							}
						/>
					</View>
				</ScrollView>
				<NavBar />
			</View>
		);
	}
}

export default LandingScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5',
		justifyContent: 'center',
		alignItems: 'center'
	},
	listView: {
		width: '90%',
		marginBottom: 16,
	},
	listViewItem: {
		backgroundColor: '#fff',
		marginBottom: '2%',
		padding: '2%',
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		elevation: 2,
	},
	img: {
		width: 60,
		height: 60,
		borderRadius: 30,
	},
	name: {
		fontWeight: 'normal',
		marginLeft: 10,
		paddingTop: 12,
		width: 165,
		height: 60,
		color: '#707070',
	},
	bold: {
		fontWeight: 'bold'
	},
	xp: {
		backgroundColor: '#48CFAD',
		paddingTop: 5,
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 20,
		color: '#FFF',
		fontSize: 11,
	},
	arrow: {
		marginLeft: 10,
		height: 15,
		width: 10,
	}
});

