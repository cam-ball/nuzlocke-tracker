// import '../styles/Tracker.css';

import React from 'react';
import Pokedex from 'pokedex-promise-v2';

class Tracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: this.props.region,
      locationAreaMap: [],
    };
  }  

  getLocations(regionName) {
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
        <li key={index}>
          {location.location}
        </li>
      )
    });
    
    return (
      <div className="locations">
        <ul>{locationList}</ul>
      </div>
    );
  }
}

export default Tracker;
