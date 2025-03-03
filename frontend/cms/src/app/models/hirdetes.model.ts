export interface Kep {
  file_path: string;
}

export interface Hirdetes {
  id: number;
  marka: string;
  modell: string;
  adatok: string;
  ajtok_szama: number;
  hengerurtartalom: number;
  uzemanyag: string;
  evjarat: number;
  futott_kilometer: number; // Ékezet nélküli mező
  szin: string; // Ékezet nélküli mező
  sebessegvalto_tipus: string; // Ékezet nélküli mező
  kiegeszitok: string; // Ékezet nélküli mező
  muszaki_vizsga_ervenyes: Date | null; // Ékezet nélküli mező
  baleseti_elozmenyek: string; // Ékezet nélküli mező
  kepek: Kep[];
}