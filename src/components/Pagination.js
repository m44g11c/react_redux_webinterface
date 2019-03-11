import React from 'react';
import { Link } from 'react-router-dom';

export default function Pagination() {

  const articlesCount = 12;
  const pageCount = Math.ceil(articlesCount / 10);
  var buttons = [];

  for (var i = 0; i < pageCount; i++) {
    buttons.push(<li className="page-item" key={i}><Link  to={`articles?page=${i + 1}`} className="page-link">{i + 1}</Link></li>);
  }
  
  return (
    <div className="container">
      <nav aria-label="Page navigation">
        <ul className="d-flex pagination justify-content-center">
          {buttons}
        </ul>
      </nav>
    </div>
  );
}
