import React from 'react'
import {Carousel} from 'antd';

function ImageSlider(props) {
    return (
        <div>
            <Carousel autoplay >
                {props.image.map((image, index) => (
                    <div key={index}>
                        <img style={{ width: '100%', maxHeight: '130px' }}
                            src={`http://localhost:5000/${image}`} 
                            alt="Hi"/>
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default ImageSlider
