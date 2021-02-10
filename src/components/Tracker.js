// import '../styles/Tracker.css';

import React from 'react';
import Pokedex from 'pokedex-promise-v2';

class Tracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: this.props.region,
      locationList: [],
    };
  }

  updateRegion(regionName) {
    this.setState({ region: regionName })
  }

  render() {
    return (
      <p> {this.state.region} </p>
    );
  }
}

export default Tracker;
