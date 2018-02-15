import React from 'react';
import { connect } from 'react-redux';

import parkDetail from '../components/parkDetail';

export const Route = 'Detail';

class DetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: params ? params.title : '',
    };
  };
  render() {
    return (
      <parkDetail park={this.props.park} />
    );
  }
}

const mapStateToProps = (state) => {
  let park;
  const { selectedparkId } = state.detail;
  for (let i = 0; i < state.parks.length; i += 1) {
    if (state.parks[i].id === selectedparkId) {
      park = state.parks[i];
      break;
    }
  }
  return { park };
};

export default connect(mapStateToProps)(DetailScreen);
