import React from "react";
import Swiper from "react-id-swiper";
import PropTypes from "prop-types";

import Card from "./Card";

class CardSlider extends React.Component {
  state = {
    params: [],
    data: [],
    elContainer: ""
  };

  componentDidMount() {
    this.setState({ ...this.props });
  }

  render() {
    const { data, params, elContainer } = this.props;
    let indents = data.map(function(i, key) {
      return (
        <div
          key={key}
          className="related-product col-four pad10 col-md-3 col-6"
        >
          <Card key={key} item={i} type={1} />
        </div>
      );
    });

    return (
      data.length !== 0 && (
        <Swiper
          {...params}
          shouldSwiperUpdate
          rebuildOnUpdate
          className={elContainer}
        >
          {indents}
        </Swiper>
      )
    );
  }
}

CardSlider.propTypes = {
  elContainer: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  params: PropTypes.object
};

export default CardSlider;
