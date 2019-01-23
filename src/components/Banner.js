import React from 'react';
import { Link } from 'react-router-dom';

import timesale6 from '../scss/assets/images/demo/11.jpg';

class Banner extends React.Component {
  render() {
    return (
      <div className="banner-container" >
          <span style={{ backgroundImage: `url(${timesale6})` }}></span>
          <div className="container pad10">
              <Link to="">
                  <img alt="banner" src={timesale6} className="img-fluid" />
              </Link>
          </div>
      </div>
    );
  }
}

export default Banner;