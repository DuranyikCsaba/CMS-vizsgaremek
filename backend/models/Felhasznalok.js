
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Felhasznalok = sequelize.define('Felhasznalok', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nev: {
    type: DataTypes.STRING,
    allowNull: false
  },
  jelszo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  tel: {
    type: DataTypes.STRING
  },
  tipus: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
}, {
  tableName: 'felhasznalok', // Itt adhatod meg a tábla nevét
  timestamps: true
});

export default Felhasznalok;
