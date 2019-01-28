import React from 'react';
import Style from 'style-it';

class Label extends React.Component {
  render() {
    const { item, bgColor } = this.props;

    let content = null;
    if (item.spercent) {
      content = (
        <div>
          <strong>{item.spercent}</strong>
          <small>%</small>
        </div>
      );
    } else if (item.skucnt) {
      content = (
        <small>
          <span style={{ fontSize: '0.9rem' }}>{item.skucnt}ш</span><br />
          <span>бараа</span>
        </small>
      );
    }

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
                background-color: ${bgColor};
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
                background-color: ${bgColor};
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
              }
            `}
            <span className="text">
              {content}
            </span>
          </Style>
        </div>
      </Style>
    );
  }
};

export default Label;
