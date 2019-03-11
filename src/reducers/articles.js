import { SET_ARTICLES, ADD_ARTICLE, ARTICLE_FETCHED, ARTICLE_UPDATED } from '../actions/actions';

export default function articles(state = [], action = {}) {
  switch(action.type) {
    case ADD_ARTICLE:
      return [
        ...state,
        action.article
      ];

    case ARTICLE_UPDATED:
      return state.map(item => {
        if(item.id === action.article._id) return action.article;
        return item;
      });  

    case ARTICLE_FETCHED:
      const index = state.findIndex(item => item._id === action.article._id);
      if (index > -1) {
        return state.map(item => {
          if (item._id === action.article._id) return action.article;
          return item;
        });
      } else {
        return [
          ...state,
          action.article
        ];
      }

    case SET_ARTICLES:
      return action.data.articles;

    default: return state;
  }
}
