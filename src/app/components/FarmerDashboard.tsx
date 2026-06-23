import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Leaf, Sprout, BarChart3, Camera, Bell, User, Package, AlertCircle,
  MessageSquare, Wallet, Award, ChevronRight, Upload, X,
  Home, LogOut, Settings, Sun, Moon, Check, Zap, BookOpen, Send,
  Plus, Pencil, Trash2, ArrowUpRight, ArrowDownRight, Star, Phone, Users, Globe
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import { useTheme } from '../context/ThemeContext';

type Tab = 'overview' | 'products' | 'ai' | 'passport' | 'wallet' | 'education';

const salesData = [
  { day: 'Mon', sales: 18500 },
  { day: 'Tue', sales: 22000 },
  { day: 'Wed', sales: 15800 },
  { day: 'Thu', sales: 31000 },
  { day: 'Fri', sales: 28500 },
  { day: 'Sat', sales: 45000 },
  { day: 'Sun', sales: 38000 },
];

const monthlyData = [
  { month: 'Jan', revenue: 145000 },
  { month: 'Feb', revenue: 178000 },
  { month: 'Mar', revenue: 162000 },
  { month: 'Apr', revenue: 220000 },
  { month: 'May', revenue: 195000 },
  { month: 'Jun', revenue: 245000 },
];

const products = [
  { id: 1, name: 'Fresh Tomatoes', qty: 500, unit: 'kg', price: 350, status: 'Available', freshness: 95, category: 'Vegetables' },
  { id: 2, name: 'Organic Spinach', qty: 200, unit: 'kg', price: 250, status: 'Available', freshness: 88, category: 'Vegetables' },
  { id: 3, name: 'Sweet Bananas', qty: 300, unit: 'kg', price: 180, status: 'Low Stock', freshness: 92, category: 'Fruits' },
  { id: 4, name: 'Red Peppers', qty: 150, unit: 'kg', price: 420, status: 'Available', freshness: 90, category: 'Vegetables' },
  { id: 5, name: 'Yam', qty: 80, unit: 'tubers', price: 1200, status: 'Available', freshness: 97, category: 'Tubers' },
];

const transactions = [
  { type: 'credit', desc: 'Tomatoes - Order #4521', amount: 18500, time: '2 hrs ago', icon: '🍅' },
  { type: 'credit', desc: 'Spinach - Order #4518', amount: 12000, time: '5 hrs ago', icon: '🥬' },
  { type: 'debit', desc: 'Bank Withdrawal', amount: 50000, time: 'Yesterday', icon: '🏦' },
  { type: 'credit', desc: 'Banana Bundle - Order #4512', amount: 9800, time: '2 days ago', icon: '🍌' },
  { type: 'debit', desc: 'Platform Fee', amount: 2500, time: '3 days ago', icon: '💳' },
];

const chatMessages = [
  { role: 'bot', text: 'Bawo ni! Welcome to FreshChain AI. How can I help your farm today?' },
  { role: 'user', text: 'My tomato leaves are turning yellow. What should I do?' },
  { role: 'bot', text: 'Yellow leaves on tomatoes can indicate several issues:\n\n1. Nitrogen deficiency — Apply NPK fertilizer\n2. Overwatering — Check soil drainage\n3. Fusarium wilt — Remove affected plants\n\nCan you upload a photo for a more accurate diagnosis?' },
];

