import React from "react";
import PropTypes from "prop-types";

import { IMAGE } from "../utils/consts";

class PageHeader extends React.Component {
  state = {
    title: "",
    subtitle: "",
    banners: [],
    bgColor: "#feb415",
    selected: []
  };

  componentDidMount() {
    this.setState({ ...this.props });
    this.setState({
      selected: this.props.banners[
        Math.floor(Math.random() * this.props.banners.length)
      ]
    });
  }

  changeLocation = () => {
    if (this.state.selected !== undefined) {
      window.open(
        this.state.selected.link ? this.state.selected.link : " ",
        this.state.selected ? "_blank" : " "
      );
    }
  };

  render() {
    const { title, subtitle, bgColor } = this.props;
    return (
      <div
        className="whole-page-title"
        style={{ padding: "0", backgroundColor: `${bgColor}` }}
      >
        <div
          className="whole-page-title class container pad10"
          style={{
            backgroundImage: `url(${
              this.state.selected === undefined
                ? ""
                : IMAGE + this.state.selected.imgnm
            })`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right",
            backgroundSize: "50% 115px",
            backgroundColor: `${bgColor}`
          }}
          onClick={this.changeLocation}
        >
          <div className="container pad10">
            <div className="title-container flex-space">
              <h2>
                <span className="big">{title}</span>
                <strong>{subtitle}</strong>
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  banners: PropTypes.array,
  bgColor: PropTypes.string
};

export default PageHeader;
