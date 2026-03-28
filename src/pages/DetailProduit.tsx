import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduit, getPhotoUrl } from '../api';
import type { Produit } from '../types';

const WHATSAPP_NUMBER = '261327905107';

function commanderWhatsApp(produit: Produit) {
  const message = encodeURIComponent(
    `Bonjour 👋, je suis intéressé(e) par :\n\n` +
    `🛍️ *${produit.nom}*\n` +
    `💰 Prix : ${produit.prix.toLocaleString()} Ar\n` +
    `📦 Catégorie : ${produit.categorie_nom}\n\n` +
    `Je souhaite passer commande. Merci !`
  );
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
}

export default function DetailProduit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [produit, setProduit] = useState<Produit | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (id) getProduit(Number(id)).then(setProduit);
  }, [id]);

  // Fermer la lightbox avec Escape
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setLightboxOpen(false);
  }, []);

  useEffect(() => {
    if (lightboxOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen, handleKeyDown]);

  if (!produit) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-or border-t-transparent rounded-full animate-spin" />
        <p className="text-muted text-xs tracking-widest uppercase">Chargement...</p>
      </div>
    </div>
  );

  const enStock = produit.stock > 0;
  const photoUrl = produit.photo ? getPhotoUrl(produit.photo) : null;

  return (
    <>
      {/* ══ LIGHTBOX ══ */}
      {lightboxOpen && photoUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Bouton fermer */}
          <button
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center
              border border-white/20 text-white/70 hover:text-white hover:border-white/50
              transition-all duration-200 z-10"
            onClick={() => setLightboxOpen(false)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Hint ESC */}
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/30 text-xs tracking-widest uppercase">
            Appuyez sur Échap ou cliquez pour fermer
          </span>

          {/* Image agrandie */}
          <img
            src={photoUrl}
            alt={produit.nom}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* ══ PAGE ══ */}
      <div className="min-h-screen bg-noir-1 py-8 md:py-12 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-muted tracking-widest uppercase mb-8 md:mb-10">
            <button onClick={() => navigate('/')} className="hover:text-or transition-colors">Accueil</button>
            <span>/</span>
            <button onClick={() => navigate('/catalogue')} className="hover:text-or transition-colors">Catalogue</button>
            <span>/</span>
            <span className="text-or truncate max-w-[140px] md:max-w-[200px]">{produit.nom}</span>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">

            {/* ── Photo ── */}
            <div className="relative group">
              {/* Badge stock */}
              <div className={`absolute top-3 left-3 z-10 px-3 py-1 text-[10px] tracking-widest uppercase font-medium
                ${enStock ? 'bg-or text-noir-1' : 'bg-red-600 text-white'}`}>
                {enStock ? 'Disponible' : 'Épuisé'}
              </div>

              {/* Icône zoom */}
              {photoUrl && (
                <div className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center
                  bg-noir-1/70 border border-bordure opacity-0 group-hover:opacity-100
                  transition-opacity duration-300 pointer-events-none">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0zm-3-3v6m-3-3h6" />
                  </svg>
                </div>
              )}

              <div
                className={`bg-noir-3 border border-bordure overflow-hidden aspect-square
                  ${photoUrl ? 'cursor-zoom-in' : ''}`}
                onClick={() => photoUrl && setLightboxOpen(true)}
              >
                {photoUrl ? (
                  <>
                    {!imageLoaded && (
                      <div className="w-full h-full flex items-center justify-center min-h-[300px] md:min-h-[400px]">
                        <div className="w-6 h-6 border-2 border-or border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                    <img
                      src={photoUrl}
                      alt={produit.nom}
                      onLoad={() => setImageLoaded(true)}
                      className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105
                        ${imageLoaded ? 'opacity-100' : 'opacity-0 absolute'}`}
                    />
                  </>
                ) : (
                  <div className="w-full h-full min-h-[300px] md:min-h-[400px] flex flex-col items-center justify-center gap-2">
                    <svg className="w-10 h-10 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-muted text-xs tracking-widest uppercase">Photo à venir</span>
                  </div>
                )}
              </div>

              {/* Hint tap sur mobile */}
              {photoUrl && (
                <p className="text-center text-muted text-[10px] tracking-widest uppercase mt-2 md:hidden">
                  Appuyez pour agrandir
                </p>
              )}
            </div>

            {/* ── Infos ── */}
            <div className="flex flex-col">

              {/* Catégorie */}
              <span className="label-or text-[10px] tracking-[0.2em] uppercase mb-3">
                {produit.categorie_nom}
              </span>

              {/* Nom */}
              <h1 className="font-serif text-2xl md:text-4xl font-light leading-tight mb-4 text-slate-700">
                {produit.nom}
              </h1>

              {/* Prix */}
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-or text-2xl md:text-3xl font-light tracking-tight">
                  {produit.prix.toLocaleString()}
                </span>
                <span className="text-muted text-sm tracking-widest uppercase">Ar</span>
              </div>

              {/* Séparateur + description */}
              <div className="border-t border-bordure pt-5 mb-6">
                <p className="text-muted text-sm leading-7">
                  {produit.description || 'Aucune description disponible pour cet article.'}
                </p>
              </div>

              {/* Stock */}
              <div className="flex items-center gap-2 mb-8">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${enStock ? 'bg-or animate-pulse' : 'bg-red-500'}`} />
                <span className={`text-xs tracking-widest uppercase ${enStock ? 'text-or' : 'text-red-400'}`}>
                  {enStock
                    ? `${produit.stock} pièce${produit.stock > 1 ? 's' : ''} disponible${produit.stock > 1 ? 's' : ''}`
                    : 'Article épuisé'}
                </span>
              </div>

              {/* ── Boutons ── */}
              <div className="flex flex-col gap-3">

                {/* Bouton WhatsApp */}
                <button
                  onClick={() => enStock && commanderWhatsApp(produit)}
                  disabled={!enStock}
                  className={`flex items-center justify-center gap-3 w-full py-4 px-6
                    text-xs tracking-[0.15em] uppercase font-medium transition-all duration-300
                    ${enStock
                      ? 'bg-[#25D366] hover:bg-[#1ebe5d] text-white cursor-pointer shadow-lg shadow-[#25D366]/20 hover:shadow-[#25D366]/40 active:scale-[0.98]'
                      : 'bg-noir-3 text-muted cursor-not-allowed opacity-50'
                    }`}
                >
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {enStock ? 'Commander sur WhatsApp' : 'Épuisé'}
                </button>

                {/* Bouton Retour */}
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 px-6
                    border border-bordure text-muted hover:border-or hover:text-or
                    text-xs tracking-[0.15em] uppercase transition-all duration-300 active:scale-[0.98]"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Retour
                </button>
              </div>

              {/* Note livraison */}
              <p className="mt-6 text-center text-[10px] text-muted tracking-widest uppercase border-t border-bordure pt-4">
                📦 Livraison & paiement confirmés via WhatsApp
              </p>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}