import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logos/6.png';

const NAV_LINKS = [
  { label: 'Accueil', to: '/' },
  { label: 'Collection', to: '/catalogue' },
  { label: 'À propos', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  return (
    <nav className="px-12 h-16 flex items-center justify-between sticky top-0 z-50 backdrop-blur-sm">
      
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

      {/* Liens de navigation */}
      <div className="flex font-cormorant items-center gap-9">
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

    </nav>
  );
}