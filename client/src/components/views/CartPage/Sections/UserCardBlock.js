import React from 'react'
import  '../Sections/UserCardBlock.css'

function UserCardBlock(props) {

    const renderCartImage = (images) => {
        if(images.length > 0) {
            let image = images[0]
            return `http://localhost:5000/${image}`
        }
    }

    const renderItems = () => (
        props.products && props.products.map(product => (
            <tr key={product._id}>
              <td>
              <img style={{ width: '70px' }}            alt="product" 
                src={renderCartImage(product.images)} />
              </td>
              <td>
                  {product.quantity}
              </td>
              <td>
                   Rp. {product.price}.000 
              </td>
              <td>
                  <button onClick={() => props.removeItem(product._id)}>Remove</button>
              </td>
          </tr>  
        ))
    )

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Gambar Produk</th>
                        <th>Jumlah</th>
                        <th>Harga</th>
                        <th>Hapus dari keranjang!</th>
                    </tr>
                </thead>
                <tbody>
                    {renderItems()}
                </tbody>
            </table>
        </div>
    )
}

export default UserCardBlock
