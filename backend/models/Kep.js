import { DataTypes } from 'sequelize';
import db from '../config/database.js';

const Kep = db.define('Kep', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  hirdetes_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE'
  },
  file_path: {
    type: DataTypes.STRING,
    allowNull: false
  }
  },{
  tableName: 'kepek',
  timestamps: true
});

export default Kep;
