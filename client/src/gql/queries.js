import { gql } from '@apollo/client';

export const CREATE_PRODUCT = gql`
mutation CreateProduct($name: String!, $sizePerUnit: Float!, $isHazardous: Boolean!) {
  createProduct(name: $name, sizePerUnit: $sizePerUnit, isHazardous: $isHazardous) {
    id
    name
    sizePerUnit
    isHazardous
  }
}
`;

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      sizePerUnit
      isHazardous
    }
  }
`;


export const GET_WAREHOUSES = gql`
  query GetWarehouses {
    warehouses {
      id
      name
      size
      remainingSpace
      currentStockLevel
      isHazardous
      stocks {
        id
        amount
        type
        date
        product {
          id
          name
          sizePerUnit
        }
      }
    }
  }
`;

export const CREATE_STOCK_MOVEMENT = gql`
mutation CreateStockMovement(
  $amount: Int!
  $type: String!
  $productId: ID!
  $warehouseId: ID!
  $date: String!
) {
  createStock(
    amount: $amount
    type: $type
    productId: $productId
    warehouseId: $warehouseId
    date: $date
  ) {
    id
    amount
    type
    product {
      id
      name
      sizePerUnit
    }
  }
}
`;