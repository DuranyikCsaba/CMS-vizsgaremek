import KommentModel from "../models/Komment.js";
import PosztModel from "../models/Poszt.js";

export default {
    KommentPost: async (req, res) => {
        const { posztId, kommentTartalom } = req.body;
    
        if (!kommentTartalom) {
            return res.status(400).json({
                error: true,
                message: "A komment tartalma üres"
            });
        }
    
        const poszt = await PosztModel.findByPk(posztId);
        if (!poszt) {
            return res.status(404).json({
                error: true,
                message: "A megadott poszt nem található!"
            });
        }
    
        const ujKomment = KommentModel.build({
            posztId,
            felhasznaloId: req.user.id,
            felhasznaloNeve: req.user.nev,
            kommentTartalom
        });
    
        try {
            await ujKomment.save();
            res.status(201).json({
                error: false,
                message: "A komment létrehozása sikeres!",
                data: ujKomment
            });
        } catch (err) {
            console.error("Hiba történt a komment létrehozásakor:", err);
            return res.status(500).json({
                error: true,
                message: "A komment létrehozása sikertelen! Adatbázis hiba!"
            });
        }
    },

    KommentGet: async (req, res) => {
        const { posztId } = req.params;

        try {
            const kommentek = await KommentModel.findAll({ where: { posztId } });

            res.status(200).json({
                error: false,
                message: "A kommentek sikeresen lekérve!",
                data: kommentek
            });
        } catch (error) {
            console.error("Hiba történt a kommentek lekérésekor:", error);
            return res.status(500).json({
                error: true,
                message: "Adatbázishiba a kommentek lekérésekor!"
            });
        }
    },

    KommentIdDelete: async (req, res) => {
        const { id } = req.params;

        try {
            const kommentById = await KommentModel.findByPk(id);

            if (!kommentById) {
                return res.status(404).json({
                    error: true,
                    message: "A megadott id-vel nem található komment!"
                });
            }

            if (req.user.id !== kommentById.felhasznaloId && req.user.tipus !== 0 && req.user.tipus !== 2) {
                return res.status(403).json({
                    error: true,
                    message: "Nincs jogosultságod a komment törléséhez!"
                });
            }

            await kommentById.destroy();

            res.status(200).json({
                error: false,
                message: `A ${id} komment sikeresen törölve!`,
                data: kommentById
            });
        } catch (error) {
            console.error("Hiba történt a komment törlésekor:", error);
            return res.status(500).json({
                error: true,
                message: "Adatbázishiba a komment törlésekor!"
            });
        }
    },

    KommentIdPatch: async (req, res) => {
        const { id } = req.params;
        const { kommentTartalom } = req.body;

        if (!kommentTartalom) {
            return res.status(400).json({
                error: true,
                message: "A tartalom nem lehet üres"
            });
        }

        try {
            const kommentById = await KommentModel.findByPk(id);

            if (!kommentById) {
                return res.status(404).json({
                    error: true,
                    message: "Nem található komment ilyen id-val"
                });
            }

            if (req.user.id !== kommentById.felhasznaloId) {
                return res.status(403).json({
                    error: true,
                    message: "Nincs jogosultságod a komment módosításához!"
                });
            }

            kommentById.kommentTartalom = kommentTartalom;
            await kommentById.save();

            res.status(200).json({
                error: false,
                message: `A ${id}- idval rendelkező komment módosítása sikeres`,
                data: kommentById
            });
        } catch (error) {
            console.error("Hiba történt a komment módosításakor:", error);
            return res.status(500).json({
                error: true,
                message: "Adatbázishiba a komment módosításakor!"
            });
        }
    }
};