import logo from './logo.svg';
import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import BookList from './containers/BookList';
import BookDetails from './containers/BookDetails';
import { connect } from 'react-redux';


class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (<Redirect push to="/list" {...props} />)}
          />
          <Route exact path="/list" component={BookList} />
          <Route exact path="/list/:id" component={BookDetails} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
