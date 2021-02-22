import React from 'react';

class Location extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      location: this.props.location,
      enName: this.props.enName
    }
  }

  render() {
    return (
      <td>{this.state.enName}</td>
    );
  }
}

export default Location;
