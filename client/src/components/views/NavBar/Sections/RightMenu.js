/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu, Icon, Badge } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";


function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("./views/Activity/Login.js");
      } else {
        alert('Logout gagal')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Login <Icon type="login" style={{ fontSize: 20, marginBottom: 3 }} /></a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Register <Icon type="user" style={{ fontSize: 20, marginBottom: 3 }} /></a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>

        <Menu.Item key="history">
          <a href="/history">Riwayat <Icon type="history" style={{ fontSize: 20, marginBottom: 3 }} /></a>
        </Menu.Item>

        <Menu.Item key="upload">
          <a href="/product/upload">Unggah <Icon type="upload" style={{ fontSize: 20, marginBottom: 3 }} /></a>
        </Menu.Item>

        <Menu.Item key="cart">
          <a href="/user/cart">Keranjang <Icon type="shopping-cart" style={{ fontSize: 20, marginBottom: 3 }} />
          </a>
        </Menu.Item>


        <Menu.Item key="logout">
          <a>Keluar <Icon type="logout" style={{ fontSize: 20, marginBottom: 3 }} /></a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);

