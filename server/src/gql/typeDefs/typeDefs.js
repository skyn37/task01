

// define the GraphQL schema
exports.typeDefs = `
  type Warehouse {
    id: ID!
    name: String!
    size: Float!
    currentStockLevel: Float!
    remainingSpace: Float!
    stocks: [StockMovement!]!
    isHazardous: Boolean!
  }
  
  type Product {
    id: ID!
    name: String!
    sizePerUnit: Float!
    isHazardous: Boolean!
    stocks: [StockMovement!]!
  }
  
  type StockMovement {
    id: ID!
    amount: Int!
    createdAt: String!
    warehouse: Warehouse!
    product: Product!
    type: String!
    date: String!
  }
  
  type Query {
    warehouses: [Warehouse!]!
    warehouse(id: ID!): Warehouse
    products: [Product!]!
    product(id: ID!): Product
  }
  
  type Mutation {
    createWarehouse(name: String!, size: Float!): Warehouse!
    createProduct(name: String!, sizePerUnit: Float!, isHazardous: Boolean!): Product!
    createStock(amount: Int!, warehouseId: ID!, productId: ID!, date: String!, type: String!): StockMovement!
  }
`;
