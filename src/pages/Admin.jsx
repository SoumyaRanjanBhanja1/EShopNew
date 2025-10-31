import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../features/products/productSlice";
import {
  fetchOrders,
  updateOrder,
  deleteOrder,
} from "../features/orders/orderSlice";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DashboardChart from "../components/DashboardChart";
import ProductFormModal from "../components/ProductFormModal";
import ProductTable from "../components/ProductTable";
import OrderTable from "../components/OrderTable";
import { motion, AnimatePresence } from "framer-motion";

export default function Admin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const { items: products = [], loading: productLoading } = useSelector(
    (state) => state.products || {}
  );
  const { items: orders = [], loading: orderLoading } = useSelector(
    (state) => state.orders || {}
  );

  // Local state
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [editId, setEditId] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchOrders());
  }, [dispatch]);

  // ---------- PRODUCT HANDLERS ----------
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      if (editId) {
        await dispatch(updateProduct({ id: editId, data }));
      } else {
        await dispatch(createProduct(data));
      }
      setForm({ name: "", description: "", price: "", quantity: "", image: null });
      setPreview(null);
      setEditId(null);
      setShowModal(false);
      dispatch(fetchProducts());
    } catch {
      console.error("❌ Product operation failed");
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      image: null,
    });
    setPreview(product.imageUrl);
    setEditId(product._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    await dispatch(deleteProduct(id));
    dispatch(fetchProducts());
  };

  // ---------- ORDER HANDLERS ----------
  const handleOrderUpdate = async (order, updates) => {
    await dispatch(updateOrder({ id: order._id, data: updates }));
    dispatch(fetchOrders());
  };

  const handleOrderDelete = async (id) => {
    await dispatch(deleteOrder(id));
    dispatch(fetchOrders());
  };

  // ---------- LOGOUT ----------
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white flex flex-col md:flex-row">
      <Sidebar setActive={setActiveTab} />

      <div className="flex-1 p-6 md:ml-64">
        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-end mb-4"
        >
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg shadow-md transition-all duration-300"
          >
            🚪 Logout
          </button>
        </motion.div>

        {/* Tabs */}
        <AnimatePresence mode="wait">
          {activeTab === "dashboard" && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <DashboardChart items={products} orders={orders} />
            </motion.div>
          )}

          {activeTab === "create" && (
            <motion.div
              key="create"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <button
                onClick={() => setShowModal(true)}
                className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-xl shadow-lg text-lg font-medium transition-all duration-300"
              >
                ➕ Add New Product
              </button>
            </motion.div>
          )}

          {activeTab === "table" && (
            <motion.div
              key="table"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4 }}
            >
              <ProductTable
                items={products}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </motion.div>
          )}

          {activeTab === "orders" && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4 }}
            >
              <OrderTable
                items={orders}
                handleUpdate={handleOrderUpdate}
                handleDelete={handleOrderDelete}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <ProductFormModal
              form={form}
              setForm={setForm}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              close={() => {
                setShowModal(false);
                setEditId(null);
                setForm({
                  name: "",
                  description: "",
                  price: "",
                  quantity: "",
                  image: null,
                });
                setPreview(null);
              }}
              preview={preview}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}