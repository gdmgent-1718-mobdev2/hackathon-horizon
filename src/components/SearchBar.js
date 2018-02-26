import React,  { Component } from 'react';
import { StyleSheet, View, Image, TextInput, TouchableNativeFeedback } from 'react-native';

const SearchBar = (props) => (
  <View style={styles.inputContainer}>
		<TextInput
			style={styles.input}
			placeholder="Zoeken..."
			underlineColorAndroid="transparent"
		/>
		<TouchableNativeFeedback>
			<Image style={styles.searchIcon} source={require('../images/searchIcon.png')} />
		</TouchableNativeFeedback>
	</View>
);

const styles = StyleSheet.create({
  inputContainer: {
    width: '90%',
		marginVertical: 32,
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
  }
});


export default SearchBar;