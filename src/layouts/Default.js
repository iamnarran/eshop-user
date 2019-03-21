import React, { Component } from "react";

class Default extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="main-container">
        <div className="wrap">{children}</div>
      </div>
    );
  }
}

export default Default;
