export interface Categorie {
  id: number;
  nom: string;
  description: string;
}

export interface Produit {
  id: number;
  nom: string;
  description: string;
  prix: number;
  photo: string | null;
  stock: number;
  categorie_id: number;
  categorie_nom: string;
}