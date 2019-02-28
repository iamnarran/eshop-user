import React from "react";
import Style from "style-it";
import PropTypes from "prop-types";

class Label extends React.Component {
  state = {
    data: null,
    seq: 0
  };

  componentDidMount() {
    this.setState({ ...this.props });
  }

  render() {
    if (!this.state.data) {
      return null;
    }

    let content = null;
    if (this.state.data.content) {
      if (this.state.data.isPackage) {
        content = (
          <small>
            <span style={{ fontSize: "0.9rem" }}>
              {this.state.data.content ? this.state.data.content : ""}
            </span>
            <span>{this.state.data.text ? this.state.data.text : ""}</span>
          </small>
        );
      } else {
        content = (
          <div>
            <strong>
              {this.state.data.content ? this.state.data.content : ""}
            </strong>
            <small>{this.state.data.text ? this.state.data.text : ""}</small>
          </div>
        );
      }
    } else {
      content = (
        <div>
          <span className="text" style={{ fontSize: "0.9rem" }}>
            <strong>{this.state.data.text ? this.state.data.text : ""}</strong>
          </span>
        </div>
      );
    }

    let topSpacing = 15 + this.state.seq * 55;
    let color = this.state.data.color ? this.state.data.color : "#f00";

    return (
      <Style>
        {`
          .label {
            display: block;
            position: absolute;
            top: ${topSpacing}px;
            left: 5px;
          }
        `}
        <div className="label" style={{ zIndex: 100 }}>
          <Style>
            {`
              .text {
                position: relative;
                display: block;
                width: 46px;
                height: 30px;
                background-color: ${color};
                text-align: center;
                font-size: 1.5rem;
                color: white;
                letter-spacing: -1px;
                vertical-align: top;
                border-radius: 5px;
                z-index: 1;
                line-height: 30px;
              }
              .text:before, .text:after {
                z-index: 0;
                position: absolute;
                content: '';
                background-color: ${color};
                width: 26px;
                height: 26px;
                top: -11px;
                -webkit-transform: rotate(-45deg) skew(15deg, 15deg);
                -moz-transform: rotate(-45deg) skew(15deg, 15deg);
                -ms-transform: rotate(-45deg) skew(15deg, 15deg);
                -o-transform: rotate(-45deg) skew(15deg, 15deg);
                transform: rotate(-45deg) skew(15deg, 15deg);
                border-radius: 3px;
                left: 10px;
              }
              .text:after {
                top: 15px;
              }
              .text strong {
                font-weight: 400;
                position: relative;
                z-index: 1;
              }
              .text small {
                position: relative;
                z-index: 1;
                font-size: 0.7rem;
                display: inline-block;
                margin-left: 2px;
                line-height: 1.2;
                letter-spacing: 1px;
              }
            `}
            <span className="text">{content}</span>
          </Style>
        </div>
      </Style>
    );
  }
}

Label.propTypes = {
  data: PropTypes.object.isRequired,
  seq: PropTypes.number
};

export default Label;
