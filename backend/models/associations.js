import Hirdetesek from './Hirdetesek.js';
import Kep from './Kep.js';

Hirdetesek.hasMany(Kep, { foreignKey: 'hirdetes_id', as: 'kepek' });
Kep.belongsTo(Hirdetesek, { foreignKey: 'hirdetes_id' });

export { Hirdetesek, Kep };
