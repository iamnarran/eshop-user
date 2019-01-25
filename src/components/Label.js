import React from 'react';
import Style from 'style-it';

class Label extends React.Component {
  render() {
    const item = this.props.item;

    return (
      <Style>
        {`
          .label {
            display: block;
            position: absolute;
            top: 15px;
            left: 5px;
          }
        `}
        <div className="label">
          <Style>
            {`
              .text {
                position: relative;
                display: block;
                width: 46px;
                height: 30px;
                background-color: ${this.props.bgColor};
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
                background-color: ${this.props.bgColor};
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
            `}
            <span className="text">{item && item.spercent ? item.spercent : null}%</span>
          </Style>
        </div>
      </Style>
    );
  }
};

export default Label;
