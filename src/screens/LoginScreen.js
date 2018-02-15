import React,  { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Image } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'
import * as firebase from 'firebase';
import { initializeFirebase, subscribeToTrack, listenFirebaseChanges } from '../../utils/firebaseService';
import { StackNavigator } from 'react-navigation';
import { AppNavigator } from '../navigators/AppNavigator';



class LoginScreen extends React.Component {

  constructor(props){
    super(props)
    this.navigateTo = this.navigateTo.bind(this);
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

  componentWillMount() {
    
    loginUser = (email,password) =>{
      try {
        if (this.state.password.length<6) {
          alert('please enter 6 characters')
          return; 
        }
        
        firebase.auth().signInWithEmailAndPassword(email,password).then(function(firebaseUser){
          //Success, move to homepage.
          console.log("logged in!")
          this.navigateTo("Landingscreen")
        }).catch(function(error){
          console.log(error)
          console.log(this.props)
        });
        startFirebase(store);
  
      } catch (error) {
        console.log(error.toString())
      }
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

    const { navigation, screenProps } = this.props
    return (
      
      <Container style={styles.container}>
      <View>
      <Image
          style={styles.logo}
          source={require('../images/logo-parkemon.png')}
      />
      </View>
        <Form>
          <Item floatingLabel style={styles.field}>
            <Label>E-mail</Label>
            <Input 
              autoCorrect = {false}
              autoCapitalize="none"
              onChangeText={(email)=> this.setState({email})}
            />
          </Item>
          <Item floatingLabel style={styles.field}>
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
            onPress={()=> loginUser(this.state.email,this.state.password)}
          >
          <Text style={styles.buttonText}>Inloggen</Text>
          </Button>
          <Button style={styles.button}
            full
            rounded
            primary
            onPress={()=> this.loginWithFacebook()}
          >
          <Text>Facebook</Text>
          </Button>
          
          <Text >Nog geen account?</Text>
          <Button style={styles.link}
            onPress={()=> this.navigateTo('registerScreen')}
            title="registreer"
          >
          <Text >Registreer</Text>
          </Button>
        </Form>

      </Container>


  );
  }
}

export default LoginScreen

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
    marginLeft: 20,
    marginRight: 20,

  },

  buttonText: {

    color: '#FFF',


  },

  field: {

    margin: 30,


  },

  logo: {

    width: 200,
    height: 200,
    marginLeft: "25%",


  },
});
