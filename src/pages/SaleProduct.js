import React from 'react';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
/* import PropTypes from 'prop-types'; */

class Salepage extends React.Component {
  render() {
    const { saleproduct } = this.props.container;
    return (
      <div className="top-container">
        <div className="whole-page-title color-main">
          <div className="container pad10">
            <div className="title-container flex-space">
              <h2>
                <span className="big">Хямдралтай</span>
                <strong>Хугацаагүй хямдрал зарлагдсан бараа бүтээгдэхүүн</strong>
              </h2>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="container pad10">
            <div className="row row10">
              {
                saleproduct.map((product, key) => {
                  return <Card product={product} cardType="1" type="sale" key={key} sale />
                })
              }
            </div>
          </div>
          <div className="more-link text-center">
            <Link to="" className="btn btn-border">
              <span className="text text-uppercase">Бусад барааг үзэх</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Salepage.default = {
  saleproduct: []
}

export default Salepage;