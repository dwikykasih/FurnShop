import React from 'react'
import {Icon} from 'antd';

function Footer() {
    return (
        <div style={{
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem'
        }}>
           <p><Icon type="shop" spin="true" theme="filled"/> Selamat Belanja  <Icon type="shop" spin="true" /></p>
        </div>
    )
}

export default Footer
