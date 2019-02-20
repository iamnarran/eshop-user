import React from 'react';
import PackageList from '../../components/PackageDetail/PackageList';
import MorePackage from '../../components/PackageDetail/MorePackage';
import Comment from '../../components/PackageDetail/comment';
import { Link } from "react-router-dom";


class PackageDetail extends React.Component {

    render() {
        return (
            <div className="section">
                <div className="container pad10">
                    <div className="e-breadcrumb">
                        <ul className="list-unstyled">
                            <li>
                                <Link to="">
                                    <span>Нүүр хуудас</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/package">
                                    <span>Хоолны жор</span>
                                </Link>
                            </li>
                            <li>
                                <span>Багц 2</span>
                            </li>
                        </ul>
                    </div>
                    <div className="product-detail-page">
                        <div className="row row10">
                            <div className="col-xl-9 col-md-8 pad10">
                                <h4 className="title">
                                    <span>Хичээлийн шинэ жил</span>
                                </h4>
                                <div className="pack-product-container">
                                    <div className="pack-total">
                                        <div className="flex-this">
                                            <div className="image-container default">
                                                <span className="image" style={{ backgroundImage: 'url(http://www.sparkawards.com/wp-content/uploads/2011/05/Product_Lg_Type.jpg)' }}></span>
                                            </div>
                                            <div className="info-container">
                                                <strong>Багц</strong>
                                                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id justo mi. Maecenas vel lectus id erat euismod porta sed in felis.</span>
                                            </div>
                                        </div>
                                    </div>
                                    <PackageList />
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-4 pad10">
                                <div className="product-plus">
                                    <div className="block product-delivery">
                                        <p className="title">
                                            <strong>Хүргэлтийн мэдээлэл</strong>
                                        </p>
                                        <p className="text">
                                            <span>Энгийн хүргэлт (48 цагийн дотор) - 89,000₮ дээш бараа авсан тохиолдолд үнэгүй</span>
                                        </p>
                                    </div>
                                    <MorePackage />
                                </div>
                            </div>
                            <div className="row row10">
                                <div className="col-xl-9 pad10">
                                    <Comment />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PackageDetail;

