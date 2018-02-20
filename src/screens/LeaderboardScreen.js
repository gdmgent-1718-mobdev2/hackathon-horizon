import React,  { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Image, ListView, TextInput } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'
import * as firebase from 'firebase';
import { initializeFirebase, subscribeToTrack, listenFirebaseChanges } from '../../utils/firebaseService';
import { StackNavigator } from 'react-navigation';
import { AppNavigator } from '../navigators/AppNavigator';

class LeaderboardScreen extends React.Component {

  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds,
    };
    //'snapshot' maken van de data uit database
    this.database = firebase.database();
    this.rootRef = firebase.database().ref();
    this.ref = this.rootRef.child("users");
       
  }

  listenForUsers(ref) {
    ref.on('value', (dataSnapshot) => {
      let users = [];
      dataSnapshot.forEach((child) => {
        users.push({
          first_name: child.val().first_name,
          last_name: child.val().last_name,
          xp: child.val().xp,
          img: child.val().profile_picture
        });
      });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(users),
      });
    });
  }

  componentDidMount() {
    // start listening for firebase updates
    this.listenForUsers(this.ref);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Zoek een gebruiker..."
            underlineColorAndroid="transparent"
          />
          <Image style={styles.searchIcon} source={require('../images/searchIcon.png')} />
        </View>  
        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => 
            <View style={styles.listViewItem}>
              <Image source={{uri: rowData.img}} style={styles.img} />
              <Text style={styles.name}><Text style={styles.bold}>{rowData.first_name}</Text> <Text style={styles.bold}>{rowData.last_name}</Text> {"\n"}35 badges</Text>
              <Text style={styles.lvl}>lvl {Math.floor(rowData.xp / 100)}</Text>
              <Image style={styles.arrow} source={require('../images/arrowRight.png')} />
            </View>}
        />
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
	},
  inputContainer: {
    width: '90%',
    marginTop: 40,
    padding: 10,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 2,
  },
  input: {
    width: '90%',
  },
  searchIcon: {
    height: 15,
    width: 15,
  },
  listView: {
    width: '90%',
    marginTop: 20,
    marginBottom: 5,
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
  lvl: {
    color: '#48CFAD',
    paddingHorizontal: 10,
    fontSize: 11,
  },
  arrow: {
    marginLeft: 10,
    height: 15,
    width: 10,
  }
});

