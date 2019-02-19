import React from 'react';

class Comment extends React.Component {
    render() {
        return (
            <div className="comments-container">
                <h1 className="title">
                    <span className="text-uppercase">Сэтгэгдэл</span>
                </h1>
                <div className="comments-list">
                    <div className="main-rating">
                        <a href=" " className="rating">
                            <ul className="list-inline">
                                <li className="list-inline-item active">
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                </li>
                                <li className="list-inline-item active">
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                </li>
                                <li className="list-inline-item half-active">
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                </li>
                                <li className="list-inline-item">
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                </li>
                                <li className="list-inline-item">
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                </li>
                                <li className="list-inline-item">
                                    <span className="text">197</span>
                                </li>
                            </ul>
                        </a>
                        <p className="text">(32 хүн үнэлгээ өгсөн байна)</p>
                    </div>
                    <div className="single">
                        <a href=" " className="rating">
                            <ul className="list-inline">
                                <li className="list-inline-item active">
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                </li>
                                <li className="list-inline-item active">
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                </li>
                                <li className="list-inline-item half-active">
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                </li>
                                <li className="list-inline-item">
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                </li>
                                <li className="list-inline-item">
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                </li>
                            </ul>
                        </a>
                        <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                        <ul className="list-unstyled bottom-info">
                            <li>
                                <span>2018.09.12</span>
                            </li>
                            <li>
                                <strong>Батаa</strong>
                            </li>
                        </ul>
                    </div>
                    <div className="single">
                        <a href=" " className="rating">
                            <ul className="list-inline">
                                <li className="list-inline-item active">
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                </li>
                                <li className="list-inline-item active">
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                </li>
                                <li className="list-inline-item half-active">
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                </li>
                                <li className="list-inline-item">
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                </li>
                                <li className="list-inline-item">
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                </li>
                            </ul>
                        </a>
                        <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id justo mi. Maecenas vel lectus id erat euismod porta sed in felis. In massa mi, ornare vel sem eu, cursus vehicula leo. Curabitur vestibulum nisi at lacus dictum, non eleifend eros ullamcorper. </p>
                        <ul className="list-unstyled bottom-info">
                            <li>
                                <span>2018.09.12</span>
                            </li>
                            <li>
                                <strong>Батаa</strong>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Comment;