import React from "react"
import Card from "../../Card"

class Component extends React.Component{
  render() {
    const { product } = this.props
    
    return <div>
      <h1 className="title">
        <span className="text-uppercase">Ижил бараа</span>
      </h1>
      <div className="section">
        <div className="container pad10">
          <div className="row row10">
          {
            product.map((product, key) => {
              return (
                <Card key={key} item={product} extra={[]} renderType="1"/>
               ) 
            })
          }
          </div>
        </div>
      </div>
    </div>
  }
}

export default Component;