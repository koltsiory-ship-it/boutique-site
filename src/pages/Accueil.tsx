import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProduits } from '../api';
import type { Produit } from '../types';
import ProductCard from '../components/ProductCard';
import fondAccueil from '../assets/images/fond-accueil.png';

const MANIFESTE = [
  { num: 'I',   texte: 'Matières nobles & intemporelles' },
  { num: 'II',  texte: 'Coupes pensées pour la femme moderne' },
  { num: 'III', texte: 'Livraison soignée, service sur-mesure' },
];

export default function Accueil() {
  const [produits, setProduits] = useState<Produit[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProduits().then(data => setProduits(data.slice(0, 3)));
  }, []);

  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="bg-or-clair border-b border-bordure">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px]">

          {/* Texte */}
          <div className="flex flex-col justify-center px-8 py-16 md:px-36 md:py-28 text-center md:text-left">
            <p className="label-or mb-5">Nouvelle collection 2026</p>
            <h1 className="font-cormorant text-4xl md:text-6xl text-noir font-light leading-[1.05] mb-5">
              L'élégance <br /> <em className="text-or">au quotidien</em>
            </h1>
            <p className="text-muted text-sm font-light tracking-sm max-w-sm mb-10 leading-loose mx-auto md:mx-0">
              Pièces intemporelles, confectionnées avec soin pour la femme moderne.
            </p>
            <div className="flex justify-center md:justify-start">
              <button className="btn-or" onClick={() => navigate('/catalogue')}>
                Découvrir la collection
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="flex items-end justify-center overflow-hidden px-8 max-h-[400px] md:max-h-none">
            <img
              src={fondAccueil}
              alt="Kaloina Fashion"
              className="h-[300px] md:h-[650px] w-auto object-cover object-top"
            />
          </div>

        </div>
      </section>

      {/* ── Manifeste ── */}
      <section className="grid grid-cols-1 md:grid-cols-3 border-b border-bordure bg-fond">
        {MANIFESTE.map((item, i) => (
          <div
            key={item.num}
            className={`px-10 py-8 md:py-10 text-center
              ${i < MANIFESTE.length - 1
                ? 'border-b border-bordure md:border-b-0 md:border-r'
                : ''
              }`}
          >
            <p className="label-or mb-4">{item.num}</p>
            <p className="font-cormorant text-xl font-light italic leading-relaxed text-noir">
              {item.texte}
            </p>
          </div>
        ))}
      </section>

      {/* ── Pièces vedettes ── */}
      <section className="px-6 md:px-12 py-16 md:py-20 bg-fond-2">
        <div className="text-center mb-12 md:mb-16">
          <p className="label-or mb-3">Sélection</p>
          <h2 className="font-cormorant text-3xl md:text-4xl font-light text-noir">
            Pièces vedettes
          </h2>
          <div className="w-8 h-px bg-or mx-auto mt-5" />
        </div>

        {produits.length === 0 ? (
          <p className="text-center text-muted text-xs tracking-widest uppercase">
            Chargement...
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {produits.map(p => (
              <ProductCard key={p.id} produit={p} />
            ))}
          </div>
        )}

        <div className="text-center mt-10 md:mt-14">
          <button className="btn-outline" onClick={() => navigate('/catalogue')}>
            Voir toute la collection
          </button>
        </div>
      </section>

    </div>
  );
}