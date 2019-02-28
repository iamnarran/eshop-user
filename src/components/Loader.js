import React, { Component } from "react";
import Loader from "react-loaders";

class CustomLoader extends Component {
  render() {
    const { absolute } = this.props;
    return (
      <div className={`custom-loader ${absolute ? "abs" : ""}`}>
        <Loader type="line-scale" active />
      </div>
    );
  }
}

export default CustomLoader;
