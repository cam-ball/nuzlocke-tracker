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
      return(response.locations.map(location => location.name))
    }).then(locationList => {
      return(pokedex.getLocationByName(locationList))
    }).then(locationList => {
      console.log(locationList)
      const locations = locationList.map(location => {
        const enName = location.names.find(name => name.language.name === 'en').name
        return({
          location: location.name,
          enName: enName, 
        })
      })

      this.setState({
        locationList: locations,
      })
    })
  }

  updateRegion(regionName) {
    this.getLocations(regionName)
  }

  render() {
    const locations = this.state.locationList
    const locationList = locations.map((location, index) => {
      return (
        <tr key={location.location}>
          <Location 
            location={location.location}
            enName={location.enName}
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
