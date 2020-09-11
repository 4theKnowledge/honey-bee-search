import React, { Component } from 'react';
import './stylesheets/App.css';
import Nav from './components/Nav';
import Header from './components/Header';
import Home from './components/Home';
import Search from './components/search/Search';
import Citation from './components/Citation';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {

  render() {
    const DefaultRoutes = () => {
      return (
          <div className="App">
            <Citation />
          <Switch>
          <Route path="/search" component= { Search } />
          </Switch>
        </div>
        );
      };
      
      return (
        <Router>
          <addCitation />
          <Nav />
          <Header />
          <Switch>
            <Route path="/" exact component= { Home } />
            {/* <Route path="/about" component= { About } /> */}
            <Route component={DefaultRoutes} />
          </Switch>
        </Router>
        )
      }
  }

export default App;