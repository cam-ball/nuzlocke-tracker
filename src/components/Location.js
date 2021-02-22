import React from 'react';

class Location extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      location: this.props.location,
    }
  }

  render() {
    return (
      <td>{this.state.location}</td>
    );
  }
}

export default Location;
