import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { initializeFirebase, subscribeToTrack, listenFirebaseChanges } from './utils/firebaseService';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'
import * as firebase from 'firebase';
//import { Provider } from 'react-redux';
//import { createStore, applyMiddleware } from 'redux';
//import AppReducer from './src/reducers';

/*const store = createStore(
  AppReducer,
  applyMiddleware(middleware),
);*/

export default class App extends React.Component {

  constructor(props){
    super(props)
    initializeFirebase();
    
    this.state = ({
      email:'',
      password:''
    })
  }

  /*componentDidMount(){

    firebase.auth().onAuthStateChanged((user)=> {
      if (user != null) {
        console.log(user)
      }
    }
  )

  }*/
  
  signUpUser = (email,password) =>{
    try {
      if (this.state.password.length<6) {
        alert('please enter 6 characters')
        return; 
      }
      
      firebase.auth().createUserWithEmailAndPassword(email,password)
      alert('je bent ingeschreven')

    } catch (error) {
      console.log(error.toString())
    }
  }

  loginUser = (email,password) =>{
    try {
      if (this.state.password.length<6) {
        alert('please enter 6 characters')
        return; 
      }
      
      firebase.auth().signInWithEmailAndPassword(email,password).then(function (user){console.log(user)})
      startFirebase(store);
      alert('je bent ingelogd')

    } catch (error) {
      console.log(error.toString())
    }
  }

  async loginWithFacebook(){

    const{type,token}= await Expo.Facebook.logInWithReadPermissionsAsync
    ('2100982780131676', { permissions:['public_profile']})

    if (type == 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token)
      firebase.auth().signInWithCredential(credential).catch((error)=>{
        console.log(error)
      })
    }

  }

  render() {
    return (
      
      <Container style={styles.container}>
        <Form>
          <Item floatingLabel>
            <Label>E-mail</Label>
            <Input 
              autoCorrect = {false}
              autoCapitalize="none"
              onChangeText={(email)=> this.setState({email})}
            />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input 
              secureTextEntry={true}
              autoCorrect = {false}
              autoCapitalize="none"
              onChangeText={(password)=> this.setState({password})}
            />
          </Item>
          <Button style={styles.button}
            full
            rounded
            succes
            onPress={()=> this.loginUser(this.state.email,this.state.password)}
          >
          <Text style={styles.buttonText}>Inloggen</Text>
          </Button>
          <Button style={styles.button}
            full
            rounded
            primary
            onPress={()=> this.signUpUser(this.state.email,this.state.password)}
          >
          <Text style={styles.buttonText}>Sign up</Text>
          </Button>
          <Button style={{marginTop: 20}}
            full
            rounded
            primary
            onPress={()=> this.loginWithFacebook()}
          >
          <Text>Facebook</Text>
          </Button>
        </Form>

      </Container>


  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },

  button: {

    backgroundColor: '#58BFA5',
    justifyContent: 'center',
    marginTop: 20,

  },

  buttonText: {

    color: '#FFF',


  },
});
