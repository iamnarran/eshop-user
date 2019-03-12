import React from 'react'

class Compenent extends React.Component {
  render() {
    const { attribute } = this.props
    if (attribute.length !== 0) {
      return <div>
        <h1 className="title">
          <span className="text-uppercase">Мэдээлэл</span>
        </h1>        
        <div className="product-bottom-info">
          {
            attribute.map((i, key) => {
              return <div key={key} className="row row10">
                <dt className="col-sm-3">{i.value}</dt>
                <dd className="col-sm-6">{i.name}</dd>
              </div>
            })
          }
        </div>
      </div>
    } else return null
  }
}

export default Compenent; 