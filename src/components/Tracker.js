import React from 'react';
import Location from './Location';

import Table from 'react-bootstrap/Table';

class Tracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: this.props.region,
      locationAreaMap: [],
    };
  }  

  getLocations(regionName) {
    const Pokedex = require('pokedex-promise-v2');

    const pokedex = new Pokedex()
    let promise = pokedex.getRegionByName(regionName)

    promise.then(response => {
      return(response.locations.map(location => location.name))
    }).then(locationList => {
      return(pokedex.getLocationByName(locationList))
    }).then(locationList => {
      const locationAreaMap = locationList.map(location => {
        return({
          location: location.name,
          areas: location.areas.map(area => area.name),
        })
      })

      this.setState({
        locationAreaMap: locationAreaMap,
        region: regionName,
      })
    })
  }

  updateRegion(regionName) {
    this.getLocations(regionName)
  }

  render() {
    const locations = this.state.locationAreaMap
    const locationList = locations.map((location, index) => {
      return (
        <tr key={index}>
          <Location 
            location={location.location}
            areas={location.areas}
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
