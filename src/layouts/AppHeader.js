import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Badge, Avatar } from 'antd';

import Category from '../components/Category';
import MainMenu from '../components/Menu';

class AppHeader extends Component {
  render() {
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

    return (
      <div className="top-container" >
        <div className="top-nav">
          <div className="container container-laptop pad10">
            <div className="row row10">
              <div className="col-xl-6 pad10">
                <ul className="list-inline left-panel">
                  <li className="list-inline-item">
                    <a href="" className="e-phone">
                      <Icon type="phone" theme="filled" style={{ color: 'rgba(254, 180, 21, 1)', }} />
                      <strong> {staticinfo.phone} </strong>
                    </a>
                  </li>                          
                </ul>
              </div>
              <div className="col-xl-6 pad10">
                <div className="text-right">
                  <ul className="list-inline right-panel">
                    <li className="list-inline-item language">
                      <form>
                        <select className="custom-select" defaultValue="0">
                          <option value='0' defaultValue>МОН</option>
                          <option value="1">ENG</option>
                          {/* <option value="2">KOR</option> */}
                        </select>
                      </form>
                    </li>
                    <li className="list-inline-item">
                      <Badge dot>
                        <Avatar shape="square" icon="bell" theme="filled" size="small" style={{ lineHeight: '20px' }} />
                      </Badge>
                    </li>
                    <li className="list-inline-item">
                      <Link to="" role="button" data-toggle="modal" data-target="#exampleModal1">
                        <span className="text-uppercase">Нэвтрэх</span>
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to="" role="button" data-toggle="modal" data-target="#exampleModal2">
                        <span className="text-uppercase">Бүртгүүлэх</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>              
        
        <div className="main-nav">
          <div className="container container-laptop pad10">
            <ul className="list-inline">
              <li className="list-inline-item active">
                <Link to="">
                  <Icon type="home" theme="filled" style={{ color: '#feb415' }}></Icon>
                </Link>
              </li>
              <li className="list-inline-item has-drop">
                <Link to="">
                  <span>Ангилал</span>
                  <Icon type="down" style={{ color: '#feb415' }} />
                </Link>
                <div className="drop-container">
                  <div className="container pad10">
                    <Category dataSource={root} />
                  </div>
                </div>
              </li>
              <MainMenu dataSource={menus} />
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default AppHeader;