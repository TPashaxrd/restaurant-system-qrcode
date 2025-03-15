import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NoPage from './Pages/NoPage.tsx';
import Auth from './Pages/Auth.tsx';
import Verified from './Pages/Verification.tsx';
import CartPage from './Pages/CartPage.tsx';
import Laws from './Pages/Laws.tsx';
import User from './Pages/ShowDataPage.tsx';
import Report from './Pages/Report.tsx';
import ResInfo from './Pages/ResInfo.tsx';
import AdminPage from './Pages/Admin/index.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/admin" element={<AdminPage/>}/>
      <Route path="/verified" element={<Verified/>}/>
      <Route path="/cart" element={<CartPage/>}/>
      <Route path="/laws" element={<Laws/>}/>
      <Route path='/user' element={<User/>}/>
      <Route path='/message' element={<Report/>}/>
      <Route path="/information" element={<ResInfo/>}/>
      <Route path="*" element={<NoPage />} />
    </Routes>
  </BrowserRouter>
);