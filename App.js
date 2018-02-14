import React from 'react';
import { StyleSheet, Text, View, ListView } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';
import * as firebase from 'firebase';
import firebaseConfig from './utils/firebaseConfig.json';

firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds,
    };
    //'snapshot' maken van de data uit database
    this.database = firebase.database();     
    this.rootRef = firebase.database().ref();
    this.ref = this.rootRef.child("parks");
       
  }

  listenForParks(ref) {
    ref.on('value', (dataSnapshot) => {
      var parks = [];
      dataSnapshot.forEach((child) => {
        parks.push(
          child.val().name
        );
      });
      console.warn(parks);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(parks)
      });
    });
  }
  componentDidMount() {
    // start listening for firebase updates
    this.listenForParks(this.ref);
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <Text>{rowData}</Text>}
      />
      </View> 
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
