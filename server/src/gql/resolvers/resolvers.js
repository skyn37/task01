const db = require('../../db');
exports.resolvers = {
    Query: {
        warehouses: async () => {
            const warehouses = await db.Warehouse.findAll({
                include: [
                  {
                    model: db.Product,
                    as: 'products',
                    attributes: ['sizePerUnit'],
                    include: {
                      model: db.StockMovement,
                      as: 'StockMovements',
                    }
                  },
                  {
                    model: db.StockMovement,
                    as: 'StockMovements',
                  }
                ]
              });
              
              const warehouseData = warehouses.map(warehouse => {
                console.log(warehouses)
                const { id, name, size, products, StockMovements, isHazardous } = warehouse;
              
                const totalSizePerUnit = products.reduce((sum, product) => {
                  return sum + product.sizePerUnit;
                }, 0);
              
                const remainingSpace = StockMovements.reduce((remaining, movement) => {
                  if (movement.type === 'export') {
                    return remaining + (movement.amount * totalSizePerUnit);
                  } else {
                    return remaining - (movement.amount * totalSizePerUnit);
                  }
                }, size);
              
                const currentStockLevel = size - remainingSpace;
              
                return {
                  id,
                  name,
                  size,
                  remainingSpace,
                  isHazardous,
                  currentStockLevel
                };
              });
              console.log(warehouseData)
              return warehouseData;
        },
        warehouse: async (parent, { id }) => {
            const warehouse = await db.Warehouse.findByPk(id, { include: db.StockMovement });
            return warehouse;
        },
        products: async () => {
            const products = await db.Product.findAll({ include: db.StockMovements });
            return products;
        },
        product: async (parent, { id }) => {
            const product = await db.Product.findByPk(id, { include: db.StockMovements });
            return product;
        },
    },
    Mutation: {
        createWarehouse: async (parent, { name, size }) => {
            const warehouse = await db.Warehouse.create({ name, size });
            return warehouse;
        },
        createProduct: async (parent, { name, sizePerUnit, isHazardous }) => {
            const product = await db.Product.create({ name, sizePerUnit, isHazardous });
            return product;
        },
        createStock: async (parent, { amount, warehouseId, productId,type, date }) => {
        
            const warehouse = await db.Warehouse.findByPk(warehouseId);
            const product = await db.Product.findByPk(productId);
            console.log(product.isHazardous, 'prod', warehouse.isHazardous, 'ware')

                if (amount > product.sizePerUnit * warehouse.size) {
                    throw new Error(`Cannot export more than available space in the warehouse.`);
                }
                if ((product.isHazardous && !warehouse.isHazardous) || (!product.isHazardous && warehouse.isHazardous)) {
                    throw new Error(`Cannot add hazardous product to a non-hazardous warehouse.`);
                }
                const stock = await db.StockMovement.create({ amount, warehouseId, productId, type, date });
                return stock;

        },
    },
    Warehouse: {
        stocks: async (parent) => {
            const stocks = await db.StockMovement.findAll({ where: { warehouseId: parent.id } });
            return stocks;
        },
    },
    Product: {
        stocks: async (parent) => {
            const stocks = await db.StockMovement.findAll({ where: { productId: parent.id } });
            return stocks;
        },
    },
    StockMovement: {
        warehouse: async (parent) => {
            const warehouse = await db.Warehouse.findByPk(parent.warehouseId);
            return warehouse;
        },
        product: async (parent) => {
            const product = await db.Product.findByPk(parent.productId);
            return product;
        },
    },
};





