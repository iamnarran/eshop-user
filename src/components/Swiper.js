import React from 'react';
import { Link } from 'react-router-dom';
import Swiper from 'react-id-swiper';
import config from 'config';

const IMAGE =
    process.env.NODE_ENV === 'development'
        ? config.image.development
        : config.image.production;

class Slider extends React.Component {

    render() {
        const params = this.props && this.props.params;
        const data = this.props && this.props.dataSource;
        var indents = data.map(function (item, index) {
            return (
                <div style={{ backgroundImage: `url(${IMAGE + item.imgnm})` }} key={index}>
                    <div className="container pad10">
                        <div className="slide-container">
                            <div className="slide-content text-uppercase">
                                {
                                    item && item.isshownm !== 0 && (
                                        <div>
                                            <h2 className="title">{item.bannernm}</h2>
                                            <p className="text">{item.description}</p>
                                            {
                                                item && item.link && (
                                                    <Link to={item.link} className="btn btn-main" target="_blank">
                                                        <i className="fa fa-arrow-right" aria-hidden="true"></i>
                                                        <span className="text-uppercase">
                                                            {item.btntext && item.btntext.trim() ? item.btntext : 'Дэлгэрэнгүй'}
                                                        </span>
                                                    </Link>
                                                )
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
        return (
            data && data.length !== 0 && (
                <Swiper
                    {...params}
                    shouldSwiperUpdate
                    rebuildOnUpdate
                    className={this.props.elContainer}
                >
                    {indents}
                </Swiper>
            )
        )
    }
}

export default Slider;