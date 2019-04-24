import React from "react";
import { Link } from "react-router-dom";
import { Spin, Select } from "antd";
import { toast } from "react-toastify";
import api from "../api";
import { CARD_LIST_TYPES, CARD_TYPES } from "../utils/consts";

class OrderDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    /* const { promoCats } = this.props.container;
    this.setState({ searchedProd: promoCats }); */
  }

  render() {
    console.log("orderDetail", this.props);

    return <h1>hello</h1>;
  }
}

export default OrderDetail;
