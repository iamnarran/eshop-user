import React from 'react'
import p5 from "../../../scss/assets/images/demo/2.jpg"
import { Button } from "antd"

class Compenent extends React.Component {
  state = {
    more: false,
    product: []
  }

  componentDidMount(){
    if(this.props.product.length !== 0){
      this.setState({product: this.props.product.slice(0,4)})
    }
  }


  onClickSeeMore = () => { 
    this.setState({ more: true, product: this.props.product }) 
  }

  render() {
    const { product } = this.state
    if (product.length !== 0) {
      return (
        <div className="block product-suggest">
        <p className="title">
          <strong>Хослох бараа</strong>
        </p>
        <ul className="list-unstyled">
          {
            product.map((i, key) => {
            return (
              <li key={key}>
                <div className="single flex-this">
                  <div className="image-container">
                    <a href="/">
                      <span className="image" style={{backgroundImage: `url(${p5})`}}></span>
                    </a>
                  </div>
                  <div className="info-container flex-space">
                    <a href="/">
                      <span>{i.name}</span>
                      <strong>{money.format(i.price)}₮</strong>
                    </a>
                    <div className="action">
                      <a href="/">
                        <i className="fa fa-cart-plus" aria-hidden="true"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            )})
          }          
        </ul>
        <div className="more-link text-center">
            <Button className="btn btn-border" onClick={this.onClickSeeMore}>
            <span className="text text-uppercase">Бүх хослох барааг үзэх</span>
          </Button>
        </div>
      </div>
      )
    }else return null
  }
}
const money = new Intl.NumberFormat('en-US');

export default Compenent;
