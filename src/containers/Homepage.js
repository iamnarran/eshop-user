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
        const category = await api.category.findAll();
        const widget = await api.widget.findAll();
        const emartProducts = await api.product.findAllEmartProducts();
        const discountProducts = await api.product.findAllDiscountProducts();
        const packageProducts = await api.product.findAllPackageProducts();
        const recipes = await api.recipe.findAllRecipes();

        onData(null, {
            container: { 
                banner: banners.data,
                brands : brands.data,
                categories: category.data,
                widgets: widget.data,
                emartProducts: emartProducts.data,
                discountProducts: discountProducts.data,
                packageProducts: packageProducts.data,
                recipes: recipes.data,
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
