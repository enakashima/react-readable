import React, { Component, Fragment } from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import CommentsPage from './PostCommentsPage'
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
        <Fragment>
          <LoadingBar />
          {this.props.stillLoading ? null
          :  <div className='container'>
                <Nav />
                <Route  path='/' exact component={Dashboard}/>
                <Route  path='/post/:postId' exact component={CommentsPage}/>
                <Route  path='/new-post' exact component={NewPost}/>
              </div>
          }
        </Fragment>
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
