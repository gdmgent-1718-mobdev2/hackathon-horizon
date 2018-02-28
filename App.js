import React,  { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Image } from 'react-native';
import { initializeFirebase, subscribeToTrack, listenFirebaseChanges } from './utils/firebaseService';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'
import * as firebase from 'firebase';
import { StackNavigator } from 'react-navigation';
import { AppNavigator } from './src/navigators/AppNavigator';

 
export default class App extends React.Component {

  constructor(props){
    super(props);
    initializeFirebase();
    
    this.state = ({
      email:'',
      password:''
    })
    console.ignoredYellowBox = [
			'Setting a timer'
		]
  }

  render() {
    const screenProps = {
      park: {
        name: 'TestPark',
      },
    }
    return (
      <AppNavigator screenProps={screenProps} />
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },

  
});
