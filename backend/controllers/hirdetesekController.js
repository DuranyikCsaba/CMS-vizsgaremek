import Hirdetesek from '../models/Hirdetesek.js';
import multer from 'multer'
import Kep from '../models/Kep.js';

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
    const { adatok, modell, marka, ajtok_szama, hengerurtartalom, uzemanyag, evjarat } = req.body;
    const felhasznalo_id = req.user.id;

    const kepek = req.files;

    if (!modell || !marka || !ajtok_szama || !hengerurtartalom || !uzemanyag || !evjarat || !felhasznalo_id) {
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
      felhasznalo_id
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
    await hirdetes.update(req.body);
    res.status(200).json({ message: 'Hirdetés frissítve', hirdetes });
  } catch (error) {
    console.error('Hiba a hirdetés frisítésekor:', error);
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
    if (hirdetes.felhasznalo_id !== req.user.id) {
      return res.status(403).json({ error: true, message: "Nincs jogosultságod a módosításhoz." });
    }    
    await hirdetes.destroy();
    res.status(200).json({ message: 'Hirdetés törölve' });
  } catch (error) {
    console.error('Hiba a hirdetés törlése során:', error);
    res.status(500).json({ message: 'Hiba a hirdetés törlése során.' });
  }
};