export interface Post {
  id: number;
  felhasznaloId: number;
  felhasznaloNeve: string;
  tartalom: string;
  letrehozas: Date;
  modositas: Date;
  kommentek?: Komment[];
}

export interface Komment {
  id: number;
  posztId: number;
  felhasznaloId: number;
  felhasznaloNeve: string;
  kommentTartalom: string;
  letrehozas: Date;
  modositas: Date;
}