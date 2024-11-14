"use client";

import React, { useState } from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
import {
  Coins,
  BarChart,
  TrendingUp,
  DollarSign,
  InfoIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import {
  FaShoppingCart,
  FaMoneyBillWave,
  FaChartLine,
  FaWallet,
  FaUsers,
  FaBoxes,
  FaTruck,
} from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);
function getThemeColors() {
  return {
    primary: '#FF9800',
    secondary: '#2196F3',
    tertiary: '#4CAF50',
    quaternary: '#9C27B0',
    background: '#FFF8E8',
  };
}
export default function InventoryPage() {
  return (
    <div className="p-4 sm:p-6 bg-[#FFF8E8]">
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
        <div className="w-full lg:w-2/3 space-y-6 ">
          <SalesOverview />
          <SalesAndPurchase />
          <InventorySummary />
        </div>
        <div className="w-full lg:w-1/3 space-y-6">
          <SalesActivity />
          <BestSellingProducts />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 mt-6">
        <OrderStatus />
        <PhilatelicDepositAccount />
      </div>
    </div>
  );
}

function SalesOverview() {
  const salesData = [
    { label: "Sales", value: "₹ 832", icon: Coins },
    { label: "Revenue", value: "₹ 18,300", icon: BarChart },
    { label: "Profit", value: "₹ 868", icon: TrendingUp },
    { label: "Cost", value: "₹ 17,432", icon: DollarSign },
  ];
  function getIconColor(label) {
    const colors = getThemeColors();
    switch (label) {
      case "Sales":
        return `bg-[${colors.primary}]`;
      case "Revenue":
        return `bg-[${colors.secondary}]`;
      case "Profit":
        return `bg-[${colors.tertiary}]`;
      case "Cost":
        return `bg-[${colors.quaternary}]`;
      default:
        return "bg-gray-500";
    }
  }

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow w-full">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Sales Overview</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {salesData.map((item, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className={`p-2 rounded-full ${getIconColor(item.label)}`}>
              <item.icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-500">{item.label}</p>
              <p className="text-sm sm:text-lg font-semibold">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getIconColor(label) {
  switch (label) {
    case "Sales":
      return "bg-blue-500";
    case "Revenue":
      return "bg-indigo-500";
    case "Profit":
      return "bg-orange-500";
    case "Cost":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
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
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow w-full">
      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h2 className="text-xl sm:text-2xl font-bold">Sales Activity</h2>
        <select
          className="border rounded p-2 bg-white"
          value={timePeriod}
          onChange={handleTimePeriodChange}
        >
          <option value="this-month">This Month</option>
          <option value="last-month">Last Month</option>
          <option value="this-year">This Year</option>
        </select>
      </div>
      <div className="relative">
        <div className="w-full h-64 sm:h-80">
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
        <div className="mt-4 space-y-2">
          {salesData[timePeriod].map((item, index) => (
            <div key={index} className="flex items-center">
              <div
                className="w-4 h-4 mr-2 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-xs sm:text-sm">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="absolute top-4 right-4">
          <InfoIcon className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
}

function SalesAndPurchase() {
  const [timePeriod, setTimePeriod] = useState("weekly");

  const weeklyData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Purchase",
        data: [12000, 19000, 15000, 17000, 14000, 11000, 13000],
        backgroundColor: "#36A2EB",
      },
      {
        label: "Sales",
        data: [10000, 15000, 13000, 14000, 12000, 9000, 11000],
        backgroundColor: "#4BC0C0",
      },
    ],
  };

  const monthlyData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Purchase",
        data: [
          50000, 55000, 60000, 52000, 58000, 62000, 65000, 68000, 70000, 72000,
          75000, 80000,
        ],
        backgroundColor: "#36A2EB",
      },
      {
        label: "Sales",
        data: [
          45000, 50000, 55000, 48000, 53000, 58000, 60000, 63000, 65000, 68000,
          70000, 75000,
        ],
        backgroundColor: "#4BC0C0",
      },
    ],
  };

  const yearlyData = {
    labels: ["2019", "2020", "2021", "2022", "2023"],
    datasets: [
      {
        label: "Purchase",
        data: [600000, 650000, 700000, 750000, 800000],
        backgroundColor: "#36A2EB",
      },
      {
        label: "Sales",
        data: [550000, 600000, 650000, 700000, 750000],
        backgroundColor: "#4BC0C0",
      },
    ],
  };

  const getChartData = () => {
    switch (timePeriod) {
      case "weekly":
        return weeklyData;
      case "monthly":
        return monthlyData;
      case "yearly":
        return yearlyData;
      default:
        return weeklyData;
    }
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1),
        position: "top",
        align: "end",
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };

  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Sales & Purchase</h2>
        <select
          className="border rounded p-2 bg-white"
          value={timePeriod}
          onChange={handleTimePeriodChange}
        >
          <option value="weekly">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <div className="w-full h-[300px] sm:h-[400px]">
        <Bar data={getChartData()} options={options} />
      </div>
    </div>
  );
}

