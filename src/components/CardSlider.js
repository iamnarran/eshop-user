import React from "react";
import Swiper from "react-id-swiper";
import PropTypes from "prop-types";

import Card from "./Card";
import { CARD_TYPES } from "../utils/consts";

class CardSlider extends React.Component {
  render() {
    const { params, data } = this.props;

    let items = data.map((item, index) => {
      return (
        <div
          key={index}
          className="related-product col-four pad10 col-md-3 col-6"
        >
          <Card key={index} item={item} type={CARD_TYPES.slim} />
        </div>
      );
    });

    return (
      items.length && (
        <Swiper {...params} shouldSwiperUpdate rebuildOnUpdate>
          {items}
        </Swiper>
      )
    );
  }
}

CardSlider.propTypes = {
  params: PropTypes.object,
  data: PropTypes.array.isRequired
};

export default CardSlider;
