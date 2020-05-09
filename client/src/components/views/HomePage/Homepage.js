import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Icon, Col, Card, Row } from 'antd';
import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import { kota, harga} from './Sections/Datas';
import SearchFeature from './Sections/SearchFeature';

const { Meta } = Card;

function HomePage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState()
    const [SearchTerms, setSearchTerms] = useState("")
    const [Filters, setFilters] = useState({
        kota: [],
        harga: [],
    })

    const onLoadMore = () => {
        let skip = Skip + Limit;

        const variables = {
            skip: skip,
            limit: Limit,
            loadMore: true,
            filters: Filters,
            searchTerm: SearchTerms
        }
        
    }

    const nilaiHarga = (value) => {
        const data = harga;
        let array = [];

        for (let key in data) {

            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }
        console.log('array', array)
        return array
    }

    const handleFilters = (filters, category) => {

        const newFilters = { ...Filters }

        newFilters[category] = filters

        if (category === "harga") {
            let priceValues = nilaiHarga(filters)
            newFilters[category] = priceValues

        }

        console.log(newFilters)

        showFilteredResults(newFilters)
        setFilters(newFilters)
    }
    const showFilteredResults = (filters) => {

        const variables = {
            skip: 0,
            limit: Limit,
            filters: filters

        }
        setSkip(0)

    }

    const updateSearchTerms = (newSearchTerm) => {

        const variables = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }

        setSkip(0)
        setSearchTerms(newSearchTerm)

    }

    return (
        <div style={{ width: '75%', margin: '3rem auto'}}>
            <div style={{ textAlign: 'center' }}>
                <h2>  Silahkan Pilih Barang  <Icon type="shop" />  </h2>
            </div>


            {/* Saring  */}

            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24} >
                    <CheckBox
                        list={kota}
                        handleFilters={filters => handleFilters(filters, "kota")}
                    />
                </Col>
                <Col lg={12} xs={24}>
                    <RadioBox
                        list={harga}
                        handleFilters={filters => handleFilters(filters, "harga")}
                    />
                </Col>
            </Row>


            {/* Pencarian  */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>

                <SearchFeature
                    refreshFunction={updateSearchTerms}
                />

            </div>


            {Products.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>Barang tampil disini</h2>
                </div> :
                <div>
                    <Row gutter={[16, 16]}>

                    </Row>


                </div>
            }
            <br /><br />

            


        </div>
    )
}

export default HomePage
