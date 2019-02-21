import React from 'react';
import api from '../../api';
import { compose } from 'react-komposer';
import Loader from '../../components/Loader';
import { Package } from "../../pages";

const options = {
    loadingHandler: () => <Loader />
};

const fetch = async (props, onData) => {
    try {
        const packageProducts = await api.packageProduct.findAll();
        const mainbanner = await api.banner.findAll({ type: 'L1' });
        const secondaryBanners = await api.banner.findAll({ type: 'L2' });
        const menu = await api.menu.findAll();
        const widget = await api.widget.findAll();
        onData(null, {
            container: {
                packageProducts: packageProducts.data,
                mainbanner: mainbanner.data[Math.floor(Math.random() * (mainbanner.data.length))],
                secondaryBanners: secondaryBanners.data,
                widget: widget.data.filter(i => {
                    if (i.slug === 'package') { return i }
                    return null
                }),
                menu: menu.data.filter(i => {
                    if (i.id === 74) { return i }
                    return null
                }),
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
)(Package);
