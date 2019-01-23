import React from 'react';
import api from '../api';
import { compose } from 'react-komposer';
import Loader from '../components/Loader';
import SaleProduct from '../pages/SaleProduct';

const options = {
    loadingHandler: () => <Loader />
};

const fetch = async (props, onData) => {
    try {
        const saleproduct = await api.saleproduct.findAll({ jumcd: '01' });
        
        onData(null, {
            container: { 
                saleproduct: saleproduct.data
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
)(SaleProduct);
