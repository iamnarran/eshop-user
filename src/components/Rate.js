import React from 'react';
import { Link } from 'react-router-dom';

class Rate extends React.Component {
  render() {
    return (
      <Link to="" className="rating">
          <ul className="list-inline">
              <li className="list-inline-item active">
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star-half-o" aria-hidden="true"></i>
                  <i className="fa fa-star-o" aria-hidden="true"></i>
              </li>
              <li className="list-inline-item active">
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star-half-o" aria-hidden="true"></i>
                  <i className="fa fa-star-o" aria-hidden="true"></i>
              </li>
              <li className="list-inline-item half-active">
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star-half-o" aria-hidden="true"></i>
                  <i className="fa fa-star-o" aria-hidden="true"></i>
              </li>
              <li className="list-inline-item">
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star-half-o" aria-hidden="true"></i>
                  <i className="fa fa-star-o" aria-hidden="true"></i>
              </li>
              <li className="list-inline-item">
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star-half-o" aria-hidden="true"></i>
                  <i className="fa fa-star-o" aria-hidden="true"></i>
              </li>
              <li className="list-inline-item">
                  <span className="text">197</span>
              </li>
          </ul>
      </Link>
    );
  }
}

export default Rate;