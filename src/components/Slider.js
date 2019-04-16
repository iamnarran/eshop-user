import React from "react";
import Swiper from "react-id-swiper";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { IMAGE } from "../utils/consts";

class Slider extends React.Component {
  state = {
    params: [],
    data: [],
    elContainer: ""
  };

  componentDidMount() {
    this.setState({ ...this.props });
  }

  render() {
    var indents = this.state.data.map(function(item, index) {
      return (
        <div
          style={{ backgroundImage: `url(${IMAGE + item.imgnm})` }}
          key={index}
        >
          <Link to={item.brandid ? "/brand/" + item.brandid : ""}>
            <div className="container pad10">
              <div className="slide-container">
                <div className="slide-content text-uppercase">
                  {item && item.isshownm !== 0 && (
                    <div>
                      <h2 className="title">{item.bannernm}</h2>
                      <p className="text">{item.description}</p>
                    </div>
                  )}
                  {item && item.link && (
                    <Link
                      to={item.link}
                      className="btn btn-main"
                      target="_blank"
                    >
                      <i
                        className="fa fa-long-arrow-right"
                        aria-hidden="true"
                      />
                      <span className="text-uppercase">
                        {item.btntext && item.btntext.trim()
                          ? item.btntext
                          : "Дэлгэрэнгүй"}
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </Link>
        </div>
      );
    });
    return (
      this.state.data.length !== 0 && (
        <Swiper
          {...this.state.params}
          shouldSwiperUpdate
          rebuildOnUpdate
          className={this.props.elContainer}
        >
          {indents}
        </Swiper>
      )
    );
  }
}

Slider.propTypes = {
  params: PropTypes.object,
  data: PropTypes.array.isRequired,
  elContainer: PropTypes.string.isRequired
};

export default Slider;
