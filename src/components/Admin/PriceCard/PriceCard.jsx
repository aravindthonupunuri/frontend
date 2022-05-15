import React, { Component } from 'react';
import {
    Button, Col, Container, Card
} from 'react-bootstrap';
require('./PriceCard.css');

class PriceCard extends Component {
   

    displayPriceCards = () => {
        console.log('niin');
        const { priceList, } = this.props;
        let dishCard = [];
        for (let i = 0; i < priceList.length; i += 1) {
            const priceItem = priceList[i];
            dishCard.push(
                <>
                    <div className="dish-item-card" onClick={() => this.editDishContent(i)} role="button" tabIndex={i}>
                        <Col>
                            {/* // lg={6} md={5} sm={12}> */}
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{priceItem.name}</h5>
                                    <p className="card-text">
                                        {priceItem.fromdate} to {priceItem.todate}
                                    </p>
                                    <br />
                                    <p>{priceItem.percent}</p>
                                    {/* <Button>Add to cart</Button> */}
                                </div>
                            </div>
                        </Col>
                        <br />
                    </div>
                </>
            );
        }

        return dishCard;
    }

    editDishContent = (index) => {
            const { editMenu } = this.props;
            editMenu(index);
    }

    render() {
        console.log('in');

        return (
            <>
                <br />
                <br />
                {this.displayPriceCards()}
            </>
        );
    }
}

export default PriceCard;