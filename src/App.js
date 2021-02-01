import './App.css';
import React from 'react';
import Pokedex from 'pokedex-promise-v2';
// import Bootstrap from 'bootstrap';

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
      const regions = response.results

      const regionList = regions.map((region, index) => {
        return (
          <li key={index}>
            <button>
              {region.name}
            </button>
          </li>
        )
      })

      this.setState({
        regions: regionList
      })
    })
  }

  render() {
    return (
      <div className="App">
        <div className="game-info">
          <ul>{this.state.regions}</ul>
        </div>
      </div>
    );
  }
}

export default App;
