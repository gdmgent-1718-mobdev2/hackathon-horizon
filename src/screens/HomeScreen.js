import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import ParkList from '../components/ParkList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const Route = 'Home';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Park',
  };
  render() {
    return (
      <View style={styles.container}>
        <ParkList parks={this.props.parks} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  parks: state.parks,
});

export default connect(mapStateToProps)(HomeScreen);
