import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Hirdetesek = sequelize.define('Hirdetesek', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  modell: {
    type: DataTypes.STRING,
    allowNull: false
  },
  marka: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ajtok_szama: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  hengerurtartalom: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  uzemanyag: {
    type: DataTypes.STRING,
    allowNull: false
  },
  evjarat: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  futott_kilometer: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  szin: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sebessegvalto_tipus: {
    type: DataTypes.STRING,
    allowNull: false
  },
  kiegeszitok: {
    type: DataTypes.STRING,
    allowNull: true 
  },
  muszaki_vizsga_ervenyes: {
    type: DataTypes.DATE,
    allowNull: true 
  },
  baleseti_elozmenyek: {
    type: DataTypes.STRING,
    allowNull: true 
  },
  felhasznalo_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  adatok: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  ar: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ert_telszam: {
    type: DataTypes.STRING,
    allowNull: false
  }

}, {
  tableName: 'hirdetesek',
  timestamps: true
});

export default Hirdetesek;