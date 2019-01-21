import React from 'react';
import api from '../api';
import { compose } from 'react-komposer';
import Homepage from '../pages/Homepage';
import Loader from '../components/Loader';

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
        const widget = await api.widget.findAll();
        const emartProducts = await api.product.findAllEmartProducts();
        const saleProducts = await api.product.findAllSaleProducts();
        const newProducts = await api.product.findAllNewProducts();

        onData(null, {
            container: { 
                banner: banners.data,
                brands : brands.data,
                staticinfo: staticinfo.data[0],
                menus: menu.data,
                categories: category.data,
                widgets: widget.data,
                emartProducts: emartProducts.data,
                saleProducts: saleProducts.data,
                newProducts: newProducts.data,
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
)(Homepage);
