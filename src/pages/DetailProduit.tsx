import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduit, getPhotoUrl } from '../api';
import type { Produit } from '../types';

export default function DetailProduit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [produit, setProduit] = useState<Produit | null>(null);

  useEffect(() => {
    if (id) getProduit(Number(id)).then(setProduit);
  }, [id]);

  if (!produit) return (
    <p className="text-center py-20 text-muted text-xs tracking-md uppercase">
      Chargement...
    </p>
  );

  return (
    <div className="max-w-5xl mx-auto px-12 py-16 grid grid-cols-2 gap-16 items-start">

      {/* Photo */}
      <div className="bg-noir-3 border border-bordure h-[480px] overflow-hidden">
        {produit.photo ? (
          <img
            src={getPhotoUrl(produit.photo)}
            alt={produit.nom}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-muted text-xs tracking-md uppercase">Photo à venir</span>
          </div>
        )}
      </div>

      {/* Infos */}
      <div>
        <p className="label-or mb-3">{produit.categorie_nom}</p>
        <h1 className="font-serif text-4xl font-light leading-tight mb-4">
          {produit.nom}
        </h1>
        <p className="text-or text-3xl tracking-sm mb-6">
          {produit.prix.toLocaleString()} Ar
        </p>

        <div className="border-t border-b border-bordure py-5 mb-6">
          <p className="text-muted text-sm leading-relaxed">
            {produit.description || 'Aucune description disponible.'}
          </p>
        </div>

        <p className={`text-xs tracking-sm uppercase mb-7 ${produit.stock > 0 ? 'text-or' : 'text-red-500'}`}>
          {produit.stock > 0 ? `${produit.stock} pièces disponibles` : 'Article épuisé'}
        </p>

        <div className="flex gap-3">
          <button
            className="btn-or flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={produit.stock === 0}>
            {produit.stock > 0 ? 'Ajouter au panier' : 'Épuisé'}
          </button>
          <button className="btn-outline" onClick={() => navigate(-1)}>
            Retour
          </button>
        </div>
      </div>
    </div>
  );
}