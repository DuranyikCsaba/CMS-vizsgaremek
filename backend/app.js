import express from 'express';
import dotenv from 'dotenv';
import db  from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import hirdetesekRoutes from './routes/hirdetesekRoutes.js';
import cors from 'cors';
import Felhasznalok from './models/Felhasznalok.js';
import Hirdetesek from './models/Hirdetesek.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use('/api/auth', authRoutes);
app.use('/api/hirdetesek', hirdetesekRoutes);
app.use("/hirdetesek", hirdetesekRoutes);

db.authenticate()
.then(()=>{
    console.log('Az adatbázis kapcsolat sikeresen létrejött')

    db.modelManager.addModel(Felhasznalok, Hirdetesek);
    
    db.sync({ force : true})
    .then(() => {
        console.log("A modellek szinronizációja sikeres!")
        app.listen(PORT, () => {
            console.log(`A szerver elindult a http://localhost:${PORT} URL-en! `);
        })
    })
    .catch((error) => {
        console.error("Hiba a szinkronizáció során");
        console.error(error);
    })
})
.catch((error)=>{
    console.error ('Az adatbázis kapcsolat nem tudott létre jönni ', error)
});

