import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import ProductList from '../components/ProductList';
import { GET_PRODUCTS, CREATE_PRODUCT } from '../gql/queries';


const ProductForm = () => {
    const [name, setName] = useState('');
    const [sizePerUnit, setSizePerUnit] = useState('');
    const [isHazardous, setIsHazardous] = useState(false);

    const [createProduct] = useMutation(CREATE_PRODUCT, {
        update(cache, { data: { createProduct } }) {
            // Read the existing product list from the cache
            const { products } = cache.readQuery({ query: GET_PRODUCTS });

            // Add the new product to the list
            cache.writeQuery({
                query: GET_PRODUCTS,
                data: { products: [...products, createProduct] },
            });
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createProduct({
                variables: {
                    name,
                    sizePerUnit,
                    isHazardous,
                },
            });

            // Reset the form fields
            setName('');
            setSizePerUnit('');
            setIsHazardous(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container className='border rounded'>
            <h2 className='mt-2'>Products </h2>
            <Form onSubmit={handleSubmit} className="mt-3">
                <Form.Group as={Row} controlId="formName">
                    <Form.Label column sm="2">
                        Name:
                    </Form.Label>
                    <Col sm="6">
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-2"
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formSizePerUnit">
                    <Form.Label column sm="2">
                        Size per Unit:
                    </Form.Label>
                    <Col sm="6">
                        <Form.Control
                            type="number"
                            step="0.01"
                            value={sizePerUnit}
                            onChange={(e) => setSizePerUnit(Number(e.target.value))}
                            className="mt-2"
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formIsHazardous">
                    <Form.Label column sm="2">
                        Hazardous:
                    </Form.Label>
                    <Col sm="6">
                        <Form.Check
                            type="checkbox"
                            checked={isHazardous}
                            onChange={(e) => setIsHazardous(e.target.checked)}
                            className="mt-2"
                        />
                    </Col>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Create Product
                </Button>
            </Form>
            <ProductList />
            </Container>
    );
};

export default ProductForm;


