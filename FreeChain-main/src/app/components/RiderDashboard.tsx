import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  TruckIcon, MapPin, Bell, User, Star, Home, Wallet, BarChart3,
  Settings, LogOut, CheckCircle2, Clock, Navigation, Package, Zap,
  Phone, MessageSquare, ArrowUpRight, Award, ChevronRight, AlertCircle,
  Sun, Moon
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import { useTheme } from '../context/ThemeContext';

type Tab = 'overview' | 'deliveries' | 'earnings' | 'route';

const weeklyEarnings = [
  { day: 'Mon', earned: 6200, deliveries: 5 },
  { day: 'Tue', earned: 8900, deliveries: 7 },
  { day: 'Wed', earned: 5400, deliveries: 4 },
  { day: 'Thu', earned: 11200, deliveries: 9 },
  { day: 'Fri', earned: 9800, deliveries: 8 },
  { day: 'Sat', earned: 14500, deliveries: 11 },
  { day: 'Sun', earned: 8400, deliveries: 7 },
];

const pendingDeliveries = [
  { id: '#4522', customer: 'Mr. Okonkwo', address: '14 Admiralty Way, Lekki', items: 5, weight: '12kg', earnings: 1800, distance: '8.2km', time: '25 min', priority: 'normal' },
  { id: '#4523', customer: "Chef Maria's Kitchen", address: 'Victoria Island, Lagos', items: 8, weight: '22kg', earnings: 2500, distance: '15.4km', time: '40 min', priority: 'high' },
  { id: '#4524', customer: 'Mrs. Balogun', address: 'Surulere, Lagos', items: 3, weight: '7kg', earnings: 1200, distance: '6.1km', time: '20 min', priority: 'normal' },
  { id: '#4525', customer: 'FoodCo Restaurant', address: 'Yaba, Lagos', items: 15, weight: '45kg', earnings: 4500, distance: '11.3km', time: '35 min', priority: 'urgent' },
];

const completedToday = [
  { id: '#4521', customer: 'Mrs. Adeyemi', earnings: 1200, time: '10:15 AM', rating: 5 },
  { id: '#4517', customer: "Kemi's Bistro", earnings: 3200, time: '8:30 AM', rating: 5 },
  { id: '#4513', customer: 'Mr. Taiwo', earnings: 900, time: '7:00 AM', rating: 4 },
];

const routeStops = [
  { order: '#4522', customer: 'Mr. Okonkwo', address: 'Lekki', time: '12:30 PM', status: 'Next' },
  { order: '#4524', customer: 'Mrs. Balogun', address: 'Surulere', time: '1:10 PM', status: 'Queued' },
  { order: '#4523', customer: 'Chef Maria', address: 'Victoria Island', time: '1:45 PM', status: 'Queued' },
  { order: '#4525', customer: 'FoodCo', address: 'Yaba', time: '2:20 PM', status: 'Queued' },
];

