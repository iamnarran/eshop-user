import React from "react";
import { compose } from "react-komposer";
import api from "../../api";
import Loader from "../../components/Loader";
import { WishList } from "../../components/index";
const options = {
    loadingHandler: () => <Loader />
};

const fetch = async (props, onData) => {
    try {
        const wishList = await api.packageProduct.findWishList({ id: 1 });
        onData(null, {
            container: {
                wishList: wishList.data
            }
        });
    } catch (e) {
        console.log("CUSTOM ERROR: ");
        console.log(e);
    }
};

const dataLoader = (props, onData) => {
    fetch(props, onData);
};

export default compose(
    dataLoader,
    options
)(WishList);
