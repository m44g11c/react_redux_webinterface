import React, { Component } from 'react';
import ArticlesPage from './components/ArticlesPage';
import ArticlesForm from './components/ArticlesForm';
import { Route } from 'react-router';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="page-header">
          <a  target="_blank" rel="noopener noreferrer" href="https://pixelplex.io/">
            <img src="https://image.ibb.co/k7cmVT/logo_w.png" alt=""/>
          </a>
        </div>
          
          <Route exact path="/articles" component={ ArticlesPage } />
          <Route path="/articles/create" component={ ArticlesForm } />
          <Route path="/articles/:id/edit" component={ ArticlesForm } />
        
      </div>
    );
  }
}

export default App;
