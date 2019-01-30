import React, { Component } from 'react';

class Default extends Component {
  render() {
    console.log('default=>render', this.props);
    const { children } = this.props;
    return (
      <div className="main-container">
        <div className="wrap">
          {children}
        </div>
      </div>
    );
  }
}

export default Default;
