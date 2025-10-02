import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Checkout from "./pages/Checkout";
import UserOrders from "./pages/UserOrders";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import ProtectedUserRoute from "./components/ProtectedUserRoute";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <Routes>
          {/* 🏠 Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* 🛒 User Protected Routes */}
          <Route
            path="/cart"
            element={
              <ProtectedUserRoute>
                <Cart />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="/order"
            element={
              <ProtectedUserRoute>
                <Order />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedUserRoute>
                <Checkout />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedUserRoute>
                <UserOrders />
              </ProtectedUserRoute>
            }
          />

          {/* 🛠 Admin Protected Route */}
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