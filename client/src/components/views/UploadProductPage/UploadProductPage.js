import React, {useState} from 'react'
import {Typography, Button, Form, Input} from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';

const {Title} = Typography;
const {TextArea} = Input;

const ContinentsOptions = [
    {
        key: 1,
        value: "Jakarta"
    }, {
        key: 2,
        value: "Bogor"
    }, {
        key: 3,
        value: "Depok"
    }, {
        key: 4,
        value: "Tangerang"
    }, {
        key: 5,
        value: "Bekasi"
    }, {
        key: 6,
        value: "Lampung"
    }, {
        key: 7,
        value: "Yogyakarta"
    }
]
function UploadProductPage(props) {
    const [ProductTitle,
        setProductTitle] = useState("")
    const [Description,
        setDescription] = useState("")
    const [Price, setPrice] = useState(0)
    const [Continent,
        setContinent] = useState(0)
    const [Images, setImages] = useState([])

    const onTitleChange = (e) => {
        setProductTitle(e.currentTarget.value)
    }

    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value)
    }
    const onPriceChange = (e) => {
        setPrice(e.currentTarget.value)
    }
    const onContinentChange = (e) => {
        setContinent(e.currentTarget.value)
    }

    const updateImages = (newImages) =>{
        setImages(newImages)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (!ProductTitle || !Description || !Price || !Images) {
            return alert('Tidak boleh kosong!')
        }

        const body = {
            //로그인 된 사람의 Id
            writer: props.user.userData._id,
            title: ProductTitle,
            description: Description,
            price: Price,
            images: Images,
            continents: Continent

        }
         Axios.post('/api/product', body)
            .then(response => {
                if (response.data.success) {
                    alert('Data berhasil ditambahkan!') 
                    props.history.push('/')
                } else {
                    alert('Gagal ditambahkan!')
                }
            })
    } 

    return (
        <div
            style={{
            maxWidth: '700px',
            margin: '2rem auto'
        }}>
            <div
                style={{
                textAlign: 'center',
                marginBottom: '2rem'
            }}>
                <Title level={2}>
                 Unggah Produk </Title>
            </div>

            <Form onSubmit={onSubmit}>
               
                <FileUpload refreshFunction={updateImages}/>    
                <br/><br/>
                <label>Nama produk</label>
                <Input onChange={onTitleChange} value={ProductTitle}/>
                <br/><br/>
                <label>Deskripsi</label>
                <TextArea onChange={onDescriptionChange} value={Description}/>
                <br/><br/>
                <label>Harga (Ribu)</label>
                <Input type="number" onChange={onPriceChange} value={Price}/>
                <br/><br/>
                
                <br/><br/>

                <Button type="submit" size="large" onClick={onSubmit}>
                    Unggah
                </Button>

            </Form>
        </div>
    )
}

export default UploadProductPage
