import React,  { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Image } from 'react-native';
import * as firebase from 'firebase';
import { initializeFirebase, subscribeToTrack, listenFirebaseChanges } from '../../utils/firebaseService';
import { StackNavigator } from 'react-navigation';
import { AppNavigator } from '../navigators/AppNavigator';

class LandingScreen extends React.Component {

  constructor(props){
    super(props)
    
  }

  render() {
    return (
      
      <Container style={styles.container}>
      <View>
          <Text style={styles.buttonText}>Geland!</Text>
      </View>
      </Container>


  );
  }
}

export default LandingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },

});

