import React from 'react';
import { Menu, Icon, Badge } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="mail">
      <a href="/">Beranda <Icon type="home" style={{ fontSize: 20, marginBottom: 3 }} /></a>
    </Menu.Item>
    <SubMenu title={<span>Halaman <Icon type="shop" style={{ fontSize: 20, marginBottom: 3 }} /></span>}>
      <MenuItemGroup title="Halaman 1">
        <Menu.Item key="setting:1">Opsi 1</Menu.Item>
        <Menu.Item key="setting:2">Opsi 2</Menu.Item>
      </MenuItemGroup>
      <MenuItemGroup title="Halaman 2">
        <Menu.Item key="setting:3">Opsi 3</Menu.Item>
        <Menu.Item key="setting:4">Opsi 4</Menu.Item>
      </MenuItemGroup>
    </SubMenu>
  </Menu>
  )
}

export default LeftMenu