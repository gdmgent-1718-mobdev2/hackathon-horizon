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
    this.navigateTo = this.navigateTo.bind(this);
    initializeFirebase();
    
    this.state = ({
      email:'',
      password:''
    })
    
  }

  //assign props
  navigateTo = (pageName)=> {
    this.props.navigation.navigate(pageName)
    console.log(this.props)
  }

  render() {
    const screenProps = {
      park: {
        name: 'TestPark',
        img: 'TestImg',
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
