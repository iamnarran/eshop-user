import React from 'react';
import Swiper from 'react-id-swiper';
import config from 'config';

const IMAGE =
  process.env.NODE_ENV === 'development'
    ? config.image.development
    : config.image.production;

class Banner extends React.Component {
  componentDidMount() {

  }

  // handleMouseEnter = event => {
  //   console.log('ooo');
  // }

  render() {
    const params = this.props && this.props.params;
    const data = this.props && this.props.data;

    const banner = data.map(item => {
      return (
        <div key={item.id}>
          <a href={item.link ? item.link : '#'} target="_blank" rel="noopener">
            <img alt="banner" src={IMAGE + item.imgnm} className="img-fluid" />
          </a>
        </div>
      );
    });

    return (
      <div className="banner-container" onMouseEnter={this.handleMouseEnter}>
        <div className="container pad10">
          <span style={{ backgroundImage: `url(${IMAGE + data[0].imgnm})` }}></span>
          <Swiper {...params}>
            {banner}
          </Swiper>
        </div>
      </div>
    );
  }
}

export default Banner;