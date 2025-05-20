import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';

// Pages
import SimpleHome from './pages/SimpleHome';
import SimpleLogin from './pages/SimpleLogin';
import SimpleRegister from './pages/SimpleRegister';
import SimpleDashboard from './pages/SimpleDashboard';
import SimpleProducts from './pages/SimpleProducts';
import SimpleAddProduct from './pages/SimpleAddProduct';
import SimpleProductView from './pages/SimpleProductView';
import SimpleProductEdit from './pages/SimpleProductEdit';
import SimpleLowStockProducts from './pages/SimpleLowStockProducts';
import SimpleCustomers from './pages/SimpleCustomers';
import SimpleAddCustomer from './pages/SimpleAddCustomer';
import SimpleCustomerView from './pages/SimpleCustomerView';
import SimpleCustomerEdit from './pages/SimpleCustomerEdit';
import TermsConditions from './pages/TermsConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiesPolicy from './pages/CookiesPolicy';
import RefundPolicy from './pages/RefundPolicy';
import Licensing from './pages/Licensing';
import Sitemap from './pages/Sitemap';
import SimpleInventory from './pages/SimpleInventory';
import SimpleInventoryView from './pages/SimpleInventoryView';
import SimpleInventoryEdit from './pages/SimpleInventoryEdit';
import SimpleStaff from './pages/SimpleStaff';

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <Router>
          <Routes>
            <Route path="/" element={<SimpleHome />} />
            <Route path="/login" element={<SimpleLogin />} />
            <Route path="/register" element={<SimpleRegister />} />
            <Route path="/dashboard" element={<SimpleDashboard />} />
            <Route path="/products" element={<SimpleProducts />} />
            <Route path="/products/add" element={<SimpleAddProduct />} />
            <Route path="/products/low-stock" element={<SimpleLowStockProducts />} />
            <Route path="/products/:id" element={<SimpleProductView />} />
            <Route path="/products/:id/edit" element={<SimpleProductEdit />} />
            <Route path="/customers" element={<SimpleCustomers />} />
            <Route path="/customers/add" element={<SimpleAddCustomer />} />
            <Route path="/customers/:id" element={<SimpleCustomerView />} />
            <Route path="/customers/:id/edit" element={<SimpleCustomerEdit />} />
            <Route path="/inventory" element={<SimpleInventory />} />
            <Route path="/inventory/:id" element={<SimpleInventoryView />} />
            <Route path="/inventory/:id/update" element={<SimpleInventoryEdit />} />
            <Route path="/staff" element={<SimpleStaff />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/cookies" element={<CookiesPolicy />} />
            <Route path="/refund" element={<RefundPolicy />} />
            <Route path="/licensing" element={<Licensing />} />
            <Route path="/sitemap" element={<Sitemap />} />
            {/* Add more routes as needed */}
          </Routes>
        </Router>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
