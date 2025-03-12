import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Felhasznalok from '../models/Felhasznalok.js';

// Regisztráció
export const registerUser  = async (req, res) => {
  const { nev, jelszo, email, tel } = req.body;

  try {
    const userExists = await Felhasznalok.findOne({ where: { nev } });
    if (userExists) {
      return res.status(400).json({ message: 'A felhasználó ezzel a felhasználónévvel már létezik.' });
    }

    const hashedPassword = await bcrypt.hash(jelszo, 10);

    const newUser  = await Felhasznalok.create({
      nev,
      jelszo: hashedPassword,
      email,
      tel,
      tipus: 1,
    });

    res.status(201).json({ message: 'A felhasználó sikeresen regisztrálva lett!', user: newUser  });
  } catch (error) {
    console.error('Regisztrációs hiba:', error);
    res.status(500).json({ message: 'Hiba történt a regisztráció során.' });
  }
};

// Bejelentkezés
export const loginUser  = async (req, res) => {
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

    const token = jwt.sign({ id: user.id, nev: user.nev, email: user.email, tipus: user.tipus }, 'titkoskulcs123', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Bejelentkezési hiba:', error);
    res.status(500).json({ message: 'Hiba történt a bejelentkezés során.' });
  }
};

// Kilépés
export const logoutUser  = async (req, res) => {
  try {
    res.status(200).json({ message: 'Kilépés sikeres' });
  } catch (error) {
    console.error('Kilépési hiba:', error);
    res.status(500).json({ message: 'Belső szerver hiba' });
  }
};

// Felhasználó lekérdezése
export const getUser  = async (req, res) => {
  const id = req.user.id;
  try {
    const user = await Felhasznalok.findByPk(id);
    if (user) {
      res.status(200).json({
        error: false,
        message: "A felhasználó lekérdezése sikeres",
        user
      });
    } else {
      res.status(404).json({
        error: true,
        message: "Nincs ilyen felhasználó",
      });
    }
  } catch (err) {
    console.error("A felhasználó lekérdezése sikertelen", err);
    res.status(500).json({
      error: true,
      message: "A felhasználó lekérdezése során adatbázishiba történt"
    });
  }
};

// Minden átlagos felhasználó lekérdezése

export const getAllUsers = async (req, res) => {
  try {
    const users = await Felhasznalok.findAll({
      where: {
        tipus: 1 // Csak a nem admin felhasználók lekérése
      }
    });
    res.status(200).json({
      error: false,
      message: "Felhasználók lekérdezése sikeres",
      users
    });
  } catch (error) {
    console.error("Hiba történt a felhasználók lekérdezésekor:", error);
    res.status(500).json({
      error: true,
      message: "Hiba történt a felhasználók lekérdezése során."
    });
  }
};

// Moderátorok lekérdezése

export const getModerators = async (req, res) => {
  try {
    const users = await Felhasznalok.findAll({
      where: {
        tipus: 2
      }
    });
    res.status(200).json({
      error: false,
      message: "Felhasználók lekérdezése sikeres",
      users
    });
  } catch (error) {
    console.error("Hiba történt a felhasználók lekérdezésekor:", error);
    res.status(500).json({
      error: true,
      message: "Hiba történt a felhasználók lekérdezése során."
    });
  }
};


// Felhasználói adatok módosítása
export const updateUserData = async (req, res) => {
  const id = req.user.id; // A felhasználó azonosítója a JWT-ből
  const { nev, email , tel } = req.body; // Felhasználói adatok

  try {
    const user = await Felhasznalok.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Nincs ilyen felhasználó.' });
    }

    // Felhasználói adatok frissítése
    if (nev) user.nev = nev;
    if (email) user.email = email;
    if (tel) user.tel = tel;

    await user.save(); // Változások mentése

    res.status(200).json({ message: 'A felhasználói adatok sikeresen frissítve lettek!', user });
  } catch (error) {
    console.error('Felhasználói adatok módosítása hiba:', error);
    res.status(500).json({ message: 'Hiba történt a felhasználói adatok módosítása során.' });
  }
};

// Admin által felhasználó adatainak módosítása

export const adminUpdateUserData = async (req, res) => {
  if (req.user.tipus !== 0) {
    return res.status(403).json({ message: 'Nincs jogosultságod a felhasználó törléséhez.' });
  }

  const { nev, email , tel, jelszo, id } = req.body; // Felhasználói adatok

  try {
    const user = await Felhasznalok.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Nincs ilyen felhasználó.' });
    }

    // Felhasználói adatok frissítése
    if (nev) user.nev = nev;
    if (email) user.email = email;
    if (tel) user.tel = tel;
    if (jelszo) user.jelszo = await bcrypt.hash(jelszo, 10);


    await user.save(); // Változások mentése

    res.status(200).json({ message: 'A felhasználói adatok sikeresen frissítve lettek!', user });
  } catch (error) {
    console.error('Felhasználói adatok módosítása hiba:', error);
    res.status(500).json({ message: 'Hiba történt a felhasználói adatok módosítása során.' });
  }
};