export function RiderDashboard() {
  const navigate = useNavigate();
  const { isDark, toggleDark } = useTheme();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [activeDelivery, setActiveDelivery] = useState(true);
  const [acceptedOrders, setAcceptedOrders] = useState<string[]>([]);
  const [isOnline, setIsOnline] = useState(true);

  const navItems: { id: Tab; label: string; icon: typeof Home }[] = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'deliveries', label: 'Deliveries', icon: Package },
    { id: 'route', label: 'Route AI', icon: Navigation },
    { id: 'earnings', label: 'Earnings', icon: Wallet },
  ];

  const totalEarnings = weeklyEarnings.reduce((s, d) => s + d.earned, 0);
  const card = `bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl`;
  const txt = `text-gray-900 dark:text-white`;
  const txtMuted = `text-gray-500 dark:text-gray-400`;

  return (
    <div className="min-h-screen bg-[#F7F8F5] dark:bg-gray-950 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-60 bg-orange-700 dark:bg-gray-900 text-white flex-col fixed h-full z-40 border-r border-orange-600 dark:border-gray-800">
        <div className="p-5 border-b border-orange-600 dark:border-gray-800 cursor-pointer" onClick={() => navigate('/')}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-orange-500 dark:bg-orange-600 rounded-lg flex items-center justify-center">
              <TruckIcon className="w-4 h-4 text-white" />
            </div>
            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>FreshChain</span>
          </div>
          <div className="text-xs text-orange-300 mt-1 ml-10">Rider Portal</div>
        </div>

        <div className="flex items-center gap-3 p-5 border-b border-orange-600 dark:border-gray-800">
          <div className="w-10 h-10 bg-orange-500 dark:bg-orange-600 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>Ibrahim Suleiman</div>
            <div className="text-xs text-orange-300">Motorcycle • Lagos</div>
          </div>
          <button onClick={() => setIsOnline(!isOnline)} className={`w-12 h-6 rounded-full relative transition-all flex-shrink-0 ${isOnline ? 'bg-green-400' : 'bg-orange-500 dark:bg-gray-700'}`}>
            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${isOnline ? 'left-6' : 'left-0.5'}`} />
          </button>
        </div>

        <div className={`mx-4 mt-3 px-3 py-2 rounded-lg text-xs text-center ${isOnline ? 'bg-green-500/20 text-green-300' : 'bg-orange-600/50 dark:bg-gray-800 text-orange-300 dark:text-gray-400'}`}>
          {isOnline ? '🟢 Online — Accepting Orders' : '⚫ Offline — Not Available'}
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto mt-2">
          {navItems.map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${activeTab === item.id ? 'bg-orange-500 dark:bg-orange-600 text-white shadow-lg' : 'text-orange-200 dark:text-gray-300 hover:bg-orange-600 dark:hover:bg-gray-800 hover:text-white'}`}>
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 space-y-1 border-t border-orange-600 dark:border-gray-800">
          <button onClick={() => navigate('/rider/profile')} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-orange-200 dark:text-gray-400 hover:bg-orange-600 dark:hover:bg-gray-800 hover:text-white transition-all">
            <Settings className="w-4 h-4" /> Profile & Settings
          </button>
          <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-orange-300 dark:text-gray-400 hover:bg-orange-600 dark:hover:bg-gray-800 hover:text-white transition-all">
            <LogOut className="w-4 h-4" /> Back to Home
          </button>
        </div>
      </aside>

      <main className="flex-1 md:ml-60">
        <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className={txt} style={{ fontWeight: 700, fontSize: '1.25rem' }}>{navItems.find(n => n.id === activeTab)?.label}</h1>
            <p className={`text-xs ${txtMuted}`}>Sunday, 14 June 2026 · Lagos, Nigeria</p>
          </div>
          <div className="flex items-center gap-3">
            <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm border ${isOnline ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-100 dark:border-green-800' : 'bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-700'}`}>
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
              {isOnline ? 'Online' : 'Offline'}
            </div>
            <button onClick={toggleDark} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all" title="Toggle dark mode">
              {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-500" />}
            </button>
            <button className="relative p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button onClick={() => navigate('/rider/profile')} className="w-9 h-9 bg-orange-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </button>
          </div>
        </header>

        <div className="p-6">
          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Today's Earnings", value: '₦8,400', sub: '7 deliveries', color: 'text-orange-600', up: true },
                  { label: 'Pending Orders', value: '4', sub: '1 urgent', color: txt, up: false },
                  { label: 'Rating', value: '4.9★', sub: '284 reviews', color: 'text-yellow-600', up: true },
                  { label: 'Weekly Total', value: '₦64,400', sub: '+18% vs last wk', color: 'text-green-600', up: true },
                ].map((stat, i) => (
                  <div key={i} className={`${card} p-5`}>
                    <div className={`text-xs ${txtMuted} mb-2`}>{stat.label}</div>
                    <div className={`text-2xl mb-1.5 ${stat.color}`} style={{ fontWeight: 800 }}>{stat.value}</div>
                    <div className={`text-xs ${stat.up ? 'text-green-600' : 'text-orange-500'}`}>{stat.up ? '↑' : '!'} {stat.sub}</div>
                  </div>
                ))}
              </div>

              {activeDelivery && (
                <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                      <span style={{ fontWeight: 700 }}>Active Delivery</span>
                    </div>
                    <div className="bg-orange-400/50 px-3 py-1 rounded-full text-sm">In Transit</div>
                  </div>
                  <div className="bg-white/10 border border-white/20 rounded-xl p-5 mb-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-orange-200 text-xs mb-1">Order</div>
                        <div style={{ fontWeight: 700, fontSize: '1.25rem' }}>#4521</div>
                        <div className="text-orange-100 text-sm">Mrs. Adeyemi</div>
                      </div>
                      <div>
                        <div className="text-orange-200 text-xs mb-1">Destination</div>
                        <div className="flex items-start gap-1 mt-1"><MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" /><span className="text-sm">14 Allen Avenue, Ikeja, Lagos</span></div>
                      </div>
                      <div>
                        <div className="text-orange-200 text-xs mb-1">ETA</div>
                        <div style={{ fontWeight: 700, fontSize: '1.5rem' }}>8 min</div>
                        <div className="text-orange-200 text-xs">1.4km remaining</div>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="bg-white/10 rounded-lg p-3"><div className="text-orange-200 text-xs mb-0.5">Contents</div><div className="text-sm">3 items • 8.5kg</div></div>
                      <div className="bg-white/10 rounded-lg p-3"><div className="text-orange-200 text-xs mb-0.5">Earnings</div><div className="text-sm" style={{ fontWeight: 700 }}>₦1,200</div></div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 bg-white text-orange-700 py-3 rounded-xl font-semibold hover:bg-orange-50 text-sm"><Navigation className="w-4 h-4" /> View Route</button>
                    <button className="flex items-center justify-center gap-2 bg-white text-orange-600 py-3 px-4 rounded-xl hover:bg-orange-50"><Phone className="w-4 h-4" /></button>
                    <button className="flex items-center justify-center gap-2 bg-white text-orange-600 py-3 px-4 rounded-xl hover:bg-orange-50"><MessageSquare className="w-4 h-4" /></button>
                    <button onClick={() => setActiveDelivery(false)} className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 text-sm"><CheckCircle2 className="w-4 h-4" /> Mark Delivered</button>
                  </div>
                </div>
              )}

              <div className={`${card} p-6`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={txt} style={{ fontWeight: 600 }}>Next in Queue</h3>
                  <button onClick={() => setActiveTab('deliveries')} className="text-sm text-orange-600 hover:text-orange-700 flex items-center gap-1">View all <ChevronRight className="w-3.5 h-3.5" /></button>
                </div>
                <div className="space-y-3">
                  {pendingDeliveries.slice(0, 2).map(del => (
                    <div key={del.id} className={`border dark:border-gray-700 rounded-xl p-4 ${del.priority === 'urgent' ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10' : del.priority === 'high' ? 'border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/10' : 'dark:bg-gray-700/30'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={txt} style={{ fontWeight: 600, fontSize: '0.9rem' }}>{del.id}</span>
                          {del.priority === 'urgent' && <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">Urgent</span>}
                          {del.priority === 'high' && <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full">Priority</span>}
                        </div>
                        <span className="text-green-700 dark:text-green-400 text-sm" style={{ fontWeight: 700 }}>₦{del.earnings.toLocaleString()}</span>
                      </div>
                      <div className={`text-sm ${txt}`}>{del.customer}</div>
                      <div className={`flex items-center gap-3 text-xs ${txtMuted} mt-1`}>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{del.distance}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{del.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`${card} p-6`}>
                <h3 className={`mb-4 ${txt}`} style={{ fontWeight: 600 }}>Completed Today</h3>
                <div className="space-y-3">
                  {completedToday.map((d, i) => (
                    <div key={i} className={`flex items-center justify-between py-2 border-b dark:border-gray-700 last:border-0`}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-50 dark:bg-green-900/30 rounded-lg flex items-center justify-center"><CheckCircle2 className="w-4 h-4 text-green-600" /></div>
                        <div>
                          <div className={`text-sm ${txt}`} style={{ fontWeight: 500 }}>{d.customer}</div>
                          <div className={`text-xs ${txtMuted}`}>{d.id} • {d.time}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-green-600" style={{ fontWeight: 700 }}>+₦{d.earnings.toLocaleString()}</div>
                        <div className="flex items-center gap-0.5 justify-end">{[...Array(d.rating)].map((_, j) => <Star key={j} className="w-3 h-3 text-yellow-400 fill-yellow-400" />)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* DELIVERIES */}
          {activeTab === 'deliveries' && (
            <div className="space-y-6">
              <p className={`text-sm ${txtMuted}`}>{pendingDeliveries.length} orders waiting for acceptance</p>
              <div className="space-y-4">
                {pendingDeliveries.map(del => (
                  <div key={del.id} className={`${card} overflow-hidden ${del.priority === 'urgent' ? 'border-red-200 dark:border-red-800' : del.priority === 'high' ? 'border-orange-200 dark:border-orange-800' : ''} hover:shadow-md transition-all`}>
                    <div className={`px-4 py-2 flex items-center justify-between text-xs ${del.priority === 'urgent' ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400' : del.priority === 'high' ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400' : 'bg-gray-50 dark:bg-gray-700/50 text-gray-500'}`}>
                      <span>{del.priority === 'urgent' ? '🔴 Urgent' : del.priority === 'high' ? '🟠 High Priority' : '🟢 Standard'}</span>
                      <span style={{ fontWeight: 600 }}>{del.distance} away</span>
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className={`flex items-center gap-2 mb-0.5`}>
                            <span className={txt} style={{ fontWeight: 700, fontSize: '1rem' }}>{del.id}</span>
                            <span className={txtMuted}>•</span>
                            <span className={`text-sm ${txt}`}>{del.customer}</span>
                          </div>
                          <div className={`flex items-center gap-1.5 text-sm ${txtMuted}`}><MapPin className="w-3.5 h-3.5" />{del.address}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-green-700 dark:text-green-400" style={{ fontWeight: 800, fontSize: '1.25rem' }}>₦{del.earnings.toLocaleString()}</div>
                          <div className={`text-xs ${txtMuted}`}>Est. earnings</div>
                        </div>
                      </div>
                      <div className={`flex items-center gap-4 text-xs ${txtMuted} mb-4`}>
                        <span className="flex items-center gap-1"><Package className="w-3.5 h-3.5" />{del.items} items, {del.weight}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />~{del.time}</span>
                        <span className="flex items-center gap-1"><Navigation className="w-3.5 h-3.5" />{del.distance}</span>
                      </div>
                      {acceptedOrders.includes(del.id) ? (
                        <div className="flex items-center gap-2 text-green-700 dark:text-green-400 text-sm font-semibold"><CheckCircle2 className="w-4 h-4" /> Accepted — navigate to pickup</div>
                      ) : (
                        <button onClick={() => setAcceptedOrders(prev => [...prev, del.id])} className={`w-full py-3 rounded-xl text-sm font-semibold transition-all bg-orange-600 hover:bg-orange-700 text-white`}>Accept Delivery</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ROUTE AI */}
          {activeTab === 'route' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-purple-700 to-purple-600 text-white rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"><Zap className="w-5 h-5 text-white" /></div>
                  <div>
                    <h3 style={{ fontWeight: 700 }}>AI Route Optimizer</h3>
                    <p className="text-purple-200 text-sm">4 pending deliveries analyzed</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4 mb-5">
                  {[
                    { label: 'Optimized Distance', value: '41.0km', note: '↓ 12.4km saved' },
                    { label: 'Time Saved', value: '47 min', note: 'vs unoptimized' },
                    { label: 'Fuel Saved', value: '₦960', note: 'Estimated savings' },
                  ].map((s, i) => (
                    <div key={i} className="bg-white/10 rounded-xl p-4">
                      <div className="text-purple-200 text-xs mb-1">{s.label}</div>
                      <div style={{ fontWeight: 700, fontSize: '1.5rem' }}>{s.value}</div>
                      <div className="text-green-300 text-xs">{s.note}</div>
                    </div>
                  ))}
                </div>
                <button className="w-full bg-white text-purple-700 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-all flex items-center justify-center gap-2"><Navigation className="w-4 h-4" /> Start Optimized Route</button>
              </div>

              <div className={`${card} overflow-hidden`}>
                <div className={`bg-gradient-to-br from-green-100 via-blue-50 to-gray-100 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 h-56 flex items-center justify-center relative`}>
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-orange-500 mx-auto mb-2" />
                    <p className={`${txtMuted} text-sm`}>Interactive route map</p>
                  </div>
                  {[{ top: '20%', left: '30%', label: '1' }, { top: '55%', left: '60%', label: '2' }, { top: '70%', left: '25%', label: '3' }, { top: '35%', left: '75%', label: '4' }].map((pin, i) => (
                    <div key={i} className="absolute" style={{ top: pin.top, left: pin.left }}>
                      <div className="w-7 h-7 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg">{pin.label}</div>
                    </div>
                  ))}
                  <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 text-xs text-gray-600 dark:text-gray-300 shadow-md">📍 Your location: Ikeja, Lagos</div>
                </div>
              </div>

              <div className={`${card} p-6`}>
                <h3 className={`mb-5 ${txt}`} style={{ fontWeight: 600 }}>Optimized Stop Order</h3>
                <div className="relative">
                  <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-gray-100 dark:bg-gray-700" />
                  <div className="space-y-4">
                    {routeStops.map((stop, i) => (
                      <div key={i} className="flex items-start gap-4 pl-1 relative">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${stop.status === 'Next' ? 'bg-orange-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`} style={{ fontWeight: 700 }}>{i + 1}</div>
                        <div className={`flex-1 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4`}>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className={`text-sm ${txt}`} style={{ fontWeight: 600 }}>{stop.order} — {stop.customer}</div>
                              <div className={`flex items-center gap-1 text-xs ${txtMuted} mt-0.5`}><MapPin className="w-3 h-3" /> {stop.address}</div>
                            </div>
                            <div className="text-right">
                              <div className={`text-xs px-2 py-0.5 rounded-full ${stop.status === 'Next' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400' : 'bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400'}`}>{stop.status}</div>
                              <div className={`text-xs ${txtMuted} mt-1`}>{stop.time}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  <h3 className={txt} style={{ fontWeight: 600 }}>Traffic Alerts</h3>
                </div>
                <div className="space-y-2">
                  {[
                    { road: 'Ikorodu Road', status: 'Heavy traffic', alt: 'Rerouted via Owode-Onirin' },
                    { road: 'Third Mainland Bridge', status: 'Light traffic', alt: 'Recommended route' },
                  ].map((alert, i) => (
                    <div key={i} className={`flex items-start gap-3 text-sm`}>
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${alert.status.includes('Heavy') ? 'bg-red-500' : 'bg-green-500'}`} />
                      <div><span className={txt} style={{ fontWeight: 600 }}>{alert.road}</span><span className={txtMuted}> — {alert.status}. {alert.alt}</span></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* EARNINGS */}
          {activeTab === 'earnings' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-2xl p-8">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                  <div>
                    <div className="text-orange-200 text-sm mb-1">Total This Week</div>
                    <div style={{ fontWeight: 800, fontSize: '3rem', lineHeight: 1 }}>₦{totalEarnings.toLocaleString()}</div>
                    <div className="flex items-center gap-2 mt-2"><ArrowUpRight className="w-4 h-4 text-green-300" /><span className="text-green-300 text-sm">+18% vs last week</span></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/10 rounded-xl p-4"><div className="text-orange-200 text-xs mb-1">Total Deliveries</div><div style={{ fontWeight: 700, fontSize: '1.5rem' }}>51</div></div>
                    <div className="bg-white/10 rounded-xl p-4"><div className="text-orange-200 text-xs mb-1">Avg per Delivery</div><div style={{ fontWeight: 700, fontSize: '1.5rem' }}>₦1,263</div></div>
                  </div>
                </div>
                <div className="flex gap-3 mt-5">
                  <button className="bg-white text-orange-700 px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-orange-50">Withdraw to Bank</button>
                  <button className="border border-white/40 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-white/10">Download Statement</button>
                </div>
              </div>

              <div className={`${card} p-6`}>
                <div className="flex items-center justify-between mb-5">
                  <h3 className={txt} style={{ fontWeight: 600 }}>Daily Earnings (₦)</h3>
                  <span className={`text-xs ${txtMuted}`}>This week</span>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={weeklyEarnings}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#f0f0f0'} vertical={false} />
                    <XAxis dataKey="day" tick={{ fontSize: 11, fill: isDark ? '#9ca3af' : '#6b7280' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: isDark ? '#9ca3af' : '#6b7280' }} axisLine={false} tickLine={false} tickFormatter={v => `₦${(v / 1000).toFixed(0)}k`} />
                    <Tooltip contentStyle={{ background: isDark ? '#1f2937' : '#fff', border: 'none', borderRadius: 8 }} formatter={(v: number) => [`₦${v.toLocaleString()}`, 'Earned']} />
                    <Bar dataKey="earned" fill="#ea580c" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className={`${card} p-6`}>
                <h3 className={`mb-5 ${txt}`} style={{ fontWeight: 600 }}>Performance & Badges</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: '🏆', title: 'Top Rider', desc: 'Top 5% in Lagos', earned: true },
                    { icon: '⚡', title: 'Speed King', desc: '< 30min avg delivery', earned: true },
                    { icon: '⭐', title: '5-Star Service', desc: '50+ perfect ratings', earned: true },
                    { icon: '🌱', title: 'Eco Rider', desc: '100+ waste-saving deliveries', earned: false },
                  ].map((badge, i) => (
                    <div key={i} className={`rounded-xl p-4 text-center border ${badge.earned ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800' : 'bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700 opacity-60'}`}>
                      <div className="text-3xl mb-2">{badge.icon}</div>
                      <div className={`text-sm ${txt}`} style={{ fontWeight: 600 }}>{badge.title}</div>
                      <div className={`text-xs ${txtMuted} mt-0.5`}>{badge.desc}</div>
                      {badge.earned && <div className="text-xs text-orange-600 dark:text-orange-400 font-semibold mt-1.5">Earned ✓</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex z-40">
        {navItems.map(item => (
          <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs transition-colors ${activeTab === item.id ? 'text-orange-600' : 'text-gray-400'}`}>
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
