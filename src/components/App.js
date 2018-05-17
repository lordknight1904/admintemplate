import React, { Component } from 'react';
import CustomHelmet from './CustomHelmet/CustomHelmet';
import Container from './Container';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return [
      <CustomHelmet key='helmet' />,
      <Container key='container' />
    ];
  }
}

export default App;
