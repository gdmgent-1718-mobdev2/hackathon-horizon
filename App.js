import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';

export default class App extends React.Component {
  render() {
    return (
      <Container style={styles.container}>
        <FormLabel>Name</FormLabel>
        <FormInput onChangeText={someFunction}/>
        <FormValidationMessage>Error message</FormValidationMessage>
      </Container>   
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
