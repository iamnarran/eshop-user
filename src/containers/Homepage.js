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
        const emartProducts = await api.product.findAllEmartProducts({ jumcd: '99' });
        const discountProducts = await api.product.findAllDiscountProducts({ jumcd: '99' });
        const recipes = await api.recipe.findAll();
        const packageProducts = await api.packageProduct.findAll();
        const tags1 = await api.tag.findAll({ type: '1' });
        const tags2 = await api.tag.findAll({ type: '2' });
        const tags3 = await api.tag.findAll({ type: '3' });
        const tags4 = await api.tag.findAll({ type: '4' });

        const banners = [];
        banners[0] = banners1.data;
        banners[2] = banners2.data[0];
        banners[4] = banners3.data[0];

        const tags = [];
        tags[1] = tags1.data[0];
        tags[2] = tags2.data[0];
        tags['recipe'] = tags3.data[0];
        tags['discount'] = tags4.data[0];

        console.log(banners[0]);

        onData(null, {
            container: { 
                banners,
                tags,
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
