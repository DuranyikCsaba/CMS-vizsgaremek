import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import db from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import hirdetesekRoutes from './routes/hirdetesekRoutes.js';
import posztRoutes from './routes/posztRoutes.js';
import kommentRoutes from './routes/kommentRoutes.js';
import cors from 'cors';
import Felhasznalok from './models/Felhasznalok.js';
import Poszt from './models/Poszt.js';
import { Hirdetesek, Kep } from './models/associations.js';
import { fileURLToPath } from 'url';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use('/api/auth', authRoutes);
app.use("/hirdetesek", hirdetesekRoutes);
app.use("/api/poszt", posztRoutes);
app.use("/api/komment", kommentRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

db.authenticate()
    .then(() => {
        console.log('Az adatbázis kapcsolat sikeresen létrejött');

        return db.sync({ alter: true })
            .then(() => {
                console.log("A modellek szinkronizációja sikeres!");
                app.listen(PORT, () => {
                    console.log(`A szerver elindult a http://localhost:${PORT} URL-en!`);
                });
            })
            .catch((error) => {
                console.error("Hiba a szinkronizáció során");
                console.error(error);
            });
    })
    .catch((error) => {
        console.error('Az adatbázis kapcsolat nem tudott létrejönni: ', error);
    });