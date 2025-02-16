import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Felhasznalok from '../models/Felhasznalok.js';

// Regisztráció
export const registerUser = async (req, res) => {
  const { nev, jelszo, email, tel } = req.body;

  try {
    const userExists = await Felhasznalok.findOne({ where: { nev } });
    if (userExists) {
      return res.status(400).json({ message: 'A felhasználó ezzel a felhasználónévvel már létezik.' });
    }

    const hashedPassword = await bcrypt.hash(jelszo, 10);

    const newUser = await Felhasznalok.create({
      nev,
      jelszo: hashedPassword,
      email,
      tel,
      tipus: 1,
    });

    res.status(201).json({ message: 'A felhasználó sikeresen regisztrálva lett!', user: newUser });
  } catch (error) {
    console.error('Regisztrációs hiba:', error);
    res.status(500).json({ message: 'Hiba történt a regisztráció során.' });
  }
};

// Bejelentkezés
export const loginUser = async (req, res) => {
  const { nev, jelszo } = req.body;

  try {
    const user = await Felhasznalok.findOne({ where: { nev } });
    if (!user) {
      return res.status(400).json({ message: 'Helytelen felhasználónév vagy jelszó.' });
    }

    const isPasswordValid = await bcrypt.compare(jelszo, user.jelszo);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Helytelen felhasználónév vagy jelszó.' });
    }

    const token = jwt.sign({ id: user.id, nev: user.nev, email: user.email }, 'titkoskulcs123', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Bejelentkezési hiba:', error);
    res.status(500).json({ message: 'Hiba történt a bejelentkezés során.' });
  }
};

// Kilépés
export const logoutUser = async (req, res) => {
  try {
    res.status(200).json({ message: 'Kilépés sikeres' });
  } catch (error) {
    console.error('Kilépési hiba:', error);
    res.status(500).json({ message: 'Belső szerver hiba' });
  }
};

// Felhasználó lekérdezése

export const getUser = async (req, res) => {
  const id = req.user.id;
  Felhasznalok.findByPk(id)
  .then((user) => {
    if (user) {
      res.status(200).json({
        error: false,
        message: "A felhasználó lekérdezése sikeres",
        user
      })
    } else {
      res.status(404).json({
        error: true,
        message: "Nincs ilyen felhasználó",
      })
    }
  })
  .catch((err) => {
    console.error("A felhasználó lekérdezése sikertelen")
    console.error(err)
    res.status(500).json({
      error: true,
      message: "A felhasználó lekérdezése során adatbázishiba történt"
    })
  })
};
