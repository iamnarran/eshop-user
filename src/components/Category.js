import React from 'react';
import { Link } from 'react-router-dom';

class MainMenu extends React.Component {
    render() {
        const data = this.props && this.props.dataSource;

        var indents = data.map(function (item, index) {
            return (
                <div className="col-xl-3 pad10" style={{marginBottom: '15px'}} key={index}>
                    <ul className="list-unstyled">
                        <Link to="" key={index}>
                            <strong className="text-uppercase">
                                {item.name}
                            </strong>
                        </Link>
                        {
                            item.children && item.children.map(function (it, ind) {
                                return (
                                    <Link to="" key={ind}>
                                        <span>
                                            {it.name}
                                        </span>
                                    </Link>
                                )
                            })
                        }
                    </ul>
                </div>
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
