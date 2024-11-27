import {Sequelize} from 'sequelize';

const sequelize = Sequelize('cms_vizsga', 'admin', 'pwd',{
    host: 'localhost',
    dialect:'mysql',
});

export default sequelize;