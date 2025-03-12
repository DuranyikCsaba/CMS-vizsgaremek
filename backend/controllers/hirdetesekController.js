import Hirdetesek from '../models/Hirdetesek.js';
import multer from 'multer';
import Kep from '../models/Kep.js';
import fs from 'fs'

const upload = multer({ dest: 'uploads/' });

export const getAllHirdetesek = async (req, res) => {
  
  try {
    const hirdetesek = await Hirdetesek.findAll({
      include: [{ model: Kep, as: 'kepek' }]
    });

    const baseUrl = "http://localhost:5000/";

    const modifiedHirdetesek = hirdetesek.map(hirdetes => ({
      ...hirdetes.toJSON(),
      kepek: hirdetes.kepek.map(kep => ({
        ...kep.toJSON(),
        file_path: baseUrl + kep.file_path
      }))
    }));

    res.status(200).json({ hirdetesek: modifiedHirdetesek });
  } catch (error) {
    console.error('Hiba a hirdetések lekérése során:', error);
    res.status(500).json({ message: 'Hiba a hirdetések lekérése során.' });
  }
};

export const getHirdetesById = async (req, res) => {
  const { id } = req.params;
  try {
    const hirdetes = await Hirdetesek.findByPk(id, {
      include: [{ model: Kep, as: 'kepek' }]
    });

    if (!hirdetes) {
      return res.status(404).json({ message: 'A hirdetés nem található.' });
    }

    const baseUrl = "http://localhost:5000/";
    hirdetes.kepek = hirdetes.kepek.map(kep => ({
      ...kep.toJSON(),
      file_path: baseUrl + kep.file_path
    }));

    res.status(200).json(hirdetes);
  } catch (error) {
    console.error('Hiba a hirdetés lekérdezése során:', error);
    res.status(500).json({ message: 'Hiba a hirdetés lekérdezése során.' });
  }
};

export const createHirdetes = async (req, res) => {
  try {
    const { adatok, modell, marka, ajtok_szama, hengerurtartalom, uzemanyag, evjarat, futott_kilometer, szin, sebessegvalto_tipus, kiegeszitok, muszaki_vizsga_ervenyes, baleseti_elozmenyek, ar, ert_telszam} = req.body;
    const felhasznalo_id = req.user.id;

    const kepek = req.files;

    if (!modell || !marka || !ajtok_szama || !hengerurtartalom || !uzemanyag || !evjarat || !felhasznalo_id || !ar || !ert_telszam) {
      return res.status(400).json({
        error: true,
        message: "Minden kötelező mezőt ki kell tölteni!",
      });
    }

    const newHirdetes = await Hirdetesek.create({
      adatok,
      modell,
      marka,
      ajtok_szama,
      hengerurtartalom,
      uzemanyag,
      evjarat,
      futott_kilometer,
      szin,
      sebessegvalto_tipus,
      kiegeszitok,
      muszaki_vizsga_ervenyes,
      baleseti_elozmenyek,
      felhasznalo_id,
      ar,
      ert_telszam
    });

    if (kepek && kepek.length > 0) {
      const kepAdatok = kepek.map(file => ({
        hirdetes_id: newHirdetes.id,
        file_path: file.path
      }));
      await Kep.bulkCreate(kepAdatok);
    }

    res.status(201).json({
      message: 'A hirdetés sikeresen létrejött!',
      hirdetes: newHirdetes
    });
  } catch (error) {
    console.error('Hiba a hirdetés létrehozásakor:', error);
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
    const updatedData = {
      ...req.body,
      model : req.body.modell ||hirdetes.modell,
      marka : req.body.marka ||hirdetes.marka,
      ajtok_szama : req.body.ajtok_szama ||hirdetes.ajtok_szama,
      hengerurtartalom : req.body.hengerurtartalom ||hirdetes.hengerurtartalom,
      uzemanyag : req.body.uzemanyag ||hirdetes.uzemanyag,
      evjarat : req.body.evjarat ||hirdetes.evjarat,
      futott_kilometer: req.body.futott_kilometer || hirdetes.futott_kilometer,
      szin: req.body.szin || hirdetes.szin,
      sebessegvalto_tipus: req.body.sebessegvalto_tipus || hirdetes.sebessegvalto_tipus,
      kiegeszitok: req.body.kiegeszitok || hirdetes.kiegeszitok,
      muszaki_vizsga_ervenyes: req.body.muszaki_vizsga_ervenyes || hirdetes.muszaki_vizsga_ervenyes,
      baleseti_elozmenyek: req.body.baleseti_előzmények || hirdetes.baleseti_elozmenyek,
      ert_telszam: req.body.ert_telszam ||hirdetes.ert_telszam
    };
    await hirdetes.update(updatedData);
    res.status(200).json({ message: 'Hirdetés frissítve', hirdetes });
  } catch (error) {
    console.error('Hiba a hirdetés frissítésekor:', error);
    res.status(500).json({ message: 'Hiba a hirdetés frissítése során.' });
  }
};

export const deleteHirdetes = async (req, res) => {
  const { id } = req.params;
  try {
    const hirdetes = await Hirdetesek.findByPk(id, {
      include: [{ model: Kep, as: 'kepek' }]
    });

    if (!hirdetes) {
      return res.status(404).json({ message: 'A hirdetés nem található.' });
    }

    if (req.user.tipus === 0 || hirdetes.felhasznalo_id === req.user.id || req.user.tipus === 2) {
      const imagePaths = hirdetes.kepek.map(kep => kep.file_path);
      for (const path of imagePaths) {
        fs.unlink(path, (err) => {
          if (err) {
            console.error(`Hiba a kép törlésekor: ${path}`, err);
          }
        });
      }

      await hirdetes.destroy();
      return res.status(200).json({ message: 'Hirdetés törölve' });
    } else {
      return res.status(403).json({ error: true, message: "Nincs jogosultságod a törléshez." });
    }
  } catch (error) {
    console.error('Hiba a hirdetés törlése során:', error);
    res.status(500).json({ message: 'Hiba a hirdetés törlése során.' });
  }
};