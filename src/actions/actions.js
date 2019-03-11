export const SET_ARTICLES = 'SET_ARTICLES';
export const ADD_ARTICLE = 'ADD_ARTICLE';
export const ARTICLE_FETCHED = 'ARTICLE_FETCHED';
export const ARTICLE_UPDATED = 'ARTICLE_UPDATED';

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    let errors = new Error(response.statusText);
    errors.response = response;
    throw errors;
  }
}

export function addArticle(article) {
  return {
    type: ADD_ARTICLE,
    article
  }
}

export function articleFetched(article) {
  return {
    type: ARTICLE_FETCHED,
    article
  }
}

export function articleUpdated(article) {
  return {
    type: ARTICLE_UPDATED,
    article
  }
}

export function setArticles(data) {
  return {
    type: SET_ARTICLES,
    data
  }
}

export function saveArticle(data) {
  return dispatch => {
    return fetch('http://localhost:8080/v1/articles', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)  
    .then(data => dispatch(addArticle(data)));
  }
}

export function updateArticle(data) {
  return dispatch => {
    return fetch(`http://localhost:8080/v1/articles/${data._id}`, {
      method: 'put',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)  
    .then(data => dispatch(addArticle(data)));
  }
}

export function fetchArticles(pageNumber, limit) {
  return dispatch => {
    fetch(`http://localhost:8080/v1/articles?page=${pageNumber}&limit=${limit}`)
      .then(res => res.json())
      .then(data => dispatch(setArticles(data)));
  }
}

export function fetchArticle(id) {
  return dispatch => {
    fetch(`http://localhost:8080/v1/articles/${id}`)
      .then(res => res.json())
      .then(data => dispatch(articleFetched(data)));
  }
}
