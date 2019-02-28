import React from "react"
import { TextField, Select } from "../"
import { Form, message } from "antd"

class Component extends React.Component{
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        message.success("Хүргэлтийн хаяг амжилттай бүртгэгдлээ")
      }
    });
  }

  render() {
    return (          
      <div className="col-md-8 pad10">      
        <div className="user-menu-content">        
          <p className="title">
            <span>Үзсэн барааны түүх</span>
          </p>
          <div className="user-profile-contain">                  
            
          </div>
        </div>
      </div>
    )
  }
}

const App = Form.create({ name: 'delivery' })(Component);
export default App;
