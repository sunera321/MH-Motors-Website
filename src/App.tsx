import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Main from './components/Main';
import Catalog from './catalog/catalog';
import AddItem from './catalog/AddDataForm';
import OwerDhshbord from './catalog/OwerDhshbord';
import Login from './page/Loging';
import SpecialOrders from './catalog/SpecialOrders';
import OwnerCatalog from './catalog/OwnerCatalog';
import SEO from './SEO';  // Make sure the path matches where you created the SEO.tsx file

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <SEO 
            title="Home"
            description="MH Motors - Your trusted source for quality auto parts and automotive services"
            keywords="auto parts, car parts, automotive, MH Motors, vehicle maintenance"
          />
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/cataloglist" element={<Catalog />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/additems"
                element={
                  localStorage.getItem('token') === '200135606060' ? <AddItem /> : <Login />
                }
              />
              <Route
                path="/ownerdhashbord"
                element={
                  localStorage.getItem('token') === '200135606060' ? <OwerDhshbord /> : <Login />
                }
              />
              <Route
                path="/ownercatalog"
                element={
                  localStorage.getItem('token') === '200135606060' ? <OwnerCatalog /> : <Login />
                }
              />
              <Route
                path="/specialorders"
                element={
                  localStorage.getItem('token') === '200135606060' ? <SpecialOrders /> : <Login />
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;