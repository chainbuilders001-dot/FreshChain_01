import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ShoppingBag, MapPin, Star, Heart, Bell, User, Search, X, Filter,
  Plus, Minus, ChevronRight, Package, Truck, Check, Leaf, Clock, Zap, Moon, Sun
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

type CartItem = { id: number; name: string; price: number; qty: number; unit: string; farmer: string; freshness: number; emoji: string };

const allProducts = [
  { id: 1, name: 'Fresh Tomatoes', farmer: 'Abuji Musa', state: 'Ogun', price: 350, unit: 'kg', freshness: 95, rating: 4.8, reviews: 214, emoji: '🍅', category: 'Vegetables', health: 'Rich in Vitamin C & lycopene. Supports heart health.' },
  { id: 2, name: 'Organic Spinach', farmer: 'Amina Ibrahim', state: 'Lagos', price: 250, unit: 'kg', freshness: 88, rating: 4.9, reviews: 156, emoji: '🥬', category: 'Vegetables', health: 'High in iron, folate & Vitamin K. Great for blood health.' },
  { id: 3, name: 'Sweet Bananas', farmer: 'John Eze', state: 'Enugu', price: 180, unit: 'kg', freshness: 92, rating: 4.7, reviews: 98, emoji: '🍌', category: 'Fruits', health: 'Excellent source of potassium. Natural energy booster.' },
  { id: 4, name: 'Watermelon', farmer: 'Fatima Hassan', state: 'Kano', price: 1200, unit: 'piece', freshness: 97, rating: 5.0, reviews: 45, emoji: '🍉', category: 'Fruits', health: '92% water content. Excellent for hydration & skin.' },
  { id: 5, name: 'Carrots', farmer: 'Chioma Okafor', state: 'Anambra', price: 320, unit: 'kg', freshness: 90, rating: 4.6, reviews: 78, emoji: '🥕', category: 'Vegetables', health: 'High in beta-carotene. Supports eye health & immunity.' },
  { id: 6, name: 'Bell Peppers', farmer: 'Yusuf Ahmed', state: 'Kaduna', price: 400, unit: 'kg', freshness: 93, rating: 4.8, reviews: 122, emoji: '🫑', category: 'Vegetables', health: 'Vitamin C content higher than oranges. Anti-inflammatory.' },
  { id: 7, name: 'Cassava Tubers', farmer: 'Blessing Nwosu', state: 'Imo', price: 280, unit: 'kg', freshness: 96, rating: 4.5, reviews: 67, emoji: '🌿', category: 'Tubers', health: 'Good source of carbohydrates and resistant starch.' },
  { id: 8, name: 'Sweet Potatoes', farmer: 'Musa Tanko', state: 'Benue', price: 350, unit: 'kg', freshness: 94, rating: 4.7, reviews: 89, emoji: '🍠', category: 'Tubers', health: 'Rich in beta-carotene and vitamin A. Diabetic-friendly.' },
  { id: 9, name: 'Fresh Garlic', farmer: 'Grace Obi', state: 'Plateau', price: 1800, unit: 'kg', freshness: 98, rating: 4.9, reviews: 201, emoji: '🧄', category: 'Spices', health: 'Powerful immune booster. Natural antibiotic properties.' },
];

const rescueDeals = [
  { id: 101, name: 'Ripe Bananas', original: 180, discounted: 108, discount: '40%', qty: '50kg left', emoji: '🍌', expires: '2 days' },
  { id: 102, name: 'Lettuce Bunch', original: 200, discounted: 140, discount: '30%', qty: '30kg left', emoji: '🥬', expires: '1 day' },
  { id: 103, name: 'Cherry Tomatoes', original: 420, discounted: 252, discount: '40%', qty: '20kg left', emoji: '🍅', expires: '3 days' },
];

