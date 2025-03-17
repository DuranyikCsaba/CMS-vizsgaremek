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
  futott_kilometer: number; 
  szin: string; 
  sebessegvalto_tipus: string;
  kiegeszitok: string; 
  muszaki_vizsga_ervenyes: Date | null; 
  baleseti_elozmenyek: string; 
  ar: number;
  createdAt: Date;
  ert_telszam: number;
  kepek: Kep[];
  felhasznalo_id: number;
  tipus: number;
}