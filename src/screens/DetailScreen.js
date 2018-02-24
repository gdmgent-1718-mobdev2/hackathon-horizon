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
                <View style={detail.textContainer}>
                    <View style={detail.title}>
                        <Text style={detail.titleName}>{screenProps.park.name}</Text>
                        <Text style={detail.xp}>150xp</Text>
                    </View>    
                    <Text>{screenProps.park.description}</Text>
                </View>    
            </View>
        );
    }
}

export default DetailScreen

const detail = StyleSheet.create({
    container: {
        
    },
    img: {
        height: 200,
    },
    textContainer: {
        padding: 20,
    },
    title: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 30,
        
    },
    titleName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#707070',
    },
    xp: {
        backgroundColor: '#48CFAD',
        marginLeft: 20,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 20,
        color: '#FFF',
        fontSize: 11,
      },
});    