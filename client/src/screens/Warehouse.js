import React, { useState } from 'react';
import {  useMutation, useQuery } from '@apollo/client';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { GET_WAREHOUSES, GET_PRODUCTS, CREATE_STOCK_MOVEMENT } from '../gql/queries';


const WarehouseStockMovementScreen = () => {
    const [selectedWarehouse, setSelectedWarehouse] = useState('');
    const [amount, setAmount] = useState(0);
    const [type, setType] = useState('import');
    const [selectedProduct, setSelectedProduct] = useState('');
    const [date, setDate] = useState('');

    const [createStockMovement] = useMutation(CREATE_STOCK_MOVEMENT, {
        refetchQueries: [{ query: GET_WAREHOUSES }],
    });

    const handleSubmit = (e) => {
        e.preventDefault();


        createStockMovement({
            variables: {
                amount: parseInt(amount),
                type,
                productId: selectedProduct,
                warehouseId: selectedWarehouse,
                date: type === 'import' ? date : new Date().toISOString(), // Set date based on type
            },
        });

        // Reset the form fields
        setAmount(0);
        setType('import');
        setSelectedProduct('');
        setDate('');
    };

    const getCurrentStockLevel = () => {
        if (selectedWarehouse) {
            const warehouse = data.warehouses.find(
                (warehouse) => warehouse.id === selectedWarehouse
            );
            if (warehouse) {
                return warehouse.currentStockLevel;
            }
        }
        return 0;
    };

    const getRemainingSpace = () => {
        if (selectedWarehouse) {
            const warehouse = data.warehouses.find(
                (warehouse) => warehouse.id === selectedWarehouse
            );
            if (warehouse) {
                return warehouse.remainingSpace;
            }
        }
        return 0;
    };

    const getStockMovements = () => {
        if (selectedWarehouse) {
            const warehouse = data.warehouses.find(
                (warehouse) => warehouse.id === selectedWarehouse
            );
            if (warehouse) {
                console.log(warehouse)
                return warehouse.stocks;
            }
        }
        return [];
    };

    const { data, loading, error } = useQuery(GET_WAREHOUSES);
    const productsResp = useQuery(GET_PRODUCTS);
    const errors = error || productsResp.error;
    const loadings = loading || productsResp.loading;

    if (loadings) {
        return <p>Loading...</p>;
    }

    if (errors) {
        return <p>Error: {errors.message}</p>;
    }

    const handleWarehouseChange = (e) => {
        setSelectedWarehouse(e.target.value);
    };

    const handleProductChange = (e) => {
        setSelectedProduct(e.target.value);
    };

    return (
        <Container className='border rounded'>
            <h2 className='mt-2'>Warehouse Stock Movement</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} controlId="formWarehouse">
                    <Form.Label column sm="2">
                        Warehouse:
                    </Form.Label>
                    <Col sm="6">
                        <Form.Control as="select" value={selectedWarehouse} onChange={handleWarehouseChange}>
                            <option value="">Select a warehouse</option>
                            {data.warehouses.map((warehouse) => (
                                <option key={warehouse.id} value={warehouse.id}>
                                    {warehouse.name} : {warehouse.isHazardous ? "Hazardous" : "Safe"}
                                </option>
                            ))}
                        </Form.Control>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formAmount">
                    <Form.Label column sm="2">
                        Amount:
                    </Form.Label>
                    <Col sm="6">
                        <Form.Control type="number" value={amount} onChange={(e) => setAmount(parseInt(e.target.value))} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formType">
                    <Form.Label column sm="2">
                        Type:
                    </Form.Label>
                    <Col sm="6">
                        <Form.Control as="select" value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="import">Import</option>
                            <option value="export">Export</option>
                        </Form.Control>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formProduct">
                    <Form.Label column sm="2">
                        Product:
                    </Form.Label>
                    <Col sm="6">
                        <Form.Control as="select" value={selectedProduct} onChange={handleProductChange}>
                            <option value="">Select a product</option>
                            {selectedWarehouse &&
                                productsResp.data.products.map((product) => (
                                    <option key={product.id} value={product.id}>
                                        {product.name} | {product.sizePerUnit} | {product.isHazardous ? "Hazardous" : "Safe"}
                                    </option>
                                ))}
                        </Form.Control>
                    </Col>
                </Form.Group>

                {type === 'import' && (
                    <Form.Group as={Row} controlId="formDate">
                        <Form.Label column sm="2">
                            Date:
                        </Form.Label>
                        <Col sm="6">
                            <Form.Control
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                )}

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

            <h3>Current Stock Level</h3>
            {selectedWarehouse ? (
                <div>
                    <p>Warehouse: {selectedWarehouse}</p>
                    <p>Current Stock Level: {getCurrentStockLevel()}</p>
                    <p>Remaining Space: {getRemainingSpace()}</p>
                    <p>Stock Movements:</p>
                    <ul>
                        {getStockMovements().map((stock) => (

                            <li key={stock.id}>
                                {stock.type} - {stock.product.name}: {stock.amount} : {new Date(Number(stock.date)).toLocaleDateString("en-US")}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null}
        </Container>
    );
};

export default WarehouseStockMovementScreen;