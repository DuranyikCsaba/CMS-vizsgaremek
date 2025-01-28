import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Hirdetesek } from '../models/Hirdetesek.js';

export const getAllHirdetesek = async (req, res) => {
  try {
    const hirdetesek = await Hirdetesek.findAll();
    res.status(200).json(hirdetesek);
  } catch (error) {
    console.error('Error fetching advertisements:', error);
    res.status(500).json({ message: 'Hiba a hirdetések lekérdezése során.' });
  }
};

export const getHirdetesById = async (req, res) => {
  const { id } = req.params;
  try {
    const hirdetes = await Hirdetesek.findByPk(id);
    if (!hirdetes) {
      return res.status(404).json({ message: 'A hirdetés nem található.' });
    }
    res.status(200).json(hirdetes);
  } catch (error) {
    console.error('Error fetching advertisement:', error);
    res.status(500).json({ message: 'Hiba a hirdetés lekérdezése során.' });
  }
};

export const createHirdetes = async (req, res) => {
  const { modell, marka, ajtok_szama, hengerurtartalom, uzemanyag, evjarat_tol, evjarat_ig, felhasznalo_id, adatok } = req.body;

  try {
    const newHirdetes = await Hirdetesek.create({
      modell,
      marka,
      ajtok_szama,
      hengerurtartalom,
      uzemanyag,
      evjarat_tol,
      evjarat_ig,
      felhasznalo_id,
      adatok,
    });

    res.status(201).json({ message: 'A hirdetés sikeresen létrejött!', hirdetes: newHirdetes });
  } catch (error) {
    console.error('Error creating advertisement:', error);
    res.status(500).json({ message: 'Hiba a hirdetés létrehozása során.' });
  }
};

export const updateHirdetes = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const hirdetes = await Hirdetesek.findByPk(id);
    if (!hirdetes) {
      return res.status(404).json({ message: 'A hirdetés nem található.' });
    }

    await hirdetes.update(updates);
    res.status(200).json({ message: 'A hirdetés sikeresen frissítve!', hirdetes });
  } catch (error) {
    console.error('Error updating advertisement:', error);
    res.status(500).json({ message: 'Hiba a hirdetés frissítése során.' });
  }
};

export const deleteHirdetes = async (req, res) => {
  const { id } = req.params;

  try {
    const hirdetes = await Hirdetesek.findByPk(id);
    if (!hirdetes) {
      return res.status(404).json({ message: 'A hirdetés nem található.' });
    }

    await hirdetes.destroy();
    res.status(200).json({ message: 'A hirdetés sikeresen törölve!' });
  } catch (error) {
    console.error('Error deleting advertisement:', error);
    res.status(500).json({ message: 'Hiba a hirdetés törlése során.' });
  }
};
