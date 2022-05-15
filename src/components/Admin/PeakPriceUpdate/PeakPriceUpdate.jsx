import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
    Container, Row, Form, Col, Button, InputGroup, Alert, Modal
} from 'react-bootstrap';
import { DatePicker } from 'antd';
import moment from "moment";

class RestaurantMenuUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            percent: 0,
            fromdate: '',
            todate: '',
            errorMessage: false,
            successMessage: false
        };
        this.closeDishForm = this.closeDishForm.bind(this);
    }

    componentDidMount() {
        const { priceItem } = this.props;
        console.log(priceItem);
        if (priceItem !== undefined) {
            this.setState({
                name: priceItem.name,
                percent: priceItem.percent,
                fromdate: priceItem.fromdate,
                todate: priceItem.todate,
            });
        } else {
            (
                this.setState({
                    name: '',
                    percent: '',
                    fromdate: '',
                    todate: '',
                })
            );
        }
    }

    addItemToMenu = async (e) => {
        e.preventDefault();

        const {
            name, percent, fromdate, todate,
        } = this.state;
        const { priceItem } = this.props;
        // const {
        //   restaurant
        // } = this.context;
        console.log(this.state);
        if (name.length > 0 && percent > 0 && fromdate.length > 0 && todate.length > 0) {
            const priceItem1 = {
                name, percent, fromdate, todate,
            };

            console.log(priceItem1);

            if (priceItem === undefined) {
                fetch("http://localhost:8080/api/price/addprice", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors',
                    body: JSON.stringify(priceItem1),
                }).then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                        this.closeDishForm();
                        this.setState({ errorMessage: false, successMessage: true });
                    }
                });
            } else {
                fetch("http://localhost:8080/api/price/editDiscount/" + priceItem.id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors',
                    body: JSON.stringify(priceItem1),
                }).then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                        this.closeDishForm();
                        this.setState({ errorMessage: false, successMessage: true });
                    }
                });
            }
        } else {
            this.setState({ errorMessage: true, successMessage: false });
        }
    }

    deleteItemFromMenu = () => {
        const { priceItem } = this.props;
        if (priceItem !== undefined) {
            fetch("http://localhost:8080/api/price/deleteprice/" + priceItem.id, {
                method: 'delete'
            })
                .then((res) => {
                    this.closeDishForm();
                    console.log(res)});
        }
    }

    closeDishForm = () => {
        const { closeDishForm } = this.props;
        this.setState({
            name: '',
            percent: '',
            fromdate: '',
            todate: '',
        });
        closeDishForm();
    }

    handleFromDateChange = (date) => {
        const date1 = date ? moment(date).format("DD-MM-YYYY") : null
        this.setState({ fromdate: date1 });
    };

    handleToDateChange = (date) => {
        const date1 = date ? moment(date).format("DD-MM-YYYY") : null
        this.setState({ todate: date1 });
    };


    render() {
        const {
            name, percent, fromdate, todate, errorMessage, successMessage
        } = this.state;

        const { priceItem } = this.props;

        return (
            <>
                <Modal {...this.props} style={{ opacity: 1 }} onHide={this.closeDishForm} show aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Peak Price
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="show-grid">
                        <Container>
                            <Form>
                                {/* onSubmit={this.updateUserDetails} noValidate validated={isValidated}> */}
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridrestaurantName">
                                        <Form.Label>Peak Price Name</Form.Label>
                                        <InputGroup hasValidation>
                                            <Form.Control type="text" required value={name} onChange={((e) => this.setState({ name: e.target.value }))} placeholder="Name" />
                                            <Form.Control.Feedback type="invalid"> Please enter Peak Price name. </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Percent *</Form.Label>
                                        <InputGroup hasValidation>
                                            <Form.Control type="number" required value={percent} onChange={((e) => this.setState({ percent: e.target.value }))} placeholder="Enter Increase Percent" />
                                            <Form.Control.Feedback type="invalid">
                                                Please enter dish price.
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>From Date</Form.Label>
                                        <DatePicker
                                            defaultValue={fromdate ? moment(fromdate, "DD-MM-YYYY") : null}
                                            value={fromdate ? moment(fromdate, "DD-MM-YYYY") : null}
                                            onChange={(date) => this.handleFromDateChange(date)}
                                        />                 
                                     </Form.Group>
                                     <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>To Date</Form.Label>
                                        <DatePicker
                                            defaultValue={todate ? moment(todate, "DD-MM-YYYY") : null}
                                            value={todate ? moment(todate, "DD-MM-YYYY") : null}
                                            onChange={(date) => this.handleToDateChange(date)}
                                        />                 
                                     </Form.Group>
                                </Row>

                            </Form>
                            {errorMessage ? (
                                <Alert variant="danger">
                                    Fill in all the details
                                </Alert>
                            ) : ''}
                            {successMessage ? (
                                <Alert variant="success">
                                    Price added successfully
                                </Alert>
                            ) : ''}
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeDishForm}>
                            Close
                        </Button>
                        <Button
                            last
                            variant="primary"
                            type="submit"
                            onClick={this.addItemToMenu}
                        >
                            Save
                        </Button>
                        {priceItem !== undefined ? (
                            <Button
                                last
                                variant="primary"
                                type="submit"
                                onClick={this.deleteItemFromMenu}
                            >
                                Delete
                            </Button>
                        ) : ''}
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}



export default (RestaurantMenuUpdate);