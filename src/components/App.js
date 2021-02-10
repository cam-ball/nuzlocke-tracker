import '../styles/App.css';

import React from 'react';
import Pokedex from 'pokedex-promise-v2';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Tracker from './Tracker';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      regions: [],
      currentRegion: 'kanto',
    }

    this.trackerRef = React.createRef()
  }

  componentDidMount(){
    this.getRegions()
  }

  getRegions() {
    const pokedex = new Pokedex()
    let promise = pokedex.getRegionsList()

    promise.then(response => {
      this.setState({
        regions: response.results,
      })
    })
  }

  loadRegionTracker(regionName) {
    this.trackerRef.current.updateRegion(regionName)
    this.setState({
      currentRegion: regionName,
    })
  }

  render() {
    const regionList = this.state.regions.map((region, index) => {
      return (
        <Nav.Item key={index}>
          <Nav.Link onClick={()=> { this.loadRegionTracker(region.name) } }>
            {region.name}
          </Nav.Link>
        </Nav.Item>
      )
    })

    return (
      <div className="App">
        <Navbar variant="dark" bg="dark">
          <Nav variant="tabs">
            {regionList}
          </Nav>
        </Navbar>
        <div className='Tracker'>
          <Tracker 
            region={this.state.currentRegion} 
            ref={this.trackerRef}
          />
        </div>
      </div>
    );
  }
}

export default App;
