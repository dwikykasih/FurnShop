import React, {useState} from 'react'
import Dropzone from 'react-dropzone';
import {Icon} from 'antd';
import Axios from 'axios';

function FileUpload(props) {

    //Informasi gambar
    const [Images,
        setImages] = useState([])

    const dropHandler = (files) => {
        //Setelah mengirim file
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        //formData
        formData.append("file", files[0])

        Axios.post('/api/product/image', formData, config)
            .then(response => {
                //response
                if (response.data.success) {
                    setImages([...Images, response.data.filePath])
                    props.refreshFunction([...Images, response.data.filePath])


                } else {
                    alert('Gagal menyimpan file!')
                }
            })
    }

    const deleteHandler = (image) => {
        const currentIndex = Images.indexOf(image);
        //Informasi gambar baru
        let newImages = [...Images]
        newImages.splice(currentIndex, 1)
        //timpa gambar
        setImages(newImages)
        props.refreshFunction(newImages)
    }

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between' 
            }}>

            <Dropzone onDrop={dropHandler}>
                {({ getRootProps, getInputProps }) => (
                    <div
                        style={{
                            width: 300, 
                            height: 240, 
                            border: '1px solid lightgray',
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center'
                        }}
                        {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Icon type="plus" style={{ fontSize: '3rem' }} />
                    </div>
                )}
            </Dropzone>

            <div style={{ 
                display: 'flex', 
                width: '350px', 
                height: '240px', 
                overflowX: 'scroll' }}>
                        
            {Images.map((image, index) => (
                //masukkan gambar

                    <div onClick={() => deleteHandler(image)} key={index}>
                        <img style={{ 
                            minWidth: '300px', 
                            width: '300px', 
                            height: '240px' }}
                            src={`http://localhost:5000/${image}`}
                            alt="haha"
                        />
                    </div>
                ))}


            </div>

        </div>
    )
}

export default FileUpload
