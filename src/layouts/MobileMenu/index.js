import React from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;

class MobileMenu extends React.Component {
    state = {
        logInVisible: false,
        SingUpVisible: false,
    }

    showLogInModal = () => this.setState({ logInVisible: true });
    handleLogInSave = () => this.setState({ logInVisible: false, })
    handleLogInCancel = () => this.setState({ logInVisible: false, });
    showSingUpModal = () => this.setState({ SingUpVisible: true });
    handleSingUpSave = () => this.setState({ SingUpVisible: false, });
    handleSingUpCancel = () => this.setState({ SingUpVisible: false, });

    togglePopup = () => { this.props.onChange() };

    rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

    state = {
        openKeys: ['sub1'],
    };

    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }
    render() {
        const { popupClass } = this.props;
        const { staticinfo } = this.props.container;
        const { menus } = this.props.container;
        const { categories } = this.props.container;
        const root = [];

        categories.forEach((entry) => {
            if (entry.parentid === 0) {
                entry.children = [];
                root.push(entry);
            }
            root.forEach((ent) => {
                if (ent.id === entry.parentid) {
                    ent.children.push(entry);
                }
            });
        });

        var indents = menus.map(function (item, index) {
            return (
                <li key={index}>
                    <Link to={item.link}><span>{item.menunm}</span></Link>
                </li>
            );
        });

        var toggleCategory = root.map(function (item, index) {
            return (
                <SubMenu key={index} title={<span><span>{item.name}</span></span>}>
                    {
                        item.children && item.children.map(function (it, ind) {
                            return (
                                <Menu.Item key={ind} style={{ color: "white" }} ><a href=" " >{it.name}</a></Menu.Item>
                            )
                        })
                    }
                </SubMenu>
            )
        });

        return (
            <div>
                <div className={popupClass} style={{ height: '100%' }}>
                    <div className="single">
                        <ul className="list-unstyled flex-this flex-space top-1">
                            <li className="list-inline-item" onClick={this.togglePopup}>
                                <button className="button buttonBlack">
                                    <i className="fa fa-times" aria-hidden="true"></i>
                                </button>
                            </li>
                            <li className="list-inline-item">
                                <Link to="" className="e-phone">
                                    <i className="fa fa-phone" aria-hidden="true"></i>
                                    <strong>{staticinfo.phone}</strong>
                                </Link>
                            </li>
                            <li className="list-inline-item language">
                                <form>
                                    <select className="custom-select" defaultValue="0">
                                        <option value="0">МОН</option>
                                        <option value="1">ENG</option>
                                    </select>
                                </form>
                            </li>
                        </ul>
                        <ul className="list-unstyled flex-this flex-space top-2">
                            <li className="list-inline-item notification">
                                <Link to="#">
                                    <i className="fa fa-bell" aria-hidden="true"></i>
                                    <span>5</span>
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="#" onClick={this.showLogInModal}>
                                    <span className="text-uppercase">Нэвтрэх</span>
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="#" onClick={this.showSingUpModal}>
                                    <span className="text-uppercase">Бүртгүүлэх</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {
                        <div className="single top-3">
                            <ul className="list-unstyled flex-this flex-wrap">
                                {indents}
                            </ul>
                        </div>
                    }
                    {
                        <Menu
                            mode="inline"
                            openKeys={this.state.openKeys}
                            onOpenChange={this.onOpenChange}
                            theme="dark"
                            style={{ width: 256, backgroundColor: 'transparent' }}
                        >
                            {toggleCategory}
                        </Menu>
                    }
                </div>
                <Modal
                    title="Нэвтрэх"
                    visible={this.state.logInVisible}
                    onOk={this.handleLogInSave}
                    onCancel={this.handleLogInCancel}
                    footer={[]}
                >
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1" className="sr-only">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail9" aria-describedby="emailHelp" placeholder="Имэйл хаяг" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1" className="sr-only">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Нууц үг" />
                            </div>
                            <div className="form-group">
                                <div className="row row10">
                                    <div className="col-xl-6 pad10">
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                            <label className="custom-control-label" htmlFor="customCheck1">Сануулах</label>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 pad10">
                                        <div className="text-right">
                                            <Link to="#" className="btn btn-link">Нууц үгээ мартсан</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-block btn-login text-uppercase">Нэвтрэх</button>
                        </form>
                        <span className="divide-maker">Эсвэл</span>
                        <button type="submit" className="btn btn-block btn-social btn-facebook">
                            <span>Facebook-р бүртгүүлэх</span></button>
                        <button type="submit" className="btn btn-block btn-social btn-gmail">Gmail-р бүртгүүлэх</button>
                        <button type="submit" className="btn btn-block btn-social btn-emart">Имарт картаар бүртгүүлэх</button>
                        <div className="text-center">
                            <Link to="#" className="btn btn-link">Та шинээр бүртгүүлэх бол ЭНД ДАРЖ бүртгүүлнэ үү</Link>
                        </div>
                    </div>
                </Modal>

                <Modal
                    title="Бүртгүүлэх"
                    visible={this.state.SingUpVisible}
                    onOk={this.handleSingUpSave}
                    onCancel={this.handleSingUpCancel}
                    footer={[]}
                >
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1" className="sr-only">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail3" aria-describedby="emailHelp" placeholder="Овог" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1" className="sr-only">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword4" placeholder="Нэр" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1" className="sr-only">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail5" aria-describedby="emailHelp" placeholder="Имэйл хаяг" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1" className="sr-only">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword6" placeholder="Утасны дугаар" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1" className="sr-only">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail7" aria-describedby="emailHelp" placeholder="Нууц үг" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1" className="sr-only">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword8" placeholder="Нууц үг давтах" />
                            </div>
                            <button type="submit" className="btn btn-block btn-login text-uppercase">Бүртгүүлэх</button>
                        </form>
                        <span className="divide-maker">Эсвэл</span>
                        <button type="submit" className="btn btn-block btn-social btn-facebook">
                            <span>Facebook-р бүртгүүлэх</span></button>
                        <button type="submit" className="btn btn-block btn-social btn-gmail">Gmail-р бүртгүүлэх</button>
                        <button type="submit" className="btn btn-block btn-social btn-emart">Имарт картаар бүртгүүлэх</button>
                    </div>
                </Modal>
            </div>

        )
    }
}

export default MobileMenu;