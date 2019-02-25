import React from "react"
import {TextField, Select} from "../"

class Component extends React.Component{
  state = {
    cityOrProvince: [],
    districtOrSum: [],
    selectedCity: 'Улаанбаатар',
    city: false,
  }
  componentDidMount() { this.setState({ ...this.props.container }) }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('OK ', values);
      }
    });
  }

  onChangeCity = (e) => {
    const { districtOrSum } = this.props.container
    let tmp = []
    
    districtOrSum.map((i) => {
      if(i.provinceid === e){tmp.push(i)}
      return ''
    })
    this.setState({districtOrSum: tmp})
  }
  render() {   
    return (
      <div className="section section-gray">        
        <div className="container pad10">          
          <div className="user-section">          
            <div className="user-section-container">            
              <div className="col-md-8 pad10">
              
                <div className="user-menu-content">
                
                  <p className="title">
                    <span>Хүргэлтийн хаяг</span>
                  </p>
                  <div className="user-profile-contain">                  
                    <form>
                      <div className="row row10">
                        <div className="col-xl-6 pad10">
                          <div className="e-mart-input">
                          <TextField label="Овог" />
                          </div>
                        </div>
                        <div className="col-xl-6 pad10">
                          <div className="form-group">
                            <TextField label="Утас" />
                          </div>
                        </div>
                        <div className="col-xl-12 pad10">
                          <div className="form-group">
                            <TextField label="Гэрийн хаяг" />
                          </div>
                        </div>
                      </div>
                      <div className="row row10">
                        <div className="col-xl-6 pad10">
                          <div className="form-group">
                            <Select label="Хот/Аймаг" option={this.state.cityOrProvince} city onChange={this.onChangeCity}/>
                          </div>
                        </div>
                        <div className="col-xl-6 pad10">
                          <div className="form-group">
                            <Select label="Сум/Дүүрэг" option={this.state.districtOrSum}/>
                          </div>
                        </div>
                      </div>                      
                    </form>
                    <div className="text-right">
                      <button className="btn btn-dark">
                        <span className="text-uppercase" onClick={this.handleSubmit}>Хадгалах</span>
                      </button>
                    </div>
                    <div className="delivery-address">
                      <p className="title">
                        <span>Бүртгэлтэй хаягууд</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Component;
