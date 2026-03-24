import { useEffect, useState } from 'react';
import { getProduits, getCategories } from '../api';
import type { Produit, Categorie } from '../types';
import ProductCard from '../components/ProductCard';

export default function Catalogue() {
  const [produits, setProduits]     = useState<Produit[]>([]);
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [catActive, setCatActive]   = useState<number | null>(null);
  const [search, setSearch]         = useState('');

  useEffect(() => { getCategories().then(setCategories); }, []);

  useEffect(() => {
    getProduits({ categorie_id: catActive ?? undefined, search: search || undefined })
      .then(setProduits);
  }, [catActive, search]);

  return (
    <div className="px-12 py-16">
      <p className="label-or text-center mb-2">Notre sélection</p>
      <h1 className="font-serif text-5xl text-center font-light mb-12">La collection</h1>

      {/* Filtres */}
      <div className="flex justify-center gap-3 mb-6 flex-wrap">
        <button
          className={catActive === null ? 'btn-or' : 'btn-outline'}
          onClick={() => setCatActive(null)}>
          Tout
        </button>
        {categories.map(c => (
          <button
            key={c.id}
            className={catActive === c.id ? 'btn-or' : 'btn-outline'}
            onClick={() => setCatActive(c.id)}>
            {c.nom}
          </button>
        ))}
      </div>

      {/* Recherche */}
      <div className="flex justify-center mb-12">
        <input
          type="text"
          placeholder="Rechercher un article..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="bg-noir-2 border border-bordure text-creme placeholder-muted px-5 py-3 w-80 text-xs tracking-sm outline-none focus:border-or transition-colors duration-200"
        />
      </div>

      {/* Grille */}
      {produits.length === 0 ? (
        <p className="text-center text-muted text-xs tracking-md uppercase">Aucun produit trouvé.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {produits.map(p => <ProductCard key={p.id} produit={p} />)}
        </div>
      )}
    </div>
  );
}