import React from 'react';
import Location from './Location';

import Table from 'react-bootstrap/Table';

class Tracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: this.props.region,
      locationList: [],
    };
  }  

  getLocations(regionName) {
    const Pokedex = require('pokedex-promise-v2');

    const pokedex = new Pokedex()
    let promise = pokedex.getRegionByName(regionName)

    promise.then(response => {
      this.setState({
        locationList: response.locations.map(location => location.name),
      })
    })
  }

  updateRegion(regionName) {
    this.getLocations(regionName)
  }

  render() {
    const locations = this.state.locationList
    const locationList = locations.map((location) => {
      return (
        <tr key={location}>
          <Location 
            location={location}
          />
        </tr>
      )
    });
    
    return (
      <div className="locations">
        <Table responsive striped hover variant="dark">
          <thead>
            <tr><th>Location</th></tr>
          </thead>
          <tbody>
            {locationList}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Tracker;
