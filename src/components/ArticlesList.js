import React from 'react';
import PropTypes from 'prop-types';
import ArticleRow from './ArticleRow';

export default function ArticlesList({ articles }) {
  const emptyMessage = (
    <tr>
      <td>There are no articles yet in your collection.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  );

  const articlesList = (
    articles.map(article => <ArticleRow article={article} key={article._id}/>) 
  );

  return (
    <tbody>
      {articles.length === 0 ? emptyMessage : articlesList}
    </tbody>
  );
}

ArticlesList.propTypes = {
  articles: PropTypes.array.isRequired
}
