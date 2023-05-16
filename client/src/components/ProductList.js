import React from 'react';
import {  useQuery } from '@apollo/client';
import { Table } from 'react-bootstrap';
import { GET_PRODUCTS } from '../gql/queries';




const ProductList = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const products = data.products;

  return (
    <Table striped bordered hover className='mt-2'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Size per Unit</th>
          <th>Is Hazardous</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.sizePerUnit}</td>
            <td>{product.isHazardous ? 'Yes' : 'No'}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProductList;