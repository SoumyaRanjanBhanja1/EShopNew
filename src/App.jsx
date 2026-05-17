import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
// import Login from "./pages/Login1";
// import Signup from "./pages/Signup1";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AboutUs from "./components/AboutUs";
import Careers from "./components/Careers";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Checkout from "./pages/Checkout";
import UserOrders from "./pages/UserOrders"; // ✅ User order history
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import ProtectedUserRoute from "./components/ProtectedUserRoute";
import InvestorsPage from "./components/InvestorsPage";
import LegalPage from "./components/LegalPage";
import NewArrivals from './components/NewArrivals';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <Routes>
          {/* 🏠 Home Page */}
          <Route path="/" element={<Home />} />

          {/* 🔐 Auth Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* 🛒 Cart Page */}
          <Route
            path="/cart"
            element={
              <ProtectedUserRoute>
                <Cart />
              </ProtectedUserRoute>
            }
          />

          <Route path="/About" element={<AboutUs/>}/>
          <Route path="/apply" element={<Careers/>}/>
          <Route path="/Investors" element={<InvestorsPage/>}/>
          <Route path="/Careers" element={<Careers/>}/>
          <Route path="/help" element={<LegalPage title="Help & Concierge Center" />} />
          <Route path="/NewArrivals" element={<NewArrivals />} />

          {/* 📦 Order Summary Page */}
          <Route
            path="/order"
            element={
              <ProtectedUserRoute>
                <Order />
              </ProtectedUserRoute>
            }
          />

          {/* 💳 Checkout Page */}
          <Route
            path="/checkout"
            element={
              <ProtectedUserRoute>
                <Checkout />
              </ProtectedUserRoute>
            }
          />

          {/* 📜 User Order History Page */}
          <Route
            path="/orders"
            element={
              <ProtectedUserRoute>
                <UserOrders />
              </ProtectedUserRoute>
            }
          />

          {/* 🛠 Admin Dashboard */}
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <Admin />
              </ProtectedAdminRoute>
            }
          />

          {/* 🚫 Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;