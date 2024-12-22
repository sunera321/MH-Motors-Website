
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Main from './components/Main';
import Catalog from './catalog/catalog';
import AddItem from './catalog/AddDataForm';
import OwerDhshbord from './catalog/OwerDhshbord';
import Login from './page/Loging';
import SpecialOrders from './catalog/SpecialOrders'
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
  );
}

export default App;
