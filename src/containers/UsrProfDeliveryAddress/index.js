import React from "react";

import api from "../../api";
import { compose } from "react-komposer";
import Loader from "../../components/Loader";
import { DeliveryAddress } from "../../components";

const options = {
  loadingHandler: () => <Loader />
};

const fetch = async (props, onData) => {
  try {
    const location = await api.location.findAll();
    
    const cityOrProvince = []
    const map = new Map()
    location.data.map((index) => {
      if (!map.has(index.provinceid)) { 
        map.set(index.provinceid, true)
        cityOrProvince.push(index)
      }
      return ''
    })

    onData(null, {
      container: {
        cityOrProvince: cityOrProvince,
        districtOrSum: location.data,
      }
    });
  } catch (e) {
    console.log("CUSTOM ERROR: ");
    console.log(e);
  }
};

const dataLoader = (props, onData) => {
  fetch(props, onData);
};

export default compose(
  dataLoader,
  options
)(DeliveryAddress);
