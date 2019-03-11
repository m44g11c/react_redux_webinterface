import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function ArticleRow({ article }) {
  return (
    <tr>
      <td>
        {article._id}
      </td>
      <td>
        {article.title}
      </td>
      <td>
        {article.body}
      </td>
      <td>
      <Link to={`/articles/${article._id}/edit`} className="btn btn-primary">Edit</Link>
      <button type="button" className="btn btn-secondary" data-toggle="modal" data-target={`#modal${article._id}`}>
        View
      </button>
 
      <div className="modal fade" id={`modal${article._id}`} tabIndex="-1" role="dialog" aria-labelledby="ModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="ModalCenterTitle">{article.title}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {article.body}
            </div>
            <div className="modal-footer">
             <div className="container-fluid">
              <div className="row">
                <div className="col-md-6">Created: <p className="text-info">{article.created_at}</p></div>
                <div className="col-md-6">Updated: <p className="text-info">{article.updated_at}</p></div>
              </div>
             </div>
            </div>
          </div>
        </div>
      </div>

      </td>
    </tr>
  )
}

ArticleRow.propTypes = {
  article: propTypes.object.isRequired
}
