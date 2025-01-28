import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Hirdetesek from '../models/Hirdetesek.js';

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
  try {
    const newHirdetes = await Hirdetesek.create({
      felhasznalo_id: req.user.id,
      megtekintesek: req.body.megtekintesek,
      torles: req.body.torles,
      adatok: req.body.adatok,
      modell: req.body.modell,
      marka: req.body.marka,
      ajtok_szama: req.body.ajtok_szama,
      hengerurtartalom: req.body.hengerurtartalom,
      uzemanyag: req.body.uzemanyag,
      evjarat: req.body.evjarat,
      kep1: req.body.kep1,
      kep2: req.body.kep2,
      kep3: req.body.kep3,
      kep4: req.body.kep4,
      kep5: req.body.kep5,
      kep6: req.body.kep6,
      kep7: req.body.kep7,
      kep8: req.body.kep8,
      kep9: req.body.kep9,
      kep10: req.body.kep10,
    });
    res.status(201).json({
      message: 'A hirdetés sikeresen létrejött!',
      hirdetes: newHirdetes,
    });
  } catch (error) {
    console.error('Error creating advertisement:', error);
    res.status(500).json({ message: 'Hiba a hirdetés létrehozása során.' });
  }
};

export const updateHirdetes = async (req, res) => {
  const { id } = req.params;
  try {
    const hirdetes = await Hirdetesek.findByPk(id);
    if (!hirdetes) {
      return res.status(404).json({ message: 'A hirdetés nem található.' });
    }
    await hirdetes.update(req.body);
    res.status(200).json({ message: 'Hirdetés frissítve', hirdetes });
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
    res.status(200).json({ message: 'Hirdetés törölve' });
  } catch (error) {
    console.error('Error deleting advertisement:', error);
    res.status(500).json({ message: 'Hiba a hirdetés törlése során.' });
  }
};