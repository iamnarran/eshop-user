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
        const banners1 = await api.banner.findAll({ type: 'A1' });
        const banners2 = await api.banner.findAll({ type: 'A2' });
        const banners3 = await api.banner.findAll({ type: 'A3' });
        const brands = await api.brand.findAll();
        const category = await api.category.findAll();
        const widget = await api.widget.findAll();
        const emartProducts = await api.product.findAllEmartProducts({ jumcd: '01' });
        const discountProducts = await api.product.findAllDiscountProducts({ jumcd: '99' });
        const recipes = await api.recipe.findAll();
        const packageProducts = await api.packageProduct.findAll();

        const banners = [];
        banners[0] = banners1.data;
        banners[2] = banners2.data;
        banners[4] = banners3.data;

        onData(null, {
            container: { 
                banners,
                brands : brands.data,
                categories: category.data,
                widgets: widget.data,
                emartProducts: emartProducts.data,
                discountProducts: discountProducts.data,
                recipes: recipes.data,
                packageProducts: packageProducts.data,
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
