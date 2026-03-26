import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logos/6.png';
import { useState } from 'react';

const NAV_LINKS = [
  { label: 'Accueil', to: '/' },
  { label: 'Collection', to: '/catalogue' },
  { label: 'À propos', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [menuOuvert, setMenuOuvert] = useState(false);

  return (
    <nav className="px-6 md:px-12 h-16 flex items-center justify-between sticky top-0 z-50 backdrop-blur-sm">

      {/* Logo + Nom de marque */}
      <Link to="/" className="flex items-center gap-3 group">
        <img
          src={logo}
          alt="Maison logo"
          className="h-20 w-auto object-contain transition-opacity duration-300 group-hover:opacity-80"
        />
        <span className="font-cormorant text-xl font-light leading-tight text-or transition-opacity duration-300 group-hover:opacity-80">
          <em>Kaloina Fashion</em>
        </span>
      </Link>

      {/* Liens — desktop uniquement */}
      <div className="hidden md:flex font-cormorant items-center gap-9">
        {NAV_LINKS.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            end
            className={({ isActive }) =>
              `relative text-sm tracking-md no-underline transition-colors duration-200
              after:absolute after:left-0 after:-bottom-1 after:h-px after:bg-or
              after:transition-all after:duration-300
              ${isActive
                ? 'text-or after:w-full'
                : 'text-muted hover:text-or after:w-0 hover:after:w-full'
              }`
            }
          >
            <em>{link.label}</em>
          </NavLink>
        ))}
      </div>

      {/* Bouton hamburger — mobile uniquement */}
      <button
        className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 group"
        onClick={() => setMenuOuvert(v => !v)}
        aria-label="Menu"
      >
        <span className={`block h-px w-6 bg-or transition-all duration-300 origin-center
          ${menuOuvert ? 'rotate-45 translate-y-[7px]' : ''}`}
        />
        <span className={`block h-px w-6 bg-or transition-all duration-300
          ${menuOuvert ? 'opacity-0 scale-x-0' : ''}`}
        />
        <span className={`block h-px w-6 bg-or transition-all duration-300 origin-center
          ${menuOuvert ? '-rotate-45 -translate-y-[7px]' : ''}`}
        />
      </button>

      {/* Menu déroulant — mobile */}
      <div className={`md:hidden absolute top-16 left-0 right-0 z-40
        backdrop-blur-sm border-b border-bordure
        flex flex-col items-center gap-0
        overflow-hidden transition-all duration-300 ease-in-out
        ${menuOuvert ? 'max-h-64 py-6' : 'max-h-0 py-0'}`}
      >
        {NAV_LINKS.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            end
            onClick={() => setMenuOuvert(false)}
            className={({ isActive }) =>
              `font-cormorant bg-white text-lg font-light py-3 w-full text-center
              transition-colors duration-200
              ${isActive ? 'text-or' : 'text-muted hover:text-or'}`
            }
          >
            <em>{link.label}</em>
          </NavLink>
        ))}
      </div>

    </nav>
  );
}