import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Accueil from './pages/Accueil';
import Catalogue from './pages/Catalogue';
import DetailProduit from './pages/DetailProduit';
import Contact from './pages/Contact';  
import About from './pages/About';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"            element={<Accueil />} />
        <Route path="/catalogue"   element={<Catalogue />} />
        <Route path="/produit/:id" element={<DetailProduit />} />
        <Route path="/contact"     element={<Contact />} />
        <Route path="/about"       element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;