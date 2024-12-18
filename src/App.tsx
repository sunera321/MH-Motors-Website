
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Main from './components/Main';
import Catalog from './catalog/catalog';
import AddItem from './catalog/AddDataForm';
import OwerDhshbord from './catalog/OwerDhshbord';
import Login from './page/Loging';
import OwnerCatalog from './catalog/OwnerCatalog';


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            {/* Default Home Route */}
            <Route path="/" element={<Main />} />
            {/* Catalog Route */}
            <Route path="/cataloglist" element={<Catalog />} />
            {/* Add Data Route */}
            <Route path="/additems" element={<AddItem />} />
            <Route path="/ownerdhashbord" element={<OwerDhshbord/>} />
            <Route path="/ownercatalog" element={< OwnerCatalog/>} />
            {/* Login Route */}
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
