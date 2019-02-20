import React from 'react';
import api from '../../api';
import { compose } from 'react-komposer';
import Loader from '../../components/Loader';
import { ProductDetail } from "../../pages";

const options = {
    loadingHandler: () => <Loader />
};

const fetch = async (props, onData) => {
    try {
        const category = await api.category.findAll();
        onData(null, {
          container: {
            category: category.data,
          }
        });
    } catch (e) {
        console.log('CUSTOM ERROR: ');
        console.log(e);
    }
};

const dataLoader = (props, onData) => {
    fetch(props, onData);
};

export default compose(
    dataLoader,
    options
)(ProductDetail);
