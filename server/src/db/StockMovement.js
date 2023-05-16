module.exports = function(sequelize, DataTypes) {
    const StockMovement = sequelize.define('StockMovement', {
      type: {
        type: DataTypes.ENUM('import', 'export'),
        allowNull: false
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
  
    StockMovement.associate = function(models) {
      StockMovement.belongsTo(models.Warehouse, {
        foreignKey: 'warehouseId',
        onDelete: 'CASCADE'
      });
      StockMovement.belongsTo(models.Product, {
        foreignKey: 'productId',
        onDelete: 'CASCADE'
      });
    };
  
    return StockMovement;
  };