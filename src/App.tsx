import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import About from './pages/About';
import Services from './pages/Services';
import Vehicles from './pages/Vehicles';
import VehicleDetail from './pages/VehicleDetail';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import ScrollAnimation from './components/ScrollAnimation';
import './App.css';

const App = () => {
  return (
    <ScrollAnimation>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/vehicles/:id" element={<VehicleDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </ScrollAnimation>
  );
};

export default App;
