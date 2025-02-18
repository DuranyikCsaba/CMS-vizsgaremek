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
    kepek: Kep[];
  }