import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ArticlesList from './ArticlesList';
import Pagination from './Pagination';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchArticles } from '../actions/actions'
import qs from "stringquery";

class ArticlesPage extends Component {
  componentDidMount() {
    const obj = qs(this.props.location.search); 
    this.props.fetchArticles(obj.page, 10);
  }

  componentDidUpdate (prevProps) {
    if (prevProps.location.key !== this.props.location.key) {
      const obj = qs(this.props.location.search);  
      this.props.fetchArticles(obj.page, 10);
    }
  }

  render() {
    return (

      <div className="container">

        <div className="row">
          <div className="col-11">
            <h1>Articles</h1>
          </div>
          <div className="col-1">
            <Link to={`articles/create`} className="btn btn-primary">Create</Link>
          </div>
        </div>

        <div className="row" >
          <table className="table table-striped articles-table">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Title</th>
                <th scope="col">Body</th>
                <th scope="col"></th>
              </tr>
            </thead>

            <ArticlesList articles={this.props.articles} />
              
          </table>

          <Pagination/>
          
        </div>
      </div>
    );
  }
}

ArticlesPage.propTypes = {
  articles: PropTypes.array.isRequired,
  fetchArticles: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    articles:state.articles
  }
}

export default connect(mapStateToProps, { fetchArticles })(ArticlesPage);
