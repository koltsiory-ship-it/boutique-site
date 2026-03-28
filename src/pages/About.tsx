import React from 'react';

const About: React.FC = () => {
  return (
    <main className="max-w-3xl mx-auto px-8 py-24">

      {/* Section boutique */}
      <section className="mb-24">
        <p className="text-[10px] tracking-[0.25em] uppercase text-muted mb-5">
          Notre histoire
        </p>
        <h1 className="font-cormorant font-light text-5xl leading-tight text-gray-800 mb-8">
          La mode comme<br />
          <em>art de vivre</em>
        </h1>
        <div className="w-10 h-px bg-or mb-8" />
        <div className="text-sm font-light leading-loose text-muted max-w-lg space-y-4">
          <p>
            Bienvenue chez Kaloina Fashion. Nous sommes passionnés par la mode
            et nous nous engageons à vous offrir des pièces de qualité,
            soigneusement sélectionnées pour révéler votre personnalité.
          </p>
          <p>
            Notre mission est de vous proposer des articles tendance avec un
            service irréprochable — parce que la mode est avant tout une expérience.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-12 mb-24">
        {[
          { number: '100+', label: 'Pièces sélectionnées' },
          { number: '2024', label: 'Fondée avec passion' },
        ].map(stat => (
          <div key={stat.label}>
            <p className="font-cormorant font-light text-5xl text-or leading-none mb-1">
              {stat.number}
            </p>
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      <hr className="border-bordure mb-24" />

      {/* Section freelance */}
      <section>
        <p className="text-[10px] tracking-[0.25em] uppercase text-muted mb-5">
          Développement web & services
        </p>
        <h2 className="font-cormorant font-light text-4xl leading-tight text-gray-800 mb-8">
          Votre présence<br />
          <em>en ligne, repensée</em>
        </h2>
        <div className="w-10 h-px bg-or mb-8" />
        <div className="text-sm font-light leading-loose text-muted max-w-lg space-y-4">
          <p>
            En parallèle de la boutique, je suis développeur web freelance.
            Je conçois des sites modernes pour petites entreprises, boutiques
            et restaurants — comme celui que vous consultez en ce moment.
          </p>
          <p>
            Design, développement, optimisation : je vous accompagne de A à Z
            pour mettre votre marque en ligne rapidement et efficacement.
          </p>
        </div>
        <a
          href="https://wa.me/+261327954809"
          className="inline-flex items-center gap-2 mt-8 text-[10px] tracking-[0.2em] uppercase text-or border-b border-or pb-1 transition-opacity duration-200 hover:opacity-60"
        >
          Discutons de votre projet <span>→</span>
        </a>
      </section>

    </main>
  );
};

export default About;