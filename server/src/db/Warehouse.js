module.exports = function(sequelize, DataTypes) {
  const Warehouse = sequelize.define('Warehouse', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    size: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    isHazardous: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });

  Warehouse.associate = function(models) {
    Warehouse.hasMany(models.Product, {
      foreignKey: 'warehouseId',
      as: 'products'
    });
    Warehouse.hasMany(models.StockMovement, {
      foreignKey: 'warehouseId',
      as: 'StockMovements'
    });
  };

  return Warehouse;
};