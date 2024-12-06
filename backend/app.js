import express from 'express';
import dotenv from 'dotenv';
import sequelize  from './config/database.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);

sequelize.authenticate()
.then(()=>{
    console.log('Az adatbázis kapcsolat sikeresen létrejött')
})
.catch((error)=>{
    console.error ('Az adatbázis kapcsolat nem tudott létre jönni ', error)
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log('A szerver elindult a(z) http://localhost/${PORT} -URL-en  ')
})

