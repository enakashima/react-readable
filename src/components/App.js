import React, { Component } from 'react';
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from '../actions/shared'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <div>
        <LoadingBar />
        readable app
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    
  }
}

export default connect(mapStateToProps)(App);
