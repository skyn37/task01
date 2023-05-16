const db = require('../db')

async function seed() {
  try {
    await db.sequelize.sync({ force: true });
    const warehouses = await db.Warehouse.bulkCreate([
      { name: 'Warehouse A', size: 1000, isHazardous: true },
      { name: 'Warehouse B', size: 1000, isHazardous: false },
    ]);

    const products = await db.Product.bulkCreate([
      { name: 'Product 1', sizePerUnit: 5, isHazardous: true },
      { name: 'Product 2', sizePerUnit: 2, isHazardous: true },
      { name: 'Product 3', sizePerUnit: 10, isHazardous: false },
    ]);

    const movements = await db.StockMovement.bulkCreate([
      { productId: products[0].id, warehouseId: warehouses[0].id, type: 'import', amount: 100, date: new Date() },
      { productId: products[1].id, warehouseId: warehouses[0].id, type: 'import', amount: 50, date: new Date() },
      { productId: products[2].id, warehouseId: warehouses[1].id, type: 'import', amount: 200, date: new Date() },
      { productId: products[2].id, warehouseId: warehouses[1].id, type: 'export', amount: 100, date: new Date() },
    ]);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seed();