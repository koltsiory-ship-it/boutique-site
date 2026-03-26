import type { Produit, Categorie } from '../types';
import robe1 from '../assets/produit/robe/1.webp';
import robe2 from '../assets/produit/robe/2.webp';
import jumpsuit1 from '../assets/produit/jumpsuit/1.webp';
import jumpsuit2 from '../assets/produit/jumpsuit/2.avif';
import jumpsuit3 from '../assets/produit/jumpsuit/3.webp';
import jumpsuit4 from '../assets/produit/jumpsuit/4.webp';
import jumpsuit5 from '../assets/produit/jumpsuit/5.webp';

// ─── CATÉGORIES ────────────────────────────────────────────────
// Ajoute / modifie / supprime librement les catégories ici
export const CATEGORIES: Categorie[] = [
  { id: 1, nom: 'Jumpsuit',     description: 'Jumpsuit élégantes et intemporelles' },
  { id: 2, nom: 'Robes',     description: 'Robes élégantes et intemporelles' },
  { id: 3, nom: 'Pantalons', description: 'Pantalons et jupes tailleur' },
];

export const PRODUITS: Produit[] = [
  {
    id: 1,
    nom: 'Jumpsuite en soie ivoire',
    description: 'Coupe fluide, encolure en V, tombé impeccable. Parfaite pour toutes les occasions.',
    prix: 189000,
    photo: jumpsuit1,             // ← remplace par l'import de ton image
    stock: 5,
    categorie_id: 1,
    categorie_nom: 'Robes',
  },
  {
    id: 2,
    nom: 'Blouse en lin blanc',
    description: 'Lin lavé léger, manches 3/4, col rond. Un essentiel de la garde-robe.',
    prix: 89000,
    photo: jumpsuit2,
    stock: 12,
    categorie_id: 1,
    categorie_nom: 'Hauts',
  },
  {
    id: 3,
    nom: 'Pantalon tailleur crème',
    description: 'Coupe droite structurée, taille haute, tissu crêpe premium.',
    prix: 129000,
    photo: jumpsuit3,
    stock: 8,
    categorie_id: 1,
    categorie_nom: 'Pantalons',
  },

  {
    id: 4,
    nom: 'Robe en soie ivoire',
    description: 'Coupe fluide, encolure en V, tombé impeccable. Parfaite pour toutes les occasions.',
    prix: 189000,
    photo: jumpsuit4,             // ← remplace par l'import de ton image
    stock: 5,
    categorie_id: 1,
    categorie_nom: 'Robes',
  },
  {
    id: 5,
    nom: 'Blouse en lin blanc',
    description: 'Lin lavé léger, manches 3/4, col rond. Un essentiel de la garde-robe.',
    prix: 89000,
    photo: jumpsuit5,
    stock: 12,
    categorie_id: 1,
    categorie_nom: 'Hauts',
  },
  {
    id: 6,
    nom: 'Pantalon tailleur crème',
    description: 'Coupe droite structurée, taille haute, tissu crêpe premium.',
    prix: 129000,
    photo: robe1,
    stock: 8,
    categorie_id: 2,
    categorie_nom: 'Pantalons',
  },
  {
    id: 7,
    nom: 'Pantalon tailleur crème',
    description: 'Coupe droite structurée, taille haute, tissu crêpe premium.',
    prix: 129000,
    photo: robe2,
    stock: 8,
    categorie_id: 2,
    categorie_nom: 'Pantalons',
  },
  // ── Ajoute tes produits ici en copiant un bloc ci-dessus ──
];