export function FarmerDashboard() {
  const navigate = useNavigate();
  const { isDark, toggleDark } = useTheme();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [scanFile, setScanFile] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<null | { disease: string; confidence: number; treatment: string }>(null);
  const [scanning, setScanning] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState(chatMessages);
  const [chatLang, setChatLang] = useState('English');
  const [addProduct, setAddProduct] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanResult({ disease: 'Early Blight (Alternaria solani)', confidence: 94, treatment: 'Apply copper-based fungicide every 7 days. Remove infected leaves. Ensure proper spacing for airflow.' });
    }, 2500);
  };

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    setMessages([...messages, { role: 'user', text: chatInput }]);
    const q = chatInput;
    setChatInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'bot',
        text: q.toLowerCase().includes('price') ? 'Current market prices:\n• Tomatoes: ₦350-₦380/kg\n• Spinach: ₦240-₦260/kg\n• Bananas: ₦160-₦190/kg\n\nI recommend pricing tomatoes at ₦375/kg this week — demand is high.' : 'I understand your question. The best practice for Nigerian smallholder farms is to test soil pH before each planting season. Would you like guidance on specific crops?'
      }]);
    }, 1000);
  };

  const navItems: { id: Tab; label: string; icon: typeof Home }[] = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'products', label: 'My Products', icon: Package },
    { id: 'ai', label: 'AI Tools', icon: Zap },
    { id: 'passport', label: 'Financial Passport', icon: Award },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'education', label: 'Learn', icon: BookOpen },
  ];

  const card = `bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl`;
  const txt = `text-gray-900 dark:text-white`;
  const txtMuted = `text-gray-500 dark:text-gray-400`;

  return (
    <div className="min-h-screen bg-[#F7F8F5] dark:bg-gray-950 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-60 bg-green-900 dark:bg-gray-900 text-white flex-col fixed h-full z-40 border-r border-green-800 dark:border-gray-800">
        <div className="p-5 border-b border-green-800 dark:border-gray-800 cursor-pointer" onClick={() => navigate('/')}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>FreshChain</span>
          </div>
          <div className="text-xs text-green-400 mt-1 ml-10">Farmer Portal</div>
        </div>

        <div className="flex items-center gap-3 p-5 border-b border-green-800 dark:border-gray-800">
          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>Abuji Musa</div>
            <div className="text-xs text-green-400">Ogun State Farmer</div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                activeTab === item.id
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'text-green-200 hover:bg-green-800 dark:hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 space-y-1 border-t border-green-800 dark:border-gray-800">
          <button onClick={() => navigate('/farmer/profile')} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-green-200 hover:bg-green-800 hover:text-white transition-all">
            <Settings className="w-4 h-4" /> Profile & Settings
          </button>
          <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-green-300 hover:bg-green-800 hover:text-white transition-all">
            <LogOut className="w-4 h-4" /> Back to Home
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-60">
        {/* Top Bar */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className={`${txt}`} style={{ fontWeight: 700, fontSize: '1.25rem' }}>
              {navItems.find(n => n.id === activeTab)?.label}
            </h1>
            <p className={`text-xs ${txtMuted}`}>Sunday, 14 June 2026</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1.5 rounded-lg text-sm border border-green-100 dark:border-green-800">
              <Sun className="w-4 h-4" />
              <span className="hidden sm:inline">29°C — Good harvest day</span>
            </div>
            <button
              onClick={toggleDark}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all"
              title="Toggle dark mode"
            >
              {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-500" />}
            </button>
            <button className="relative p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button onClick={() => navigate('/farmer/profile')} className="w-9 h-9 bg-green-700 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </button>
          </div>
        </header>

        <div className="p-6">
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total Sales (June)', value: '₦245,800', change: '+12%', up: true, color: 'text-green-600' },
                  { label: 'Active Listings', value: '12', change: '+2 this week', up: true, color: `${txt}` },
                  { label: 'Pending Orders', value: '7', change: '3 urgent', up: false, color: 'text-orange-600' },
                  { label: 'Avg Freshness Score', value: '92%', change: '+3% vs last wk', up: true, color: 'text-blue-600' },
                ].map((stat, i) => (
                  <div key={i} className={`${card} p-5`}>
                    <div className={`text-xs ${txtMuted} mb-2`}>{stat.label}</div>
                    <div className={`text-2xl mb-1.5 ${stat.color}`} style={{ fontWeight: 800 }}>{stat.value}</div>
                    <div className={`flex items-center gap-1 text-xs ${stat.up ? 'text-green-600' : 'text-orange-500'}`}>
                      {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {stat.change}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                <div className={`lg:col-span-2 ${card} p-6`}>
                  <div className="flex items-center justify-between mb-5">
                    <h3 className={txt} style={{ fontWeight: 600 }}>Weekly Sales (₦)</h3>
                    <span className={`text-xs ${txtMuted}`}>This week</span>
                  </div>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={salesData}>
                      <defs>
                        <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#16a34a" stopOpacity={0.2} />
                          <stop offset="100%" stopColor="#16a34a" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#f0f0f0'} />
                      <XAxis dataKey="day" tick={{ fontSize: 11, fill: isDark ? '#9ca3af' : '#6b7280' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: isDark ? '#9ca3af' : '#6b7280' }} axisLine={false} tickLine={false} tickFormatter={v => `₦${(v / 1000).toFixed(0)}k`} />
                      <Tooltip contentStyle={{ background: isDark ? '#1f2937' : '#fff', border: 'none', borderRadius: 8 }} formatter={(v: number) => [`₦${v.toLocaleString()}`, 'Sales']} />
                      <Area type="monotone" dataKey="sales" stroke="#16a34a" strokeWidth={2.5} fill="url(#salesGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className={`${card} p-6`}>
                  <h3 className={`mb-4 ${txt}`} style={{ fontWeight: 600 }}>Spoilage Alerts</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Spinach', days: 2, level: 'critical' },
                      { name: 'Tomatoes', days: 5, level: 'warning' },
                      { name: 'Bananas', days: 3, level: 'warning' },
                      { name: 'Red Peppers', days: 8, level: 'good' },
                      { name: 'Yam', days: 14, level: 'good' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className={`text-sm ${txt}`}>{item.name}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${item.level === 'critical' ? 'bg-red-500' : item.level === 'warning' ? 'bg-orange-400' : 'bg-green-500'}`} style={{ width: `${Math.min((item.days / 14) * 100, 100)}%` }} />
                          </div>
                          <span className={`text-xs font-semibold ${item.level === 'critical' ? 'text-red-600' : item.level === 'warning' ? 'text-orange-600' : 'text-green-600'}`}>{item.days}d</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="mt-4 w-full text-sm text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 rounded-xl py-2 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all" onClick={() => setActiveTab('ai')}>
                    View AI Alerts →
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Add Product', icon: Plus, color: 'bg-green-600', action: () => { setActiveTab('products'); setAddProduct(true); } },
                  { label: 'Scan Crops', icon: Camera, color: 'bg-purple-600', action: () => setActiveTab('ai') },
                  { label: 'Check Wallet', icon: Wallet, color: 'bg-blue-600', action: () => setActiveTab('wallet') },
                  { label: 'View Passport', icon: Award, color: 'bg-orange-600', action: () => setActiveTab('passport') },
                ].map((action, i) => (
                  <button key={i} onClick={action.action} className={`${action.color} text-white rounded-2xl p-5 flex flex-col items-start gap-3 hover:opacity-90 transition-all shadow-sm`}>
                    <action.icon className="w-6 h-6" />
                    <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{action.label}</span>
                  </button>
                ))}
              </div>

              <div className={`${card} p-6`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={txt} style={{ fontWeight: 600 }}>Recent Orders</h3>
                  <button className="text-sm text-green-600 hover:text-green-700">View all</button>
                </div>
                <div className="space-y-3">
                  {[
                    { id: '#4521', item: 'Tomatoes 50kg', buyer: 'Mrs. Adeyemi, Lagos', amount: '₦17,500', status: 'Delivered', time: '2h ago' },
                    { id: '#4518', item: 'Spinach 48kg', buyer: 'FoodCo Restaurant, Ikeja', amount: '₦12,000', status: 'In Transit', time: '5h ago' },
                    { id: '#4515', item: 'Bananas 100kg', buyer: 'Mr. Okonkwo, Lekki', amount: '₦18,000', status: 'Processing', time: 'Yesterday' },
                  ].map((order, i) => (
                    <div key={i} className={`flex items-center justify-between py-3 border-b dark:border-gray-700 last:border-0`}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-50 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                          <Package className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <div className={`text-sm ${txt}`} style={{ fontWeight: 600 }}>{order.item}</div>
                          <div className={`text-xs ${txtMuted}`}>{order.buyer}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-green-600" style={{ fontWeight: 700 }}>{order.amount}</div>
                        <div className={`text-xs px-2 py-0.5 rounded-full ${order.status === 'Delivered' ? 'bg-green-50 text-green-700 dark:bg-green-900/30' : order.status === 'In Transit' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30' : 'bg-orange-50 text-orange-700 dark:bg-orange-900/30'}`}>{order.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PRODUCTS TAB */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className={`text-sm ${txtMuted}`}>Manage your produce listings</p>
                <button onClick={() => setAddProduct(!addProduct)} className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl hover:bg-green-700 transition-all text-sm font-semibold">
                  <Plus className="w-4 h-4" /> Add Product
                </button>
              </div>

              {addProduct && (
                <div className={`${card} p-6 border-green-200 dark:border-green-800`}>
                  <h3 className={`mb-4 ${txt}`} style={{ fontWeight: 600 }}>New Product Listing</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { label: 'Product Name *', placeholder: 'e.g., Fresh Tomatoes', type: 'text' },
                      { label: 'Price per kg (₦)', placeholder: '350', type: 'number' },
                    ].map((f, i) => (
                      <div key={i}>
                        <label className={`block text-sm ${txtMuted} mb-1`}>{f.label}</label>
                        <input type={f.type} className={`w-full border dark:border-gray-600 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500 bg-white dark:bg-gray-700 ${txt}`} placeholder={f.placeholder} />
                      </div>
                    ))}
                    <div>
                      <label className={`block text-sm ${txtMuted} mb-1`}>Category</label>
                      <select className={`w-full border dark:border-gray-600 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500 bg-white dark:bg-gray-700 ${txt}`}>
                        {['Vegetables', 'Fruits', 'Grains', 'Tubers', 'Legumes'].map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={`block text-sm ${txtMuted} mb-1`}>Quantity</label>
                      <input type="number" className={`w-full border dark:border-gray-600 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500 bg-white dark:bg-gray-700 ${txt}`} placeholder="500" />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button className="flex-1 bg-green-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700">List Product</button>
                    <button onClick={() => setAddProduct(false)} className={`flex-1 border dark:border-gray-600 py-2.5 rounded-xl text-sm ${txt} hover:bg-gray-50 dark:hover:bg-gray-700`}>Cancel</button>
                  </div>
                </div>
              )}

              <div className={`${card} overflow-hidden`}>
                <div className={`grid grid-cols-6 gap-4 px-6 py-3 bg-gray-50 dark:bg-gray-900 text-xs ${txtMuted} uppercase tracking-wide border-b dark:border-gray-700`}>
                  <div className="col-span-2">Product</div>
                  <div>Qty</div>
                  <div>Price</div>
                  <div>Freshness</div>
                  <div>Actions</div>
                </div>
                {products.map(p => (
                  <div key={p.id} className={`grid grid-cols-6 gap-4 px-6 py-4 items-center border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors last:border-0`}>
                    <div className="col-span-2 flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-50 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                        <Sprout className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className={`text-sm ${txt}`} style={{ fontWeight: 600 }}>{p.name}</div>
                        <div className={`text-xs px-2 py-0.5 rounded-full inline-block mt-0.5 ${p.status === 'Available' ? 'bg-green-50 text-green-700 dark:bg-green-900/30' : 'bg-orange-50 text-orange-700 dark:bg-orange-900/30'}`}>{p.status}</div>
                      </div>
                    </div>
                    <div className={`text-sm ${txt}`}>{p.qty} {p.unit}</div>
                    <div className="text-sm text-green-700 dark:text-green-400" style={{ fontWeight: 600 }}>₦{p.price}/{p.unit === 'kg' ? 'kg' : 'unit'}</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${p.freshness >= 90 ? 'bg-green-500' : p.freshness >= 75 ? 'bg-yellow-400' : 'bg-red-500'}`} style={{ width: `${p.freshness}%` }} />
                      </div>
                      <span className={`text-xs ${txtMuted}`}>{p.freshness}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg text-green-600 transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI TOOLS TAB */}
          {activeTab === 'ai' && (
            <div className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Crop Health Scanner */}
                <div className={`${card} p-6`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                      <Camera className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className={txt} style={{ fontWeight: 600 }}>Crop Health Scanner</h3>
                      <p className={`text-xs ${txtMuted}`}>AI-powered disease & pest detection</p>
                    </div>
                  </div>
                  {!scanFile && !scanResult && (
                    <div className="border-2 border-dashed border-purple-200 dark:border-purple-800 rounded-xl p-8 text-center cursor-pointer hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all" onClick={() => setScanFile('tomato-sample.jpg')}>
                      <Upload className="w-10 h-10 text-purple-400 mx-auto mb-3" />
                      <p className={`text-sm ${txt} mb-1`}>Upload crop photo to scan</p>
                      <p className={`text-xs ${txtMuted}`}>JPG, PNG up to 10MB</p>
                      <div className="mt-3 text-xs text-purple-600 font-semibold">Click to simulate upload</div>
                    </div>
                  )}
                  {scanFile && !scanResult && (
                    <div className="text-center py-6">
                      <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                        {scanning ? <div className="w-8 h-8 border-purple-600 border-t-transparent rounded-full animate-spin" style={{ borderWidth: 3 }} /> : <Camera className="w-8 h-8 text-purple-600" />}
                      </div>
                      <p className={`text-sm ${txt} mb-1`}>{scanning ? 'Analyzing crop image...' : 'tomato-sample.jpg uploaded'}</p>
                      <p className={`text-xs ${txtMuted} mb-4`}>{scanning ? 'AI detecting diseases...' : 'Ready to scan'}</p>
                      {!scanning && <button onClick={handleScan} className="bg-purple-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-purple-700">Start Analysis</button>}
                    </div>
                  )}
                  {scanResult && (
                    <div>
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl p-4 mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle className="w-5 h-5 text-red-500" />
                          <span className="text-sm font-semibold text-red-700 dark:text-red-400">Disease Detected</span>
                          <span className="text-xs bg-red-100 dark:bg-red-900/40 text-red-600 px-2 py-0.5 rounded-full">{scanResult.confidence}% confidence</span>
                        </div>
                        <p className="text-sm text-red-800 dark:text-red-300 font-semibold mb-2">{scanResult.disease}</p>
                        <p className={`text-sm ${txt}`}>{scanResult.treatment}</p>
                      </div>
                      <button onClick={() => { setScanFile(null); setScanResult(null); }} className={`w-full border dark:border-gray-600 ${txt} py-2.5 rounded-xl text-sm hover:bg-gray-50 dark:hover:bg-gray-700`}>Scan Another Crop</button>
                    </div>
                  )}
                </div>

                {/* Dynamic Pricing */}
                <div className={`${card} p-6`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className={txt} style={{ fontWeight: 600 }}>Dynamic Pricing AI</h3>
                      <p className={`text-xs ${txtMuted}`}>Market-driven recommendations</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      { crop: '🍅 Tomatoes', current: 350, recommended: 380, demand: 'High' },
                      { crop: '🥬 Spinach', current: 250, recommended: 235, demand: 'Low' },
                      { crop: '🍌 Bananas', current: 180, recommended: 195, demand: 'High' },
                      { crop: '🫑 Red Peppers', current: 420, recommended: 400, demand: 'Normal' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 rounded-xl px-4 py-3">
                        <div>
                          <span className={`text-sm ${txt}`} style={{ fontWeight: 500 }}>{item.crop}</span>
                          <div className={`text-xs ${txtMuted}`}>Your price: ₦{item.current}/kg</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-blue-700 dark:text-blue-400" style={{ fontWeight: 700 }}>₦{item.recommended}/kg</div>
                          <div className={`text-xs ${item.demand === 'High' ? 'text-green-600' : item.demand === 'Low' ? 'text-red-500' : txtMuted}`}>{item.demand} demand</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="mt-4 w-full bg-blue-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700">Apply Recommended Prices</button>
                </div>

                {/* Spoilage Alerts */}
                <div className={`${card} p-6`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className={txt} style={{ fontWeight: 600 }}>Spoilage Risk Alerts</h3>
                      <p className={`text-xs ${txtMuted}`}>IoT sensor predictions</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: 'Spinach (200kg)', days: 2, action: 'List at discount now', level: 'critical' },
                      { name: 'Bananas (300kg)', days: 3, action: 'Prioritize in next order', level: 'warning' },
                      { name: 'Tomatoes (500kg)', days: 5, action: 'Normal priority', level: 'ok' },
                    ].map((item, i) => (
                      <div key={i} className={`border rounded-xl p-4 ${item.level === 'critical' ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20' : item.level === 'warning' ? 'border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20' : 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'}`}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-sm ${txt}`} style={{ fontWeight: 600 }}>{item.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${item.level === 'critical' ? 'bg-red-100 text-red-700 dark:bg-red-900/40' : item.level === 'warning' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/40' : 'bg-green-100 text-green-700 dark:bg-green-900/40'}`}>{item.days} days left</span>
                        </div>
                        <p className={`text-xs ${txtMuted}`}>{item.action}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Farming Chatbot */}
                <div className={`${card} p-6 flex flex-col`} style={{ height: 400 }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className={txt} style={{ fontWeight: 600 }}>AI Farming Assistant</h3>
                        <div className="flex items-center gap-1 text-xs text-green-500">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Online
                        </div>
                      </div>
                    </div>
                    <select value={chatLang} onChange={e => setChatLang(e.target.value)} className={`text-xs border dark:border-gray-600 rounded-lg px-2 py-1 ${txt} bg-white dark:bg-gray-700`}>
                      {['English', 'Yoruba', 'Hausa', 'Igbo', 'Pidgin'].map(l => <option key={l}>{l}</option>)}
                    </select>
                  </div>
                  <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-1">
                    {messages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${msg.role === 'user' ? 'bg-green-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}>{msg.text}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder="Ask a farming question..." className={`flex-1 border dark:border-gray-600 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500 bg-white dark:bg-gray-700 ${txt}`} />
                    <button onClick={sendMessage} className="bg-green-600 text-white p-2.5 rounded-xl hover:bg-green-700 transition-all"><Send className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FINANCIAL PASSPORT TAB */}
          {activeTab === 'passport' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-green-800 to-green-700 text-white rounded-2xl p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="text-green-300 text-sm mb-1">Financial Passport Score</div>
                    <div className="flex items-end gap-3 mb-4">
                      <span style={{ fontWeight: 800, fontSize: '4rem', lineHeight: 1 }}>742</span>
                      <span className="text-green-300 text-xl mb-2">/ 850</span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="px-3 py-1 bg-green-500 rounded-full text-sm font-semibold">Good Standing</div>
                      <ArrowUpRight className="w-4 h-4 text-green-300" />
                      <span className="text-green-300 text-sm">+28 pts this month</span>
                    </div>
                    <p className="text-green-200 text-sm leading-relaxed">Your score qualifies you for microloans up to ₦500,000 from our partner lenders.</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="relative w-40 h-40">
                      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#4ade80" strokeWidth="10" strokeDasharray={`${(742 / 850) * 251.2} 251.2`} strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 mb-1" />
                        <span className="text-white text-xs">87th percentile</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${card} p-6`}>
                <h3 className={`mb-5 ${txt}`} style={{ fontWeight: 600 }}>Score Breakdown</h3>
                <div className="space-y-4">
                  {[
                    { factor: 'Sales Consistency', score: 185, max: 200, color: 'bg-green-500' },
                    { factor: 'Payment History', score: 168, max: 200, color: 'bg-blue-500' },
                    { factor: 'Platform Activity', score: 145, max: 200, color: 'bg-purple-500' },
                    { factor: 'Product Quality Score', score: 142, max: 200, color: 'bg-orange-500' },
                    { factor: 'ID Verification Status', score: 102, max: 50, color: 'bg-teal-500' },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className={txt}>{item.factor}</span>
                        <span className={txt} style={{ fontWeight: 600 }}>{item.score}/{item.max}</span>
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${item.color}`} style={{ width: `${(item.score / item.max) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { lender: 'FreshChain MicroCredit', amount: '₦100,000', rate: '8%/yr', term: '6 months', eligible: true },
                  { lender: 'Lagos State Agri Fund', amount: '₦250,000', rate: '12%/yr', term: '12 months', eligible: true },
                  { lender: 'NIRSAL MFB', amount: '₦500,000', rate: '15%/yr', term: '24 months', eligible: false },
                ].map((loan, i) => (
                  <div key={i} className={`${card} p-5 ${loan.eligible ? 'border-green-200 dark:border-green-800' : ''}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`text-sm ${txtMuted}`}>{loan.lender}</div>
                      <div className={`text-xs px-2 py-0.5 rounded-full ${loan.eligible ? 'bg-green-50 text-green-700 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}>{loan.eligible ? 'Eligible' : 'Score: 780+'}</div>
                    </div>
                    <div className={`text-2xl ${txt} mb-1`} style={{ fontWeight: 800 }}>{loan.amount}</div>
                    <div className={`text-xs ${txtMuted} mb-4`}>{loan.rate} • {loan.term}</div>
                    <button disabled={!loan.eligible} className={`w-full py-2 rounded-xl text-sm font-semibold transition-all ${loan.eligible ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'}`}>
                      {loan.eligible ? 'Apply Now' : 'Requires Score 780+'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* WALLET TAB */}
          {activeTab === 'wallet' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-700 to-green-600 text-white rounded-2xl p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div>
                    <div className="text-green-300 text-sm mb-1">Available Balance</div>
                    <div className="mb-4" style={{ fontWeight: 800, fontSize: '3rem', lineHeight: 1 }}>₦127,450</div>
                    <div className="flex gap-3">
                      <button className="bg-white text-green-700 px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-50">Withdraw</button>
                      <button className="border border-white/40 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-white/10">Add Money</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="text-green-300 text-xs mb-1">Month In</div>
                      <div style={{ fontWeight: 700, fontSize: '1.25rem' }}>₦198,300</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="text-green-300 text-xs mb-1">Month Out</div>
                      <div style={{ fontWeight: 700, fontSize: '1.25rem' }}>₦70,850</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${card} p-6`}>
                <h3 className={`mb-5 ${txt}`} style={{ fontWeight: 600 }}>Revenue History (₦)</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#f0f0f0'} vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: isDark ? '#9ca3af' : '#6b7280' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: isDark ? '#9ca3af' : '#6b7280' }} axisLine={false} tickLine={false} tickFormatter={v => `₦${(v / 1000).toFixed(0)}k`} />
                    <Tooltip contentStyle={{ background: isDark ? '#1f2937' : '#fff', border: 'none', borderRadius: 8 }} formatter={(v: number) => [`₦${v.toLocaleString()}`, 'Revenue']} />
                    <Bar dataKey="revenue" fill="#16a34a" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className={`${card} p-6`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={txt} style={{ fontWeight: 600 }}>Recent Transactions</h3>
                  <button className="text-sm text-green-600 hover:text-green-700">Download CSV</button>
                </div>
                <div className="space-y-3">
                  {transactions.map((txn, i) => (
                    <div key={i} className={`flex items-center justify-between py-3 border-b dark:border-gray-700 last:border-0`}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-50 dark:bg-gray-700 rounded-xl flex items-center justify-center text-xl">{txn.icon}</div>
                        <div>
                          <div className={`text-sm ${txt}`} style={{ fontWeight: 500 }}>{txn.desc}</div>
                          <div className={`text-xs ${txtMuted}`}>{txn.time}</div>
                        </div>
                      </div>
                      <div className={`text-sm ${txn.type === 'credit' ? 'text-green-600' : 'text-red-500'}`} style={{ fontWeight: 700 }}>
                        {txn.type === 'credit' ? '+' : '-'}₦{txn.amount.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* EDUCATION TAB */}
          {activeTab === 'education' && (
            <div className="space-y-6">
              <p className={`text-sm ${txtMuted}`}>Learn modern farming techniques in your language</p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: 'Soil Health Fundamentals', duration: '15 min', level: 'Beginner', lang: 'English', category: 'Soil' },
                  { title: 'Pest Management Without Chemicals', duration: '22 min', level: 'Intermediate', lang: 'Yoruba', category: 'Pest Control' },
                  { title: 'Post-Harvest Storage Techniques', duration: '18 min', level: 'Beginner', lang: 'Hausa', category: 'Storage' },
                  { title: 'Understanding Market Prices', duration: '12 min', level: 'All Levels', lang: 'Pidgin English', category: 'Business' },
                  { title: 'Water Conservation for Small Farms', duration: '25 min', level: 'Intermediate', lang: 'Igbo', category: 'Irrigation' },
                  { title: 'FreshChain Financial Tools', duration: '10 min', level: 'All Levels', lang: 'English', category: 'Finance' },
                ].map((lesson, i) => (
                  <div key={i} className={`${card} p-5 hover:border-green-200 dark:hover:border-green-800 hover:shadow-sm transition-all cursor-pointer`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="px-2 py-0.5 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full border border-green-100 dark:border-green-800">{lesson.category}</div>
                      <div className={`text-xs ${txtMuted}`}>{lesson.duration}</div>
                    </div>
                    <h4 className={`mb-2 ${txt}`} style={{ fontWeight: 600, fontSize: '0.9rem' }}>{lesson.title}</h4>
                    <div className="flex items-center justify-between">
                      <div className={`flex items-center gap-2 text-xs ${txtMuted}`}>
                        <span className={`px-2 py-0.5 bg-gray-50 dark:bg-gray-700 rounded-full`}>{lesson.level}</span>
                        <Globe className="w-3 h-3" />
                        <span>{lesson.lang}</span>
                      </div>
                      <button className="flex items-center gap-1 text-xs text-green-700 dark:text-green-400 font-semibold hover:text-green-800">
                        Start <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/40 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-amber-700 dark:text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`mb-1 ${txt}`} style={{ fontWeight: 600 }}>Village Agro Agent — Ogun State</h3>
                    <p className={`text-sm ${txtMuted} mb-4`}>Your local FreshChain representative is available to help with registration, produce listing, and training.</p>
                    <div className="flex gap-3">
                      <button className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-amber-700">
                        <Phone className="w-4 h-4" /> Call Agent
                      </button>
                      <button className="flex items-center gap-2 border border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-400 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-amber-100 dark:hover:bg-amber-900/30">
                        <MessageSquare className="w-4 h-4" /> WhatsApp
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex z-40">
        {navItems.slice(0, 5).map(item => (
          <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs transition-colors ${activeTab === item.id ? 'text-green-700' : 'text-gray-400'}`}>
            <item.icon className="w-5 h-5" />
            <span>{item.label === 'Financial Passport' ? 'Passport' : item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
