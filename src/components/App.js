import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import CommentsPage from './CommentsPage'
import Nav from './Nav'
import NewPost from './NewPost'

class App extends Component {
  
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    console.log('still loading', this.props.stillLoading)
    return (
      <BrowserRouter>
        {this.props.stillLoading ? null
         :  <div className='container'>
              <LoadingBar />
              <Nav />
              <Route  path='/' exact component={Dashboard}/>
              <Route  path='/post/:postId' exact component={CommentsPage}/>
              <Route  path='/new-post' exact component={NewPost}/>
            </div>
        }
      </BrowserRouter>
    );
  }
}

function mapStateToProps({categories}) {
  return {
    stillLoading: Object.keys(categories).length === 0
  }
}

export default connect(mapStateToProps)(App);
