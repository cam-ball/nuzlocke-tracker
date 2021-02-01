import '../styles/App.css';

import React from 'react';
import Pokedex from 'pokedex-promise-v2';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      regions: [],
    }
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

  render() {
    const regionList = this.state.regions.map((region, index) => {
      return (
        <Nav.Item key={index}>
          <Nav.Link onClick={(i)=> {alert(region.name)} }>
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
      </div>
    );
  }
}

export default App;
