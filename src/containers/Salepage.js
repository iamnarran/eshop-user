import React from 'react';
import api from '../api';
import { compose } from 'react-komposer';
import Loader from '../components/Loader';
import Salepage from '../pages/Salepage';

const options = {
    loadingHandler: () => <Loader />
};

const fetch = async (props, onData) => {
    try {
        // const staticinfo = await api.staticinfo.findAll();
        // console.log(staticinfo.data[0]);
        onData(null, {
            container: { 
                staticinfo: []
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
)(Salepage);
