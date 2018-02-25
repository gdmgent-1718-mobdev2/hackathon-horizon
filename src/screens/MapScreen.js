import React,  { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Image, ListView, TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { AppNavigator } from '../navigators/AppNavigator';
import { MapView } from 'expo';


class MapScreen extends React.Component {
    constructor(props){
        super(props);
    }
      
    render() {
        const { navigation, screenProps } = this.props
        return ( 
            <MapView
                style={map.container}
                initialRegion={{
                    latitude: screenProps.park.lat,
                    longitude: screenProps.park.lng,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <MapView.Marker
                    coordinate={{
                        latitude: screenProps.park.lat, longitude: screenProps.park.lng
                    }}
                />   
            </MapView>  
      );
    }
};

export default MapScreen;

const map = StyleSheet.create({
    container: {
        height: '90%',
    },
});    