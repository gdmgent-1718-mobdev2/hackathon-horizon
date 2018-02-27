import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Image, ListView, TextInput, ScrollView } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'
import * as firebase from 'firebase';
import { initializeFirebase, subscribeToTrack, listenFirebaseChanges } from '../../utils/firebaseService';
import { StackNavigator } from 'react-navigation';
import { AppNavigator } from '../navigators/AppNavigator';
import NavBar from '../components/NavBar';

class LeaderboardScreen extends React.Component {

	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		this.state = {
			dataSource: ds,
		};
		//'snapshot' maken van de data uit database
		this.database = firebase.database();
		this.rootRef = firebase.database().ref();
		this.ref = this.rootRef.child("badges");
	}

	listenForBadges(ref) {
		ref.orderByChild('xp').on('value', (dataSnapshot) => {
			let badges = [];
			dataSnapshot.forEach((child) => {
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
		this.listenForBadges(this.ref);
	}

	render() {
		let Dimensions = require('Dimensions')
		let { width, height } = Dimensions.get('window');
		return (
			<View style={{ flex: 1 }}>
				<ScrollView style={{ height: height - 48, backgroundColor: '#F5F5F5' }}>
					<View style={styles.container}>
						<ListView
							style={styles.listView}
							dataSource={this.state.dataSource}
							renderRow={(rowData, sectionID, rowID) =>
								<View style={styles.listViewItem}>
									<Image source={{ uri: rowData.img }} style={styles.img} />
									<Text style={styles.name}><Text style={styles.bold}>{rowData.name}</Text>{"\n"}{rowData.description}</Text>
									<Text  style={styles.xp}>{rowData.xp} xp</Text>
								</View>}
						/>
					</View>
				</ScrollView>
				<NavBar />
			</View>
		);
	}
}

export default LeaderboardScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5',
		alignItems: 'center',
		justifyContent: 'center',
		height: "100%",
		paddingTop:16
	},
	listView: {
		width: '90%',
		marginBottom: 5
	},
	listViewItem: {
		paddingVertical:8,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	img: {
		width: 54,
		height: 54,
		borderRadius: 54/2,
		borderColor: 'transparent',
		borderWidth: 5
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
		paddingTop: 5,
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 20,
		color: '#FFF',
		fontSize: 11,
	},
});