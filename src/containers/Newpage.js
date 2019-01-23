import React from 'react';
import api from '../api';
import { compose } from 'react-komposer';
import Loader from '../components/Loader';
import Newpage from '../pages/NewProduct';

const options = {
    loadingHandler: () => <Loader />
};

const fetch = async (props, onData) => {
    try {
        const newproduct = await api.newproduct.findAll({ jumcd: '01' });
        console.log(newproduct);        
        
        onData(null, {
            container: { 
              newproduct: newproduct.data
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
)(Newpage);
