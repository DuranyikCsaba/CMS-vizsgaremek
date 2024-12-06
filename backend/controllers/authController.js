import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Felhasznalok from '../models/Felhasznalok.js';

// Regisztráció
export const registerUser = async (req, res) => {
  const { nev, jelszo, email, tel } = req.body;

  try {
    const userExists = await Felhasznalok.findOne({ where: { nev } });
    if (userExists) {
      return res.status(400).json({ message: 'User with this username already exists.' });
    }

    const hashedPassword = await bcrypt.hash(jelszo, 10);

    const newUser = await Felhasznalok.create({
      nev,
      jelszo: hashedPassword,
      email,
      tel,
      tipus: 1,
    });

    res.status(201).json({ message: 'User registered successfully!', user: newUser });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Something went wrong during registration.' });
  }
};

// Bejelentkezés
export const loginUser = async (req, res) => {
  const { nev, jelszo } = req.body;
  if (!nev || !jelszo) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  try {
    const user = await Felhasznalok.findOne({ where: { nev } });
    if (!user) {
      return res.status(400).json({ message: 'No user found with this username' });
    }

    const isMatch = await bcrypt.compare(jelszo, user.jelszo);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign({ id: user.id, nev: user.nev, email: user.email }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Kilépés
export const logoutUser = async (req, res) => {
  try {
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
