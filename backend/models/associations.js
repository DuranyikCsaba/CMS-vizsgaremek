import Hirdetesek from './Hirdetesek.js';
import Kep from './Kep.js';
import Komment from './Komment.js';
import Poszt from './Poszt.js';

Hirdetesek.hasMany(Kep, { foreignKey: 'hirdetes_id', as: 'kepek' });
Kep.belongsTo(Hirdetesek, { foreignKey: 'hirdetes_id' });


Poszt.hasMany(Komment, { foreignKey: 'posztId', as: 'kommentek' });
Komment.belongsTo(Poszt, { foreignKey: 'posztId' });

export { Hirdetesek, Kep, Komment, Poszt };
