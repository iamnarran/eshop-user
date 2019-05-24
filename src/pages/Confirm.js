import React from "react";
import api from "../api";
import { Spin } from "antd";
import { toast } from "react-toastify";
import { css } from "glamor";

class Confirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  handleNotify = message =>
    toast(message, {
      position: "top-center",
      autoClose: 5000,
      progressClassName: css({
        background: "#feb415"
      })
    });

  componentDidMount() {
    api.customer.checkkey({ key: this.props.match.params.key }).then(res => {
      console.log(res);
      if (res.success) {
        this.handleNotify(res.message);
        this.props.history.push("/");
      } else {
        this.handleNotify(res.message);
        this.props.history.push("/");
      }
    });
  }

  render() {
    return (
      <div className="top-container">
        <div className="section">
          <div className="container pad10" />
          <center>
            <Spin spinning={this.state.loading} />
          </center>
        </div>
      </div>
    );
  }
}

export default Confirm;
