import React from 'react';
import { Menu } from 'antd';
import { useSelector } from "react-redux";

function LeftMenu(props) {
  const user = useSelector(state => state.user)

  if (user.userData && !user.userData.isAuth) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="mail">
      <a href="/">Beranda</a>
    </Menu.Item>
    <Menu.Item key="" hidden={true}>
      <a href="/">Langganan</a>
    </Menu.Item>
  </Menu>
  )
}
return (
  <Menu mode={props.mode}>
  <Menu.Item key="mail">
    <a href="/">Beranda</a>
  </Menu.Item>
  <Menu.Item key="">
    <a href="/">Langganan</a>
  </Menu.Item>
</Menu>
)
}

export default LeftMenu