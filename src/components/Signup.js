import React from 'react';
import { Modal } from 'antd';

class Signup extends React.Component {
  state = {
    isOpen: this.props.isOpen,
  }

  handleSave = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  handleCancel = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    return (
      <Modal
        title="Бүртгүүлэх"
        visible={this.state.isOpen}
        onOk={this.handleSave}
        onCancel={this.handleCancel}
        footer={[]}
      >
        <div className="modal-body">
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1" className="sr-only">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail3" aria-describedby="emailHelp" placeholder="Овог" />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1" className="sr-only">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword4" placeholder="Нэр" />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1" className="sr-only">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail5" aria-describedby="emailHelp" placeholder="Имэйл хаяг" />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1" className="sr-only">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword6" placeholder="Утасны дугаар" />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1" className="sr-only">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail7" aria-describedby="emailHelp" placeholder="Нууц үг" />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1" className="sr-only">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword8" placeholder="Нууц үг давтах" />
            </div>
            <button type="submit" className="btn btn-block btn-login text-uppercase">Бүртгүүлэх</button>
          </form>
          <span className="divide-maker">Эсвэл</span>
          <button type="submit" className="btn btn-block btn-social btn-facebook">
            <span>Facebook-р бүртгүүлэх</span></button>
          <button type="submit" className="btn btn-block btn-social btn-gmail">Gmail-р бүртгүүлэх</button>
          <button type="submit" className="btn btn-block btn-social btn-emart">Имарт картаар бүртгүүлэх</button>
        </div>
      </Modal>
    );
  }
}
export default Signup