const subscriptionBoxes = [
  { name: 'Family Fresh Box', price: 7500, frequency: 'Weekly', items: '8-10 items, 5kg+', desc: 'Mixed vegetables and fruits curated for a family of 4', tag: 'Most Popular' },
  { name: 'Health & Wellness Box', price: 9000, frequency: 'Weekly', items: '6-8 items, organic', desc: 'Certified organic produce tailored to your health goals', tag: 'Organic' },
  { name: "Chef's Picks Box", price: 12000, frequency: 'Bi-Weekly', items: '10-12 premium items', desc: 'Premium ingredients selected by partnered chefs', tag: 'Premium' },
];

export function ConsumerMarketplace() {
  const navigate = useNavigate();
  const { isDark, toggleDark } = useTheme();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [orderTracking, setOrderTracking] = useState(false);
  const [viewProduct, setViewProduct] = useState<typeof allProducts[0] | null>(null);

  const categories = ['All', 'Vegetables', 'Fruits', 'Tubers', 'Spices', 'Near Expiry'];
  const filteredProducts = allProducts.filter(p => {
    const matchesCat = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.farmer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const addToCart = (product: { id: number; name: string; price: number; unit: string; farmer: string; freshness: number; emoji: string }) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: i.qty + delta } : i).filter(i => i.qty > 0));
  };

  const card = `bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl`;
  const txt = `text-gray-900 dark:text-white`;
  const txtMuted = `text-gray-500 dark:text-gray-400`;

  return (
    <div className="min-h-screen bg-[#F7F8F5] dark:bg-gray-950">
      {/* Header */}
      <header className="bg-blue-700 dark:bg-blue-900 text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-8 h-8 bg-blue-600 dark:bg-blue-800 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-white" />
              </div>
              <span style={{ fontWeight: 700 }}>FreshChain Market</span>
            </div>
            <div className="hidden md:flex flex-1 max-w-md mx-6 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300" />
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search produce, farmers..." className="w-full bg-blue-600/50 dark:bg-blue-800/50 border border-blue-500 text-white placeholder-blue-300 pl-9 pr-4 py-2 rounded-xl text-sm focus:outline-none focus:bg-blue-600" />
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setOrderTracking(true)} className="hidden md:flex items-center gap-1.5 bg-blue-600 dark:bg-blue-800 px-3 py-2 rounded-lg text-sm hover:bg-blue-500 transition-all">
                <Package className="w-4 h-4" /> Track Order
              </button>
              <button onClick={toggleDark} className="p-2 hover:bg-blue-600 dark:hover:bg-blue-800 rounded-lg transition-all" title="Toggle dark mode">
                {isDark ? <Sun className="w-5 h-5 text-yellow-300" /> : <Moon className="w-5 h-5 text-blue-200" />}
              </button>
              <button onClick={() => setCartOpen(true)} className="relative p-2 hover:bg-blue-600 rounded-lg transition-all">
                <ShoppingBag className="w-6 h-6" />
                {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">{cartCount}</span>}
              </button>
              <button className="relative p-2 hover:bg-blue-600 rounded-lg"><Bell className="w-5 h-5" /></button>
              <button onClick={() => navigate('/consumer/profile')} className="w-9 h-9 bg-blue-500 dark:bg-blue-700 rounded-full flex items-center justify-center"><User className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="md:hidden mt-3 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300" />
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search produce, farmers..." className="w-full bg-blue-600/50 border border-blue-500 text-white placeholder-blue-300 pl-9 pr-4 py-2 rounded-xl text-sm focus:outline-none" />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Health Tip */}
        <div className={`${card} p-5 flex items-start gap-4 border-pink-100 dark:border-pink-900`}>
          <div className="w-10 h-10 bg-pink-50 dark:bg-pink-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
            <Heart className="w-5 h-5 text-pink-500" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-sm text-pink-600 dark:text-pink-400 font-semibold mb-1 block">Daily Wellness Tip</span>
              <span className={`text-xs ${txtMuted}`}>From FreshChain AI</span>
            </div>
            <p className={`text-sm ${txt} leading-relaxed`}>Include 5 different colored vegetables in today's meals. Each color provides unique phytonutrients that support different aspects of your health.</p>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2.5 overflow-x-auto pb-1">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full whitespace-nowrap text-sm transition-all border ${activeCategory === cat ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : `bg-white dark:bg-gray-800 ${txt} border-gray-200 dark:border-gray-700 hover:border-blue-300`}`}>
              {cat === 'Near Expiry' ? '⚡ ' + cat : cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {activeCategory !== 'Near Expiry' && (
          <>
            <div className="flex items-center justify-between">
              <h2 className={txt} style={{ fontWeight: 600, fontSize: '1.1rem' }}>{filteredProducts.length} Products {searchQuery && `for "${searchQuery}"`}</h2>
              <button className={`flex items-center gap-2 text-sm ${txtMuted} border dark:border-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800`}>
                <Filter className="w-4 h-4" /> Filter
              </button>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredProducts.map(product => (
                <div key={product.id} className={`${card} overflow-hidden hover:shadow-lg hover:border-blue-100 dark:hover:border-blue-900 transition-all group`}>
                  <div className="h-40 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center text-6xl cursor-pointer" onClick={() => setViewProduct(product)}>
                    {product.emoji}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className={txt} style={{ fontWeight: 600, fontSize: '0.9rem' }}>{product.name}</h3>
                      <div className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ml-1 ${product.freshness >= 90 ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30'}`}>{product.freshness}%</div>
                    </div>
                    <div className={`flex items-center gap-1 text-xs ${txtMuted} mb-2`}><MapPin className="w-3 h-3" /> {product.farmer}, {product.state}</div>
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      <span className={`text-xs ${txtMuted}`}>{product.rating} ({product.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-blue-700 dark:text-blue-400" style={{ fontWeight: 800, fontSize: '1.1rem' }}>₦{product.price}</span>
                        <span className={`text-xs ${txtMuted}`}>/{product.unit}</span>
                      </div>
                      <button onClick={() => addToCart(product)} className="bg-blue-600 text-white px-3 py-1.5 rounded-xl text-xs font-semibold hover:bg-blue-700 transition-all">Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Near Expiry */}
        {activeCategory === 'Near Expiry' && (
          <div>
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-2xl p-6 mb-5">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="w-6 h-6 text-orange-600" />
                <h2 className={txt} style={{ fontWeight: 700, fontSize: '1.1rem' }}>Rescue Food Marketplace</h2>
              </div>
              <p className={`text-sm ${txtMuted} leading-relaxed`}>These products are perfectly good but need to be sold quickly. Help reduce food waste and save up to 40%!</p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {rescueDeals.map(deal => (
                <div key={deal.id} className={`${card} overflow-hidden border-orange-200 dark:border-orange-800 hover:shadow-lg transition-all`}>
                  <div className="bg-orange-50 dark:bg-orange-900/20 h-36 flex items-center justify-center text-6xl relative">
                    {deal.emoji}
                    <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">{deal.discount} OFF</div>
                  </div>
                  <div className="p-4">
                    <h3 className={txt} style={{ fontWeight: 600 }}>{deal.name}</h3>
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-3.5 h-3.5 text-orange-500" />
                      <span className="text-xs text-orange-600 dark:text-orange-400 font-semibold">Expires in {deal.expires}</span>
                    </div>
                    <div className={`text-xs ${txtMuted} mb-3`}>{deal.qty}</div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-orange-600 dark:text-orange-400" style={{ fontWeight: 800, fontSize: '1.1rem' }}>₦{deal.discounted}/kg</span>
                        <span className={`text-xs ${txtMuted} line-through`}>₦{deal.original}</span>
                      </div>
                      <button onClick={() => addToCart({ id: deal.id, name: deal.name, price: deal.discounted, unit: 'kg', farmer: 'Multiple Farmers', freshness: 75, emoji: deal.emoji })} className="bg-orange-500 text-white px-3 py-1.5 rounded-xl text-xs font-semibold hover:bg-orange-600">Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Subscription Boxes */}
        <div className="bg-gradient-to-br from-green-700 to-green-600 rounded-2xl p-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Leaf className="w-6 h-6 text-green-300" />
            <h2 style={{ fontWeight: 700, fontSize: '1.25rem' }}>Weekly Fresh Box Subscriptions</h2>
          </div>
          <p className="text-green-200 text-sm mb-6">Curated fresh produce delivered to your door. Save 15% vs buying individual items.</p>
          <div className="grid md:grid-cols-3 gap-4">
            {subscriptionBoxes.map((box, i) => (
              <div key={i} className="bg-white/10 border border-white/20 rounded-2xl p-5 hover:bg-white/20 transition-all cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs bg-white/20 text-white px-2.5 py-0.5 rounded-full border border-white/20">{box.tag}</span>
                  <span className="text-xs text-green-300">{box.frequency}</span>
                </div>
                <h3 className="text-white mb-1" style={{ fontWeight: 700 }}>{box.name}</h3>
                <p className="text-green-200 text-xs mb-1">{box.items}</p>
                <p className="text-green-100 text-xs mb-4 leading-relaxed">{box.desc}</p>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-2xl text-white" style={{ fontWeight: 800 }}>₦{box.price.toLocaleString()}</span>
                    <span className="text-green-300 text-xs">/week</span>
                  </div>
                  <button className="bg-white text-green-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-green-50 transition-all">Subscribe</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      {viewProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setViewProduct(null)}>
          <div className={`${card} max-w-md w-full shadow-2xl`} onClick={e => e.stopPropagation()}>
            <div className="bg-gray-50 dark:bg-gray-700 h-48 flex items-center justify-center text-8xl rounded-t-2xl relative">
              {viewProduct.emoji}
              <button onClick={() => setViewProduct(null)} className="absolute top-4 right-4 w-8 h-8 bg-white dark:bg-gray-600 rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 dark:hover:bg-gray-500">
                <X className="w-4 h-4 text-gray-600 dark:text-gray-200" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className={txt} style={{ fontWeight: 700, fontSize: '1.25rem' }}>{viewProduct.name}</h3>
                <div className="text-xs bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full">{viewProduct.freshness}% fresh</div>
              </div>
              <div className={`flex items-center gap-1 text-sm ${txtMuted} mb-4`}><MapPin className="w-4 h-4" /> {viewProduct.farmer}, {viewProduct.state}</div>
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.floor(viewProduct.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />)}
                <span className={`text-sm ${txtMuted}`}>{viewProduct.rating} ({viewProduct.reviews} reviews)</span>
              </div>
              <div className="bg-pink-50 dark:bg-pink-900/20 border border-pink-100 dark:border-pink-800 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-4 h-4 text-pink-500" />
                  <span className="text-sm font-semibold text-pink-700 dark:text-pink-400">Health Benefits</span>
                </div>
                <p className={`text-sm ${txt}`}>{viewProduct.health}</p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-3xl text-blue-700 dark:text-blue-400" style={{ fontWeight: 800 }}>₦{viewProduct.price}</span>
                  <span className={`${txtMuted} text-sm`}>/{viewProduct.unit}</span>
                </div>
                <button onClick={() => { addToCart(viewProduct); setViewProduct(null); }} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/40" onClick={() => setCartOpen(false)} />
          <div className={`w-full max-w-sm bg-white dark:bg-gray-900 h-full flex flex-col shadow-2xl`}>
            <div className={`flex items-center justify-between p-5 border-b dark:border-gray-800`}>
              <h3 className={txt} style={{ fontWeight: 700, fontSize: '1.1rem' }}>Your Cart ({cartCount} items)</h3>
              <button onClick={() => setCartOpen(false)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"><X className="w-5 h-5 text-gray-600 dark:text-gray-300" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 && (
                <div className="text-center py-16">
                  <ShoppingBag className={`w-14 h-14 mx-auto mb-3 ${txtMuted} opacity-30`} />
                  <p className={txtMuted}>Your cart is empty</p>
                  <button onClick={() => setCartOpen(false)} className="mt-3 text-blue-600 text-sm hover:underline">Browse products</button>
                </div>
              )}
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                  <div className="text-3xl">{item.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm truncate ${txt}`} style={{ fontWeight: 600 }}>{item.name}</div>
                    <div className={`text-xs ${txtMuted}`}>{item.farmer}</div>
                    <div className="text-sm text-blue-700 dark:text-blue-400 mt-0.5" style={{ fontWeight: 700 }}>₦{(item.price * item.qty).toLocaleString()}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQty(item.id, -1)} className={`w-7 h-7 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-50`}><Minus className="w-3 h-3" /></button>
                    <span className={`text-sm w-6 text-center ${txt}`} style={{ fontWeight: 600 }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700"><Plus className="w-3 h-3" /></button>
                  </div>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <div className={`border-t dark:border-gray-800 p-5 space-y-3`}>
                <div className="flex justify-between text-sm">
                  <span className={txtMuted}>Subtotal</span>
                  <span className={txt} style={{ fontWeight: 600 }}>₦{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className={txtMuted}>Delivery Fee</span>
                  <span className="text-green-600 font-semibold">₦500</span>
                </div>
                <div className={`flex justify-between border-t dark:border-gray-800 pt-3`}>
                  <span className={txt} style={{ fontWeight: 700 }}>Total</span>
                  <span className={txt} style={{ fontWeight: 700, fontSize: '1.1rem' }}>₦{(cartTotal + 500).toLocaleString()}</span>
                </div>
                <button className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                  <Truck className="w-4 h-4" /> Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Order Tracking Modal */}
      {orderTracking && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className={`${card} max-w-md w-full shadow-2xl p-6`}>
            <div className="flex items-center justify-between mb-5">
              <h3 className={txt} style={{ fontWeight: 700 }}>Track Order #4518</h3>
              <button onClick={() => setOrderTracking(false)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"><X className="w-5 h-5 text-gray-500" /></button>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-5">
              <div className="flex items-center justify-between mb-1">
                <span className={`text-sm text-blue-800 dark:text-blue-300`} style={{ fontWeight: 600 }}>Spinach (48kg) from Amina Ibrahim</span>
                <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">In Transit</span>
              </div>
              <p className={`text-xs ${txtMuted}`}>ETA: 35-45 minutes • Rider: Ibrahim Suleiman • ⭐ 4.9</p>
            </div>
            <div className="relative pl-8 space-y-6">
              <div className="absolute left-3.5 top-4 bottom-4 w-0.5 bg-gray-200 dark:bg-gray-700" />
              {[
                { label: 'Order Placed', time: '10:30 AM', done: true },
                { label: 'Picked from Farm', time: '11:15 AM', done: true },
                { label: 'In Transit', time: '11:45 AM', done: true },
                { label: 'Out for Delivery', time: '~12:30 PM', done: false },
                { label: 'Delivered', time: '~12:45 PM', done: false },
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-4 relative">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 -ml-8 z-10 ${step.done ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}>
                    {step.done ? <Check className="w-3.5 h-3.5 text-white" /> : <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${step.done ? txt : txtMuted}`} style={step.done ? { fontWeight: 600 } : {}}>{step.label}</span>
                      <span className={`text-xs ${step.done ? 'text-blue-600' : txtMuted}`}>{step.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setOrderTracking(false)} className={`mt-6 w-full border dark:border-gray-700 py-2.5 rounded-xl text-sm ${txt} hover:bg-gray-50 dark:hover:bg-gray-800`}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
