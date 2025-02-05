import {Sequelize} from 'sequelize';

const sequelize = new Sequelize('cms_vizsga', 'admin', 'pwd',{
    host: 'localhost',
    dialect:'mariadb',
});

export default sequelize;