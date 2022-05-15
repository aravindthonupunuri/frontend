import React, { Component } from 'react';
import PriceCard from '../PriceCard/PriceCard';
import { Row, Col, Container } from 'react-bootstrap'
import PeakPriceUpdate from '../PeakPriceUpdate/PeakPriceUpdate'
import { Button, } from 'antd';
require('./PeakPricePage.css')

class PeakPricePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            priceList: [],
            showModal: false, dishItemIndex: ''
        };
    }

    getPeakPriceList = () => {
        fetch('http://localhost:8080/api/price/getallpeakprices').then(res => res.json()).then(res => this.setState({ priceList: res }));
    }

    componentDidMount() {
        this.getPeakPriceList();
    }

    closeDishForm = () => {
        this.setState({
            showModal: false,
            dishItemIndex: undefined
        });

        this.getPeakPriceList();
    }

    showDishMenu = (index) => {
        console.log(index);
        this.setState({
            dishItemIndex: index,
            showModal: true,
        });
    }
    render() {
        const { priceList, showModal, dishItemIndex } = this.state;
        return (
            <Container>
                <div>
                    <br />
                    <Row>
                        <h1 className='peak-peice-heading'>Peak Price</h1>
                        <Col xs={1}></Col>
                <span>
                            <br />
                            <Button type="primary" shape="round" size="Large" onClick={(e) => this.setState({showModal: true})}>
                                Add peak Price
                            </Button>
                        </span>
                    </Row>
                    <br />
                    {
                        priceList.length > 0 ? <div className="dish-cards"><Row lg={2} sm={1}><PriceCard priceList={priceList} editMenu={this.showDishMenu} /></Row></div> : ''
                    }
                    {showModal
                        ? (
                            <PeakPriceUpdate
                                closeDishForm={this.closeDishForm}
                                priceItem={priceList[dishItemIndex]}
                            />
                        )
                        : ''}
                </div>
            </Container>
        );
    }
}

export default PeakPricePage;