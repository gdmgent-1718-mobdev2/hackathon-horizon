import React,  { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Image } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import * as firebase from 'firebase';
import { initializeFirebase, subscribeToTrack, listenFirebaseChanges } from '../../utils/firebaseService';
import { StackNavigator } from 'react-navigation';
import { AppNavigator } from '../navigators/AppNavigator';



class LoginScreen extends React.Component {

  constructor(props){
    super(props)
    this.state = ({
      email:'',
      password:''
    })
  }
  
  

  componentWillMount() {
    
    loginUser = (email,password) =>{
      try {
        if (this.state.password.length<6) {
          alert('please enter 6 characters')
          return; 
        }
        
        firebase.auth().signInWithEmailAndPassword(email,password).then((firebaseUser) => {
          //Success, move to homepage.
          console.log("logged in!")
          this.props.navigation.navigate('LandingScreen')
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
      firebase.auth().signInWithCredential(credential).then((firebaseUser) => {
        //Success, move to homepage.
        console.log("logged in!")
        this.navigateTo("Landingscreen")
      }).catch(function(error){
        console.log(error)
        console.log(this.props)
      });
    }

  }
  

  render() {

    const { navigation, screenProps } = this.props
    return (
      <View style={styles.container}>
				<Image
						style={styles.logo}
						source={require('../images/logo-parkemon.png')}
				/>
        <Form style={styles.child}>
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
          <Button style={styles.buttonFacebook}
            full
            rounded
            primary
            onPress={()=> this.loginWithFacebook()}
          >
          <Text style={styles.buttonText}>Facebook</Text>
          </Button>
          <View style={styles.registerContainer}>
            <Text style={{ paddingTop:45}}>Nog geen account?</Text>
            <Button style={styles.link}
              onPress={()=> navigation.navigate('RegisterScreen')}
              title="registreer"
            >
            <Text style={{color: '#58BFA5'}}>Registreer</Text>
            </Button>
          </View>
        </Form>
      </View>
  );
  }
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#fff',
		paddingVertical: 64,
		justifyContent: 'space-between',
	},
	child: {
		width: '90%'
	},
  registerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection : 'row',
  },
  button: {
    backgroundColor: '#58BFA5',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  buttonFacebook: {
		backgroundColor:'#3B5998',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  buttonText: {
		color: '#FFF',
		fontWeight: 'bold',
  },
  field: {
    margin: 30,
	},
  logo: {
    width: 100,
		height: 100,
		borderRadius: 50
  },
  link: {
		elevation: 0,
    marginLeft: 10,
    backgroundColor: 'transparent',
  },
});
