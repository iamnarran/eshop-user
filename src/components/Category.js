import React from 'react';
import { Link } from 'react-router-dom';

class MainMenu extends React.Component {
    render() {
        const data = this.props && this.props.dataSource;
        var indents = data.map(function (item, index) {
            return (
                <div className="col-md-3 pad20">
                    <ul className="list-unstyled">
                        <li>
                            <Link to="" key={index}>
                                <strong className="text-uppercase">{item.name}</strong>
                            </Link>
                        </li>
                        {
                            item.children && item.children.map(function (it, ind) {
                                return (
                                    <li>
                                        <Link to="" key={ind} className="list-unstyled">
                                            <span>
                                                {it.name}
                                            </span>
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div >
            )
        });
        return (
            <div className="row row10">
                {indents}
            </div>
        )
    }
}

export default MainMenu;
