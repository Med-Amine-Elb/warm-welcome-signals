
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Index from './pages/Index';
import About from './pages/About';
import Services from './pages/Services';
import Vehicles from './pages/Vehicles';
import VehicleDetail from './pages/VehicleDetail';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import ScrollAnimation from './components/ScrollAnimation';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/services',
    element: <Services />
  },
  {
    path: '/vehicles',
    element: <Vehicles />
  },
  {
    path: '/vehicles/:id',
    element: <VehicleDetail />
  },
  {
    path: '/contact',
    element: <Contact />
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

const App = () => {
  return (
    <ScrollAnimation>
      <RouterProvider router={router} />
    </ScrollAnimation>
  );
};

export default App;
