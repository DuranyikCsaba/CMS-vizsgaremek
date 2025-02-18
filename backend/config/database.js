import {Sequelize} from 'sequelize';

const sequelize = new Sequelize('cms_vizsga', 'admin', 'pwd',{
    host: 'localhost',
    dialect:'mariadb',
    logging: console.log,
});

export default sequelize;