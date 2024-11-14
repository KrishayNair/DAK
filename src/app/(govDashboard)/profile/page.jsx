"use client";
import React, { useState, useRef } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { FiEdit2, FiTrash2, FiPlus, FiX } from "react-icons/fi";
import {
  Coins,
  BarChart,
  TrendingUp,
  DollarSign,
  InfoIcon,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="bg-[#FFF8E8] min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left column - Sticky Profile Section */}
          <div className="w-full lg:w-1/4 lg:sticky lg:top-6 lg:self-start">
            <ProfileSection />
          </div>

          {/* Right column */}
          <div className="w-full lg:w-3/4 flex flex-col gap-6">
            <StatCards />

            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-2/3">
                <Workshops />
              </div>
              <div className="w-full md:w-1/3">
                <Notifications />
              </div>
            </div>

            <div className="flex md:flex-row gap-6 h-[65vh]">
              <Products />
              <SalesActivity />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileSection() {
  return (
    <div className="bg-white rounded-lg min-h-[80vh] shadow overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">My profile</h2>
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full mb-4 overflow-hidden">
            <img
              src="/images/GovPfp.png"
              alt="Profile Picture"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="font-semibold">Postal Circle</p>
          <p className="text-sm text-gray-500">Postal Circle Region</p>
        </div>
      </div>
      <div className="p-6 flex justify-end">
        <HelpCenter />
      </div>
    </div>
  );
}

function StatCards() {
  const stats = [
    {
      title: "Total User",
      value: "40,689",
      change: "+8.5% Up from yesterday",
      icon: "👤",
      color: "bg-blue-100",
    },
    {
      title: "Total Order",
      value: "10293",
      change: "+1.5% Up from past week",
      icon: "📦",
      color: "bg-yellow-100",
    },
    {
      title: "Total Sales",
      value: "$89,000",
      change: "-4.3% Down from yesterday",
      icon: "💰",
      color: "bg-green-100",
    },
    {
      title: "Total Pending",
      value: "2040",
      change: "+1.8% Up from yesterday",
      icon: "⏳",
      color: "bg-red-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className={`${stat.color} p-4 rounded-lg`}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-2xl">{stat.icon}</span>
            <span className="text-sm text-gray-600">{stat.title}</span>
          </div>
          <p className="text-2xl font-bold">{stat.value}</p>
          <p className="text-xs text-gray-600 mt-1">{stat.change}</p>
        </div>
      ))}
    </div>
  );
}