function BestSellingProducts() {
  const products = [
    {
      name: "Azadi Ka Mahotsav Stamp",
      price: "500 ₹",
      image: "/1.jpg",
    },
    { name: "Azadi Ka Mahotsav Stamp", price: "500 ₹", image: "/1.jpg" },
    { name: "Azadi Ka Mahotsav Stamp", price: "500 ₹", image: "/1.jpg" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + products.length) % products.length
    );
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Best Selling Products</h2>
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {products.map((product, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <div className="bg-gray-100 h-48 flex items-center justify-center mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <h3 className="text-center font-semibold">{product.name}</h3>
                <p className="text-center text-blue-500">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

function InventorySummary() {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow w-full">
      <h2 className="text-xl font-bold mb-4">Inventory Summary</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center">
          <FaUsers className="text-2xl sm:text-3xl text-blue-500 mb-2" />
          <p className="text-xs sm:text-sm text-gray-500 text-center">
            Total Customer
          </p>
          <p className="text-sm sm:text-lg font-semibold">2,32000.00</p>
        </div>
        <div className="flex flex-col items-center">
          <FaBoxes className="text-2xl sm:text-3xl text-green-500 mb-2" />
          <p className="text-xs sm:text-sm text-gray-500 text-center">
            Quantity in Hand
          </p>
          <p className="text-sm sm:text-lg font-semibold">868</p>
        </div>
        <div className="flex flex-col items-center">
          <FaTruck className="text-2xl sm:text-3xl text-purple-500 mb-2" />
          <p className="text-xs sm:text-sm text-gray-500 text-center">
            To be received
          </p>
          <p className="text-sm sm:text-lg font-semibold">200</p>
        </div>
      </div>
    </div>
  );
}

function OrderStatus() {
  const data = {
    labels: ["Success", "Pending", "Failed"],
    datasets: [
      {
        data: [73, 20, 7],
        backgroundColor: ["#4BC0C0", "#FFCE56", "#FF6384"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
  };

  return (
    <div className="bg-white p-4 w-1/3 sm:p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">Order Status</h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Total Earnings of the Month
          </p>
        </div>
        <TrendingUp className="text-green-500" />
      </div>
      <div className="relative h-64 sm:h-80">
        <Pie data={data} options={options} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="text-lg sm:text-3xl font-bold">73%</p>
          <p className="text-xs sm:text-sm text-gray-500">Success</p>
        </div>
      </div>
      <div className="mt-4 flex justify-center space-x-4">
        {data.labels.map((label, index) => (
          <div key={index} className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{
                backgroundColor: data.datasets[0].backgroundColor[index],
              }}
            ></div>
            <span className="text-xs sm:text-sm">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhilatelicDepositAccount() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      {
        label: "Underprod",
        data: [21000, 19000, 20000, 22000, 22500, 24000, 25000, 26000],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgb(53, 162, 235)",
        fill: false,
        tension: 0.4,
      },
      {
        label: "Overprod",
        data: [26000, 28000, 28500, 29000, 28500, 29500, 32000, 33000],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgb(255, 99, 132)",
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Philatelic Deposit Account",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return "₹" + value / 1000 + "k";
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow w-full">
      <Line data={data} options={options} />
    </div>
  );
}
