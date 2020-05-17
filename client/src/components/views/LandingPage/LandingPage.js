import React, {useEffect, useState} from 'react'
import Axios from 'axios';
import {
    Icon,
    Col,
    Card,
    Row,
    Typography,
    Button
} from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import { continent, price } from './Sections/Data';
import SearchFeature from './Sections/SearchFeature';
const {Title} = Typography;

function LandingPage() {

    const [Products,
        setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0) 
    const [Filters, setFilters] = useState({continent: [], price: []})
    const [SearchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        let body = {
            skip: Skip,
            limit: Limit
        }

        getProducts(body)

    }, [])

    const getProducts = (body) =>{
        Axios
        .post('/api/product/getProducts', body)
        .then(response => {
            if (response.data.success) {
                if(body.loadMore){
                    setProducts([...Products, ...response.data.productInfo])
                }else{
                    setProducts(response.data.productInfo)
                }
                setPostSize(response.data.postSize)
            } else {
                alert('Gagal menampilkan produk!')
            }
        })
}
    
    const loadmoreHandler = () => {
        let skip = Skip+Limit

        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true
        }
        getProducts(body)
        setSkip(skip)
    }

    const renderCards = Products.map((product, index) => {
        return <Col key={index} lg={6} md={8} xs={24} >
            <Card 
            cover={<a href={`/product/${product._id}`}><ImageSlider image={product.images} /></a>}
                >
                <Meta 
                description={`Rp. ${product.price}000`}/>
            </Card>
        </Col>
    })

    const showFilteredResults = (filters)=>{

        let body = {
            skip: 0,
            limit: Limit,
            filters: filters
        }

        getProducts(body)
        setSkip(0)
    }

    const handleprice = (value)=>{
       const data = price;
       let array = [];
       
       for(let key in data){
           if(data[key]._id === parseInt(value, 10)){
               array = data[key].array;
               } 
       }
       return array;
    }
     
    const handleFilters = (filters, category) =>{
        const newFilters = {...Filters}
        newFilters[category] = filters
        console.log("filters", filters);

        if(category === "price"){

            let priceValues = handleprice(filters)
            newFilters[category] = priceValues
        }

        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

    const updateSearchTerm = (newSearchTerm) =>{
        
        let body ={
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }

        setSkip(0)
        setSearchTerm(newSearchTerm)
        getProducts(body)
    }

    return (

        <div
            style={{
            width: '75%',
            margin: '3rem auto'
        }}>
            <div style={{
                textAlign: 'center'
            }}>
                <Title>Selamat Belanja <Icon type="smile"/></Title>
            </div>

            
 
           

            
            {/* Search */}
            <div style={{display:'flex', justifyContent:'center', margin:'1rem auto'}}>
            <SearchFeature refreshFunction={updateSearchTerm}/>
            </div>
            <hr/>

            {/* Cards */}
            <Row gutter={[16, 16]}>
                {renderCards}
            </Row>
            <br/>
            {/* PostSize */}
            {PostSize >= Limit && 
            <div
                style={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <Button onClick={loadmoreHandler}>Muat..</Button>
            </div>
        }
        </div>

    )
}

export default LandingPage