function Workshops() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workshops, setWorkshops] = useState([]);
  const [newWorkshop, setNewWorkshop] = useState({
    title: "",
    description: "",
    date: "",
    image: null,
  });
  const scrollContainerRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWorkshop({ ...newWorkshop, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewWorkshop({ ...newWorkshop, image: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddWorkshop = () => {
    setWorkshops([...workshops, newWorkshop]);
    setNewWorkshop({ title: "", description: "", date: "", image: null });
    setIsModalOpen(false);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow h-full">
      <h2 className="text-xl font-semibold mb-4">Workshops</h2>
      <div className="flex items-center space-x-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-2xl text-gray-400 hover:text-gray-600"
          >
            <FiPlus />
          </button>
        </div>
        <div className="relative flex-grow">
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto flex space-x-4 pb-4 scrollbar-hide smooth-scroll"
            style={{ scrollBehavior: "smooth" }}
          >
            {workshops.map((workshop, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-1/2 p-4 border rounded-lg"
              >
                <img
                  src={workshop.image}
                  alt={workshop.title}
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
                <h3 className="font-semibold">{workshop.title}</h3>
                <p className="text-sm text-gray-600">{workshop.date}</p>
              </div>
            ))}
          </div>
          {workshops.length > 2 && (
            <>
              <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 max-w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Workshop</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>
            <input
              type="text"
              name="title"
              placeholder="Workshop Title"
              value={newWorkshop.title}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1 mb-2"
            />
            <textarea
              name="description"
              placeholder="Workshop Description"
              value={newWorkshop.description}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1 mb-2"
            />
            <input
              type="date"
              name="date"
              value={newWorkshop.date}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1 mb-2"
            />
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full border rounded px-2 py-1 mb-4"
            />
            <button
              onClick={handleAddWorkshop}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Add Workshop
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Products() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product Name",
      qty: 200,
      sold: 150,
      rem: 50,
      rating: 4.5,
      image: null,
    },
    {
      id: 2,
      name: "Product Name",
      qty: 200,
      sold: 150,
      rem: 50,
      rating: 4.5,
      image: null,
    },
    {
      id: 3,
      name: "Product Name",
      qty: 200,
      sold: 150,
      rem: 50,
      rating: 4.5,
      image: null,
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    qty: 0,
    sold: 0,
    rem: 0,
    rating: 0,
    image: null,
  });

  const handleInputChange = (e, isEditing = false) => {
    const { name, value } = e.target;
    if (isEditing) {
      setEditingProduct({ ...editingProduct, [name]: value });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleImageChange = (e, isEditing = false) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (isEditing) {
          setEditingProduct({ ...editingProduct, image: e.target.result });
        } else {
          setNewProduct({ ...newProduct, image: e.target.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = () => {
    const id = Math.max(...products.map((p) => p.id), 0) + 1;
    setProducts([...products, { id, ...newProduct }]);
    setNewProduct({
      name: "",
      qty: 0,
      sold: 0,
      rem: 0,
      rating: 0,
      image: null,
    });
    setIsModalOpen(false);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleUpdateProduct = () => {
    setProducts(
      products.map((p) => (p.id === editingProduct.id ? editingProduct : p))
    );
    setEditingProduct(null);
    setIsModalOpen(false);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow  flex flex-col w-2/3">
      <h2 className="text-xl font-semibold mb-4">Products</h2>
      <div className="rounded-lg p-4 mb-4 flex justify-center">
        <button
          onClick={() => {
            setEditingProduct(null);
            setIsModalOpen(true);
          }}
          className="flex items-center justify-center bg-[#D2B48C] text-white px-4 py-2 rounded-full hover:bg-[#C19A6B] transition duration-300"
        >
          <FiPlus className="mr-2" /> Add new product
        </button>
      </div>
      <div className="overflow-auto flex-grow">
        <table className="w-full">
          <thead className="sticky top-0 bg-white">
            <tr className="text-left text-gray-600 border-b">
              <th className="py-2">Product</th>
              <th className="py-2">Product Name</th>
              <th className="py-2">Qty</th>
              <th className="py-2">Sold</th>
              <th className="py-2">Rem</th>
              <th className="py-2">Rating</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="py-2">
                  <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center overflow-hidden">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-500">No Image</span>
                    )}
                  </div>
                </td>
                <td className="py-2">{product.name}</td>
                <td className="py-2">{product.qty}</td>
                <td className="py-2">{product.sold}</td>
                <td className="py-2">{product.rem}</td>
                <td className="py-2">★ {product.rating}</td>
                <td className="py-2">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="text-blue-500 mr-2 hover:text-blue-700"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 max-w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h3>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={editingProduct ? editingProduct.name : newProduct.name}
              onChange={(e) => handleInputChange(e, !!editingProduct)}
              className="w-full border rounded px-2 py-1 mb-2"
            />
            <input
              type="number"
              name="qty"
              placeholder="Quantity"
              value={editingProduct ? editingProduct.qty : newProduct.qty}
              onChange={(e) => handleInputChange(e, !!editingProduct)}
              className="w-full border rounded px-2 py-1 mb-2"
            />
            <input
              type="number"
              name="sold"
              placeholder="Sold"
              value={editingProduct ? editingProduct.sold : newProduct.sold}
              onChange={(e) => handleInputChange(e, !!editingProduct)}
              className="w-full border rounded px-2 py-1 mb-2"
            />
            <input
              type="number"
              name="rem"
              placeholder="Remaining"
              value={editingProduct ? editingProduct.rem : newProduct.rem}
              onChange={(e) => handleInputChange(e, !!editingProduct)}
              className="w-full border rounded px-2 py-1 mb-2"
            />
            <input
              type="number"
              name="rating"
              placeholder="Rating"
              step="0.1"
              min="0"
              max="5"
              value={editingProduct ? editingProduct.rating : newProduct.rating}
              onChange={(e) => handleInputChange(e, !!editingProduct)}
              className="w-full border rounded px-2 py-1 mb-2"
            />
            <input
              type="file"
              onChange={(e) => handleImageChange(e, !!editingProduct)}
              className="w-full border rounded px-2 py-1 mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={
                  editingProduct ? handleUpdateProduct : handleAddProduct
                }
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
              >
                {editingProduct ? "Update Product" : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Notifications() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New order received", time: "2 hours ago" },
    { id: 2, message: "Product stock low", time: "5 hours ago" },
    { id: 3, message: "New user registered", time: "1 day ago" },
    { id: 4, message: "Monthly report available", time: "2 days ago" },
    { id: 5, message: "System maintenance scheduled", time: "3 days ago" },
  ]);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="bg-white rounded-lg p-6 shadow h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Notifications</h2>
        <button
          onClick={toggleModal}
          className="text-sm text-blue-500 hover:text-blue-700"
        >
          View all
        </button>
      </div>
      <div className="space-y-4">
        {notifications.slice(0, 3).map((notification) => (
          <div key={notification.id} className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <p className="text-sm">{notification.message}</p>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">All Notifications</h3>
              <button
                onClick={toggleModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="mb-4 pb-4 border-b last:border-b-0"
                >
                  <p className="text-sm font-medium">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {notification.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SalesActivity() {
  const [timePeriod, setTimePeriod] = useState("this-month");

  const salesData = {
    "this-month": [
      {
        label: "To be Packaged",
        percentage: 50,
        color: "#3B82F6",
        size: 100,
        x: 60,
        y: 70,
      },
      {
        label: "To be Shipped",
        percentage: 30,
        color: "#1D4ED8",
        size: 80,
        x: 120,
        y: 90,
      },
      {
        label: "To be Delivered",
        percentage: 20,
        color: "#93C5FD",
        size: 60,
        x: 100,
        y: 140,
      },
    ],
    "last-month": [
      {
        label: "To be Packaged",
        percentage: 40,
        color: "#3B82F6",
        size: 90,
        x: 60,
        y: 70,
      },
      {
        label: "To be Shipped",
        percentage: 35,
        color: "#1D4ED8",
        size: 85,
        x: 120,
        y: 90,
      },
      {
        label: "To be Delivered",
        percentage: 25,
        color: "#93C5FD",
        size: 70,
        x: 100,
        y: 140,
      },
    ],
    "this-year": [
      {
        label: "To be Packaged",
        percentage: 45,
        color: "#3B82F6",
        size: 95,
        x: 60,
        y: 70,
      },
      {
        label: "To be Shipped",
        percentage: 40,
        color: "#1D4ED8",
        size: 90,
        x: 120,
        y: 90,
      },
      {
        label: "To be Delivered",
        percentage: 15,
        color: "#93C5FD",
        size: 55,
        x: 100,
        y: 140,
      },
    ],
  };

  const handleTimePeriodChange = (event) => {
    const newTimePeriod = event.target.value;
    console.log("Changing time period to:", newTimePeriod);
    setTimePeriod(newTimePeriod);
  };

  console.log("Current time period:", timePeriod);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow w-1/3 flex flex-col h-full">
      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h2 className="text-xl sm:text-2xl font-bold">Sales Activity</h2>
        <select
          className="border rounded p-2 bg-white text-sm"
          value={timePeriod}
          onChange={handleTimePeriodChange}
        >
          <option value="this-month">This Month</option>
          <option value="last-month">Last Month</option>
          <option value="this-year">This Year</option>
        </select>
      </div>
      <div className="relative flex-grow flex flex-col">
        <div className="w-full flex-grow">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {salesData[timePeriod].map((item, index) => (
              <React.Fragment key={index}>
                <circle
                  cx={item.x}
                  cy={item.y}
                  r={item.size / 2}
                  fill={item.color}
                />
                <text
                  x={item.x}
                  y={item.y}
                  textAnchor="middle"
                  dy=".3em"
                  fill="white"
                  fontSize={item.size / 5}
                  fontWeight="bold"
                >
                  {`${item.percentage}%`}
                </text>
              </React.Fragment>
            ))}
          </svg>
        </div>
        <div className="mt-2 space-y-1">
          {salesData[timePeriod].map((item, index) => (
            <div key={index} className="flex items-center">
              <div
                className="w-3 h-3 mr-2 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-xs">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="absolute top-0 right-0">
          <InfoIcon className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
}

function HelpCenter() {
  return (
    <div className="bg-[#8B4513] text-white p-6 rounded-lg">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#8B4513] text-2xl mr-4">
          ?
        </div>
        <h2 className="text-xl font-semibold">Help Center</h2>
      </div>
      <p className="mb-4">
        Having trouble in Stamp Connect? Please contact us for more questions.
      </p>
      <button className="bg-white text-[#8B4513] px-4 py-2 rounded-full font-semibold">
        Go To Help Center
      </button>
    </div>
  );
}
