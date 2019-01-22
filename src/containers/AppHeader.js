import React from 'react';
import api from '../api';
import { compose } from 'react-komposer';
import Loader from '../components/Loader';
import Header from '../layouts/AppHeader';

const options = {
    loadingHandler: () => <Loader />
};

const fetch = async (props, onData) => {
    try {
        const banners = await api.banner.findAll({ type: 'A1' });
        const brands = await api.brand.findAll();
        const staticinfo = await api.staticinfo.findAll();
        const menu = await api.menu.findAll();
        const category = await api.category.findAll();

        onData(null, {
            container: { 
                banner: banners.data,
                brands : brands.data,
                staticinfo: staticinfo.data[0],
                menus: menu.data,
                categories: category.data,
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
)(Header);
