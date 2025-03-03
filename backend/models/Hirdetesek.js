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
    allowNull: false // pl. 'automata' vagy 'manuális'
  },
  kiegészítők: {
    type: DataTypes.STRING,
    allowNull: true // pl. 'légkondicionáló, navigáció'
  },
  muszaki_vizsga_ervenyes: {
    type: DataTypes.DATE,
    allowNull: true // a műszaki vizsga érvényességi dátuma
  },
  baleseti_előzmények: {
    type: DataTypes.STRING,
    allowNull: true // pl. 'soha nem volt balesete'
  },
  felhasznalo_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  adatok: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'hirdetesek',
  timestamps: true
});

export default Hirdetesek;