import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Rate.css';

class Rate extends React.Component {
  render() {
    const color = '#fdbc32';
    const {numOfVotes} = this.props;

    let {rate} = this.props;
    rate = rate < 0 ? 0 : rate;
    rate = rate > 10 ? 10 : rate;

    let stars = [];
    for (let i = 0; i < Math.floor(rate / 2); i++) {
        stars.push(<FontAwesomeIcon key={stars.length} icon={['fas', 'star']} color={color} />);
    }

    if (rate % 2 !== 0) {
        stars.push(<FontAwesomeIcon key={stars.length} icon={['fas', 'star-half-alt']} color={color} />);
    }

    const restStars = 5 - stars.length;
    for (let j = 0; j < restStars; j++) {
        stars.push(<FontAwesomeIcon key={stars.length} icon={['far', 'star']} color={color} />);
    }

    console.log('stars', stars);

    return (
      <Link to="" className="rating">
          <ul className="list-inline">
              <li className="list-inline-item active">
                  {stars}
              </li>
              <li className="list-inline-item">
                  <span className="text">{numOfVotes}</span>
              </li>
          </ul>
      </Link>
    );
  }
}

export default Rate;