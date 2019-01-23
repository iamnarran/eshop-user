import React from 'react';
import Card from '../components/Card';
import { Link } from 'react-router-dom';

class Newproduct extends React.Component {
  render() {
    const { newproduct } = this.props.container;
    
    return(
      <div className="top-container">
        <div className="whole-page-title color-blue">
          <div className="container pad10">
            <div className="title-container flex-space">
              <h2>
                <span className="big">Шинэ</span>
                <strong>Шинээр худалдаалагдаж буй бараа бүтээгдэхүүн</strong>
              </h2>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="container pad10">
            <div className="row row10">
              {
                newproduct.map((product, key) => {
                  return <Card product={product} cardType="1" type="sale" key={key} neew />
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

Newproduct.default = {
  newproduct: [],
}

export default Newproduct;