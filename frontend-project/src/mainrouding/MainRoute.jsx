import './Mainrouding.css';
import { About } from '../about/About';
import { Home } from '../homepage/Home';
import { Navbar } from '../navication/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Service } from '../service/Service';
import { Contact } from '../contact/Contact';
import { Sidebar } from '../sidebar/Sidebar';
import { useState } from 'react';
import { Login } from '../formvalitation/Login';
import Profile from '../profilepage/Profile';
import { Forget } from '../formvalitation/Forget';
import CreateProduct from '../Product/CreateProduct';
import { ProductDetail } from '../Product/singleproduct/ProductDetail';
import { Messages } from '../Message/GetMessage';
import { ResetPassword } from '../formvalitation/ResetPassword';
import { Addtocart } from '../addtocart/Addtocart';

export const MainRoute = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <BrowserRouter>
      <>
        {showLogin && <Login setShowLogin={setShowLogin} />}
        <Navbar setShowLogin={setShowLogin} /> 
        <div className="MainRouding">
          <div className="sidebarRouding">
            <Sidebar />
          </div>
          <div className="ComponentRouding">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Service />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/forgot" element={<Forget />} />
              <Route path='/productList'element={<CreateProduct/>} /> 
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path='/Message' element={<Messages/>}/>
              <Route path="/reset/:token" element={<ResetPassword />} />
              <Route path='/addtocart' element={<Addtocart/>}/>
            </Routes>
          </div>
        </div>
      </>
    </BrowserRouter>
  );
};

