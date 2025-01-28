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
  if (!nev || !jelszo) {
    return res.status(400).json({ message: 'Felhasználónév és jelszó szükséges' });
  }
  try {
    const user = await Felhasznalok.findOne({ where: { nev } });
    if (!user) {
      return res.status(400).json({ message: 'Nincs felhasználó ezzel a felhasználónévvel' });
    }

    const isMatch = await bcrypt.compare(jelszo, user.jelszo);
    if (!isMatch) {
      return res.status(400).json({ message: 'Hibás jelszó' });
    }

    const token = jwt.sign({ id: user.id, nev: user.nev, email: user.email }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });
    res.status(200).json({ message: 'Bejelentkezés sikeres', token });
  } catch (err) {
    console.error('Bejelentkezési hiba:', err);
    res.status(500).json({ message: 'Belső szerver hiba' });
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
