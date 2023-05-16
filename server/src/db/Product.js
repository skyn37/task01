
module.exports = function(sequelize, DataTypes) {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sizePerUnit: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    isHazardous: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });

  Product.associate = function(models) {
    Product.belongsTo(models.Warehouse, {
      foreignKey: 'warehouseId',
      onDelete: 'CASCADE'
    });
    Product.hasMany(models.StockMovement, {
      foreignKey: 'productId',
      as: 'StockMovements'
    })
  };

  return Product;
};