import{Hirdetesek} from "../models/Hirdetesek.js";

const HirdetesekController = {
    getAll: async (req, res) => {
      try {
        const hirdetesek = await Hirdetesek.findAll();
        res.status(200).json(hirdetesek);
      } catch (error) {
        res.status(500).json({ error: 'Hiba a hirdetések lekérdezése során.' });
      }
    },   
  
    getById: async (req, res) => {
      const { id } = req.params;
      try {
        const hirdetes = await Hirdetesek.findByPk(id);
        if (!hirdetes) {
          return res.status(404).json({ error: 'A hirdetés nem található.' });
        }
        res.status(200).json(hirdetes);
      } catch (error) {
        res.status(500).json({ error: 'Hiba a hirdetés lekérdezése során.' });
      }
    },
  
    create: async (req, res) => {
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
        res.status(201).json(newHirdetes);
      } catch (error) {
        res.status(500).json({ error: 'Hiba a hirdetés létrehozása során.' });
      }
    },
  
    update: async (req, res) => {
      const { id } = req.params;
      const updates = req.body;
      try {
        const hirdetes = await Hirdetesek.findByPk(id);
        if (!hirdetes) {
          return res.status(404).json({ error: 'A hirdetés nem található.' });
        }
        await hirdetes.update(updates);
        res.status(200).json(hirdetes);
      } catch (error) {
        res.status(500).json({ error: 'Hiba a hirdetés frissítése során.' });
      }
    },
  
    delete: async (req, res) => {
      const { id } = req.params;
      try {
        const hirdetes = await Hirdetesek.findByPk(id);
        if (!hirdetes) {
          return res.status(404).json({ error: 'A hirdetés nem található.' });
        }
        await hirdetes.destroy();
        res.status(204).send();
      } catch (error) {
        res.status(500).json({ error: 'Hiba a hirdetés törlése során.' });
      }
    },
  };
  
  export default HirdetesekController;