import React from "react";
import PropTypes from "prop-types";

// import Slider from "./Slider";
import { IMAGE } from "../utils/consts";

class PageHeader extends React.Component {
  state = {
    title: "",
    subtitle: "",
    banners: [],
    bgColor: "#feb415"
  };

  componentDidMount() {
    console.log("In componentDidMount");
    this.setState({ ...this.props });
  }

  render() {
    // const sliderParams = {
    //   autoplay: {
    //     delay: 5000,
    //     disableOnInteraction: false
    //   },
    //   spaceBetween: 0
    // };

    console.log("props", this.props);
    console.log("state", this.state);

    const selected = this.props.banners[
      Math.floor(Math.random() * this.props.banners.length)
    ];

    return (
      <div
        className="whole-page-title"
        style={{ padding: "0", backgroundColor: `${this.props.bgColor}` }}
      >
        <div
          className="whole-page-title class container pad10"
          style={{
            backgroundImage: `url(${
              this.props.banners === undefined ? "" : IMAGE + selected.imgnm
            })`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right",
            backgroundSize: "50% 115px",
            backgroundColor: `${this.props.bgColor}`
          }}
        >
          <div className="container pad10">
            <div className="title-container flex-space">
              <h2>
                <span className="big">{this.props.title}</span>
                <strong>{this.props.subtitle}</strong>
              </h2>
            </div>
          </div>
          {/* <div
          className="main-slide"
          style={{ height: "148px", width: "843px", padding: "0", margin: "0" }}
        >
          <Slider
            data={this.props.banners}
            params={sliderParams}
            elContainer={""}
          /> */}
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