// Jelszó módosítása
export const updatePassword = async (req, res) => {
  const id = req.user.id; // A felhasználó azonosítója a JWT-ből
  const { jelszo, ujJelszo, ujJelszoMegint } = req.body; // Jelszó mezők

  try {
    const user = await Felhasznalok.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Nincs ilyen felhasználó.' });
    }

    // Jelenlegi jelszó ellenőrzése
    const isPasswordValid = await bcrypt.compare(jelszo, user.jelszo);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Helytelen előző jelszó.' });
    }

    // Új jelszavak ellenőrzése
    if (ujJelszo && ujJelszo !== ujJelszoMegint) {
      return res.status(400).json({ message: 'Az új jelszavak nem egyeznek.' });
    }

    // Jelszó frissítése
    user.jelszo = await bcrypt.hash(ujJelszo, 10); // Új jelszó hash-elése
    await user.save(); // Változások mentése

    res.status(200).json({ message: 'A jelszó sikeresen frissítve lett!' });
  } catch (error) {
    console.error('Jelszó módosítása hiba:', error);
    res.status(500).json({ message: 'Hiba történt a jelszó módosítása során.' });
  }
};

// Felhasználó törlése
export const deleteUser  = async (req, res) => {
  const id = req.user.id; // A felhasználó azonosítója a JWT-ből
  const { jelszo, jelszoMegint } = req.body; // Jelszó és megerősítés

  try {
    const user = await Felhasznalok.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Nincs ilyen felhasználó.' });
    }

    // Jelszó ellenőrzése
    const isPasswordValid = await bcrypt.compare(jelszo, user.jelszo);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Helytelen jelszó.' });
    }

    // Megerősítés ellenőrzése
    if (jelszo !== jelszoMegint) {
      return res.status(400).json({ message: 'A jelszavak nem egyeznek.' });
    }

    await Felhasznalok.destroy({ where: { id } }); // Felhasználó törlése

    res.status(200).json({ message: 'A felhasználó sikeresen törölve lett.' });
  } catch (error) {
    console.error('Felhasználó törlése hiba:', error);
    res.status(500).json({ message: 'Hiba történt a felhasználó törlése során.' });
  }
};

// Admin felhasználó törlése
export const adminDeleteUser  = async (req, res) => {
  const { id } = req.params; // A törlendő felhasználó azonosítója

  try {
    // Ellenőrizzük, hogy a kérés indítója admin-e
    if (req.user.tipus !== 0) {
      return res.status(403).json({ message: 'Nincs jogosultságod a felhasználó törléséhez.' });
    }

    const user = await Felhasznalok.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Nincs ilyen felhasználó.' });
    }

    await Felhasznalok.destroy({ where: { id } }); // Felhasználó törlése

    res.status(200).json({ message: 'A felhasználó sikeresen törölve lett.' });
  } catch (error) {
    console.error('Felhasználó törlése hiba:', error);
    res.status(500).json({ message: 'Hiba történt a felhasználó törlése során.' });
  }
};

export const moderatorPromote = async (req, res) => {
  const { id } = req.params; // A felhasználó azonosítója

  try {
    // Ellenőrizzük, hogy a kérés indítója admin-e
    if (req.user.tipus !== 0) {
      return res.status(403).json({ message: 'Nincs jogosultságod a felhasználó típusának módosításához.' });
    }

    const user = await Felhasznalok.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Nincs ilyen felhasználó.' });
    }

    // Felhasználó típusának módosítása 2-re
    user.tipus = 2;
    await user.save(); // Mentjük a módosított felhasználót

    res.status(200).json({ message: 'A felhasználó típusa sikeresen módosítva lett.' });
  } catch (error) {
    console.error('Felhasználó típusa módosítása hiba:', error);
    res.status(500).json({ message: 'Hiba történt a felhasználó típusa módosítása során.' });
  }
};

export const moderatorDemote = async (req, res) => {
  const { id } = req.params; // A felhasználó azonosítója

  try {
    // Ellenőrizzük, hogy a kérés indítója admin-e
    if (req.user.tipus !== 0) {
      return res.status(403).json({ message: 'Nincs jogosultságod a felhasználó típusának módosításához.' });
    }

    const user = await Felhasznalok.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Nincs ilyen felhasználó.' });
    }

    // Felhasználó típusának módosítása 1-re
    user.tipus = 1;
    await user.save(); // Mentjük a módosított felhasználót

    res.status(200).json({ message: 'A felhasználó típusa sikeresen módosítva lett.' });
  } catch (error) {
    console.error('Felhasználó típusa módosítása hiba:', error);
    res.status(500).json({ message: 'Hiba történt a felhasználó típusa módosítása során.' });
  }
};
