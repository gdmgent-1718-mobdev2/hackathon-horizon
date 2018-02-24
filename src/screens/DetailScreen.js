import React,  { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Image, ListView, TextInput } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'
import * as firebase from 'firebase';
import { initializeFirebase, subscribeToTrack, listenFirebaseChanges } from '../../utils/firebaseService';
import { StackNavigator } from 'react-navigation';
import { AppNavigator } from '../navigators/AppNavigator';

class DetailScreen extends React.Component {
    constructor(props){
    	super(props);
    }

    render() {
        const { navigation, screenProps } = this.props
        return (
            <View style={detail.container}>
                <Image source={{uri: screenProps.park.img}} style={detail.img} />
                <Text>{screenProps.park.description}</Text>
            </View>
        );
    }
}

export default DetailScreen

const detail = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
    },
    img: {
        height: 200,
    }
});    