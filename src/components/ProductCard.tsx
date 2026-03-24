import { useNavigate } from 'react-router-dom';
import type { Produit } from '../types';
import { getPhotoUrl } from '../api';

interface Props { produit: Produit; }

export default function ProductCard({ produit }: Props) {
  const navigate = useNavigate();

  return (
    <div
      className="card-produit group"
      onClick={() => navigate(`/produit/${produit.id}`)}
    >
      {/* Photo */}
      <div className="h-80 overflow-hidden bg-fond-2">
        {produit.photo ? (
          <img
            src={getPhotoUrl(produit.photo)}
            alt={produit.nom}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-muted text-xs tracking-widest uppercase">
              Photo à venir
            </span>
          </div>
        )}
      </div>

      {/* Infos */}
      <div className="px-5 py-5 border-t border-bordure">
        <p className="label-or mb-1">{produit.categorie_nom}</p>
        <h3 className="font-cormorant text-xl font-light text-noir mb-4 leading-snug">
          {produit.nom}
        </h3>
        <div className="flex justify-between items-center">
          <span className="text-or text-sm tracking-sm">
            {produit.prix.toLocaleString()} Ar
          </span>
          <span className={`text-xs tracking-widest uppercase ${
            produit.stock > 0 ? 'text-muted' : 'text-red-400'
          }`}>
            {produit.stock > 0 ? `${produit.stock} en stock` : 'Épuisé'}
          </span>
        </div>
      </div>

    </div>
  );
}