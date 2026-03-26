import { PRODUITS, CATEGORIES } from '../data/catalogue';
import type { Produit, Categorie } from '../types';

// Simule un petit délai (optionnel — retire si tu veux instantané)
const fakeDelay = <T>(data: T): Promise<T> =>
  Promise.resolve(data);

// ─── Produits ──────────────────────────────────────────────────
export const getProduits = (params?: {
  categorie_id?: number;
  search?: string;
}): Promise<Produit[]> => {
  let result = [...PRODUITS];

  if (params?.categorie_id) {
    result = result.filter(p => p.categorie_id === params.categorie_id);
  }

  if (params?.search) {
    const q = params.search.toLowerCase();
    result = result.filter(
      p =>
        p.nom.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  return fakeDelay(result);
};

export const getProduit = (id: number): Promise<Produit> => {
  const produit = PRODUITS.find(p => p.id === id);
  if (!produit) return Promise.reject(new Error(`Produit ${id} introuvable`));
  return fakeDelay(produit);
};

// ─── Catégories ────────────────────────────────────────────────
export const getCategories = (): Promise<Categorie[]> =>
  fakeDelay([...CATEGORIES]);

// ─── Photo ─────────────────────────────────────────────────────
export const getPhotoUrl = (photo: string | null): string =>
  photo ?? '/placeholder.jpg';