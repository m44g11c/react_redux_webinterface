import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveArticle, fetchArticle, updateArticle } from '../actions/actions';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router'

class ArticlesForm extends Component {
  state = {
    _id: this.props.article ? this.props.article._id : null,
    title: this.props.article ? this.props.article.title : '',
    body: this.props.article ? this.props.article.body : '',
    breadcumb: this.props.article ? 'edit' : 'create',
    submit: this.props.article ? 'Update' : 'Create',
    errors: {},
    done: false
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      _id: nextProps.article._id,
      title: nextProps.article.title,
      body: nextProps.article.body,
    })
  }

  componentDidMount = () => {
    if (this.props.match.params.id) {
      this.props.fetchArticle(this.props.match.params.id);
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    let errors = {};
    if (this.state.title === '') {errors.title = 'Title is required'}
    if (this.state.body === '') {errors.body = 'Body is required'}
    this.setState({ errors });

    const isValid = Object.keys(errors).length === 0;

    if (isValid) {
      const {_id, title, body} = this.state;
      if (_id) {
        this.props.updateArticle({ _id, title, body }).then(
          () => { this.setState({ done: true }) }
        );
      } else {
        this.props.saveArticle({title, body}).then(
          () => { this.setState({ done: true }) }
        );
      }
    }
  }

  render () {
    const form = (
      <div className="container">

        <div className="row">
          <div className="col">
            <h1>Articles / {this.state.breadcumb}</h1>
          </div>
        </div>

        <div className="row"> 
          <div className="col" id="article-col"> 

            <form onSubmit={this.handleSubmit}>
              <div className="form-row"> 

                <div className="form-group col-sm-3">
                  <label htmlFor="title">Title:</label>
                  <input
                  type="text"
                  className="form-control"
                  value={this.state.title}
                  onChange={this.handleChange}
                  name="title"/>
                <span>{this.state.errors.title}</span>
                </div>
              </div>  
              <div className="form-row">
                <div className="form-group col-sm-6">
                  
                  <label htmlFor="body">Body:</label>
                  <textarea
                    rows="10"
                    className="form-control"
                    value={this.state.body}
                    onChange={this.handleChange}
                    name="body">
                  </textarea>
                  <span>{this.state.errors.body}</span>  
                </div>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary">{this.state.submit}</button>
                <Link to={`/articles`} className="btn btn-secondary">Cancel</Link>
              </div>
            </form>

          </div>
        </div>

      </div>
    )
    return (
      <div>
        { this.state.done ? <Redirect to="/articles" /> : form }
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  if (props.match.params.id && state.articles.length > 0) {
    return {
      article: state.articles.find(item => item._id === props.match.params.id)
    }
  }

  return {article: null};
}

export default connect(mapStateToProps, { saveArticle, fetchArticle, updateArticle }) (ArticlesForm);
