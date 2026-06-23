import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Leaf, Sprout, ShoppingBag, TruckIcon, Camera, BarChart3, Heart, MapPin,
  Smartphone, MessageSquare, Globe, ChevronRight, Star, Shield, Zap,
  Users, TrendingUp, Package, Award, Phone, X, Menu, Moon, Sun
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function LandingPage() {
  const navigate = useNavigate();
  const { isDark, toggleDark } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [ussdOpen, setUssdOpen] = useState(false);
  const [ussdStep, setUssdStep] = useState(0);

  const ussdFlow = [
    { display: 'Welcome to FreshChain\n*123#\n\n1. Farmer Menu\n2. Check Prices\n3. Order Status\n4. Contact Agent\n\nReply with option:', input: '' },
    { display: 'FARMER MENU\n\n1. List my produce\n2. Check wallet balance\n3. Price recommendations\n4. Spoilage alerts\n0. Back\n\nReply with option:', input: '1' },
    { display: 'LIST PRODUCE\n\nEnter produce name:', input: '2' },
  ];

  return (
    <div className="min-h-screen bg-[#F7F8F5] dark:bg-gray-950 font-sans">
      {/* Navbar */}
      <header className="bg-white dark:bg-gray-900 border-b border-green-100 dark:border-gray-800 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-9 h-9 bg-green-700 rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl text-gray-900" style={{ fontWeight: 700, letterSpacing: '-0.02em' }}>FreshChain</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm text-gray-600 hover:text-green-700 transition-colors">How It Works</a>
            <a href="#features" className="text-sm text-gray-600 hover:text-green-700 transition-colors">Features</a>
            <a href="#impact" className="text-sm text-gray-600 hover:text-green-700 transition-colors">Impact</a>
            <a href="#access" className="text-sm text-gray-600 hover:text-green-700 transition-colors">Access</a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleDark}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all"
              title="Toggle dark mode"
            >
              {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-500" />}
            </button>
            <button
              onClick={() => navigate('/login')}
              className="text-sm text-gray-700 dark:text-gray-300 hover:text-green-700 px-4 py-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-all"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="text-sm bg-green-700 text-white px-5 py-2 rounded-lg hover:bg-green-800 transition-all shadow-sm"
            >
              Get Started
            </button>
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
            <a href="#how-it-works" className="block text-gray-700 py-2" onClick={() => setMenuOpen(false)}>How It Works</a>
            <a href="#features" className="block text-gray-700 py-2" onClick={() => setMenuOpen(false)}>Features</a>
            <a href="#impact" className="block text-gray-700 py-2" onClick={() => setMenuOpen(false)}>Impact</a>
            <div className="flex gap-3 pt-2">
              <button onClick={() => navigate('/login')} className="flex-1 py-2 border border-gray-300 rounded-lg text-sm">Sign In</button>
              <button onClick={() => navigate('/signup')} className="flex-1 py-2 bg-green-700 text-white rounded-lg text-sm">Get Started</button>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, #86efac 0%, transparent 60%), radial-gradient(circle at 80% 20%, #f97316 0%, transparent 50%)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-700/50 border border-green-500/30 px-3 py-1.5 rounded-full text-sm text-green-200 mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Live in Nigeria — Serving 36M+ Farmers
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-white mb-6" style={{ fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                Africa's Inclusive<br />
                <span className="text-green-300">Agricultural</span><br />
                Ecosystem
              </h1>
              <p className="text-lg text-green-100 mb-8 leading-relaxed max-w-lg">
                Connecting farmers, consumers and riders to reduce food waste, empower communities, and build a healthier Nigeria — from smartphone to USSD.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <button
                  onClick={() => navigate('/farmer')}
                  className="flex items-center gap-2 bg-white text-green-800 px-6 py-3 rounded-xl hover:bg-green-50 transition-all shadow-lg font-semibold"
                >
                  <Sprout className="w-4 h-4" /> I'm a Farmer
                </button>
                <button
                  onClick={() => navigate('/consumer')}
                  className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-all shadow-lg font-semibold"
                >
                  <ShoppingBag className="w-4 h-4" /> I'm a Consumer
                </button>
                <button
                  onClick={() => navigate('/rider')}
                  className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition-all shadow-lg font-semibold"
                >
                  <TruckIcon className="w-4 h-4" /> I'm a Rider
                </button>
              </div>
              <div className="flex items-center gap-2 text-green-300 text-sm">
                <Smartphone className="w-4 h-4" />
                <span>No smartphone? Use USSD </span>
                <button
                  onClick={() => setUssdOpen(true)}
                  className="underline underline-offset-2 hover:text-white transition-colors"
                >
                  *123# Demo
                </button>
              </div>
            </div>

            {/* Stats Card */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '1.3B', label: 'Tonnes food wasted globally/year', icon: '🌍', color: 'from-red-500/20 to-red-600/10' },
                { value: '40%', label: 'Post-harvest losses in Nigeria', icon: '📉', color: 'from-orange-500/20 to-orange-600/10' },
                { value: '36M', label: 'Smallholder farmers in Nigeria', icon: '👨‍🌾', color: 'from-green-500/20 to-green-600/10' },
                { value: '₦2.4T', label: 'Annual agricultural GDP at stake', icon: '💰', color: 'from-blue-500/20 to-blue-600/10' },
              ].map((stat, i) => (
                <div key={i} className={`bg-gradient-to-br ${stat.color} border border-white/10 rounded-2xl p-5 backdrop-blur-sm`}>
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-3xl text-white mb-1" style={{ fontWeight: 800 }}>{stat.value}</div>
                  <div className="text-xs text-green-200 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Role Cards */}
      <section id="how-it-works" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl text-gray-900 mb-4" style={{ fontWeight: 700, letterSpacing: '-0.02em' }}>Three Layers, One Mission</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">FreshChain creates a seamless supply chain from farm to table, with every actor empowered by AI and data.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Farmer */}
          <div className="group bg-white rounded-2xl overflow-hidden border border-green-100 hover:shadow-xl hover:border-green-200 transition-all cursor-pointer" onClick={() => navigate('/farmer')}>
            <div className="bg-gradient-to-br from-green-700 to-green-600 p-8">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <Sprout className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-white mb-1" style={{ fontWeight: 700, fontSize: '1.25rem' }}>Farmer Layer</h3>
              <p className="text-green-200 text-sm">Empower smallholder farmers with digital tools</p>
            </div>
            <div className="p-6 space-y-3">
              {[
                'AI Crop Health Scanner',
                'Dynamic pricing recommendations',
                'Financial Passport & microloans',
                'Digital wallet & instant payouts',
                'Spoilage alerts via IoT sensors',
                'Agro education in local languages',
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" />
                  {f}
                </div>
              ))}
              <button className="mt-4 w-full flex items-center justify-center gap-2 bg-green-50 text-green-700 py-2.5 rounded-xl hover:bg-green-100 transition-all text-sm font-semibold group-hover:bg-green-700 group-hover:text-white">
                Farmer Dashboard <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Consumer */}
          <div className="group bg-white rounded-2xl overflow-hidden border border-blue-100 hover:shadow-xl hover:border-blue-200 transition-all cursor-pointer" onClick={() => navigate('/consumer')}>
            <div className="bg-gradient-to-br from-blue-700 to-blue-600 p-8">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <ShoppingBag className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-white mb-1" style={{ fontWeight: 700, fontSize: '1.25rem' }}>Consumer Layer</h3>
              <p className="text-blue-200 text-sm">Fresh produce directly from verified farmers</p>
            </div>
            <div className="p-6 space-y-3">
              {[
                'Direct farm-to-table marketplace',
                'Freshness score & quality assurance',
                'Weekly subscription fresh boxes',
                'Nutrition & health tracking',
                'Near-expiry rescue deals (40% off)',
                'Real-time delivery tracking',
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                  {f}
                </div>
              ))}
              <button className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-50 text-blue-700 py-2.5 rounded-xl hover:bg-blue-100 transition-all text-sm font-semibold group-hover:bg-blue-700 group-hover:text-white">
                Consumer Market <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Rider */}
          <div className="group bg-white rounded-2xl overflow-hidden border border-orange-100 hover:shadow-xl hover:border-orange-200 transition-all cursor-pointer" onClick={() => navigate('/rider')}>
            <div className="bg-gradient-to-br from-orange-600 to-orange-500 p-8">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <TruckIcon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-white mb-1" style={{ fontWeight: 700, fontSize: '1.25rem' }}>Logistics Layer</h3>
              <p className="text-orange-200 text-sm">Smart delivery network across Nigeria</p>
            </div>
            <div className="p-6 space-y-3">
              {[
                'AI-optimized delivery routes',
                'Cold storage network access',
                'Real-time earnings tracking',
                'Order acceptance & management',
                'Performance rating system',
                'Fuel cost optimization',
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full flex-shrink-0" />
                  {f}
                </div>
              ))}
              <button className="mt-4 w-full flex items-center justify-center gap-2 bg-orange-50 text-orange-700 py-2.5 rounded-xl hover:bg-orange-100 transition-all text-sm font-semibold group-hover:bg-orange-600 group-hover:text-white">
                Rider Dashboard <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features */}
      <section id="features" className="bg-gray-900 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-block px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full border border-green-500/30 mb-4">AI-Powered</div>
            <h2 className="text-3xl md:text-4xl mb-4" style={{ fontWeight: 700, letterSpacing: '-0.02em' }}>Intelligence at Every Step</h2>
            <p className="text-gray-400 max-w-xl mx-auto">From crop disease detection to route optimization — FreshChain puts AI in the hands of every farmer and rider.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: Camera,
                title: 'Crop Health Scanner',
                desc: 'Upload a photo to detect diseases and pests before harvest, with treatment recommendations',
                color: 'purple',
                bg: 'bg-purple-500/10 border-purple-500/20',
                iconBg: 'bg-purple-500/20 text-purple-400',
              },
              {
                icon: BarChart3,
                title: 'Dynamic Pricing AI',
                desc: 'Real-time market analysis suggests optimal prices to maximize farmer income without waste',
                color: 'blue',
                bg: 'bg-blue-500/10 border-blue-500/20',
                iconBg: 'bg-blue-500/20 text-blue-400',
              },
              {
                icon: Heart,
                title: 'Nutrition Assistant',
                desc: 'AI chatbot answers health and food questions, recommends produce for specific health goals',
                color: 'pink',
                bg: 'bg-pink-500/10 border-pink-500/20',
                iconBg: 'bg-pink-500/20 text-pink-400',
              },
              {
                icon: MapPin,
                title: 'Route Optimization',
                desc: 'Plans fastest, most fuel-efficient delivery routes for riders handling multiple orders',
                color: 'orange',
                bg: 'bg-orange-500/10 border-orange-500/20',
                iconBg: 'bg-orange-500/20 text-orange-400',
              },
            ].map((feat, i) => (
              <div key={i} className={`border rounded-2xl p-6 ${feat.bg} hover:scale-105 transition-transform`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feat.iconBg}`}>
                  <feat.icon className="w-6 h-6" />
                </div>
                <h3 className="mb-2" style={{ fontWeight: 600, fontSize: '1rem' }}>{feat.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {[
              { icon: Zap, label: 'Demand Forecasting', desc: 'Predicts which produce will sell best each week, so farmers plan smarter harvests' },
              { icon: Shield, label: 'Financial Passport', desc: 'Builds a digital credit score from transaction history, unlocking microloan access' },
              { icon: MessageSquare, label: 'Multilingual Chatbot', desc: 'Farming advice in Yoruba, Hausa, Igbo, Pidgin English, and English' },
            ].map((feat, i) => (
              <div key={i} className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <feat.icon className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <div className="mb-1" style={{ fontWeight: 600 }}>{feat.label}</div>
                  <p className="text-gray-400 text-sm leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact / SDGs */}
      <section id="impact" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl text-gray-900 mb-4" style={{ fontWeight: 700, letterSpacing: '-0.02em' }}>UN Sustainable Development Goals</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Every feature of FreshChain is designed to directly advance global sustainability targets.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          {[
            { num: 2, name: 'Zero Hunger', color: 'from-yellow-500 to-yellow-600', desc: 'Reducing post-harvest food losses' },
            { num: 3, name: 'Good Health', color: 'from-green-500 to-green-600', desc: 'Nutrition tracking for consumers' },
            { num: 8, name: 'Decent Work', color: 'from-red-500 to-red-600', desc: 'Income for farmers and riders' },
            { num: 12, name: 'Responsible Consumption', color: 'from-orange-500 to-orange-600', desc: 'Rescue food marketplace' },
            { num: 13, name: 'Climate Action', color: 'from-teal-600 to-teal-700', desc: 'Reducing food waste emissions' },
          ].map(sdg => (
            <div key={sdg.num} className={`bg-gradient-to-br ${sdg.color} text-white rounded-2xl p-5 text-center shadow-lg`}>
              <div className="text-3xl mb-1" style={{ fontWeight: 800 }}>SDG {sdg.num}</div>
              <div className="text-sm mb-2" style={{ fontWeight: 600 }}>{sdg.name}</div>
              <div className="text-xs opacity-80">{sdg.desc}</div>
            </div>
          ))}
        </div>

        {/* Projected Impact */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <h3 className="mb-6 text-gray-900" style={{ fontWeight: 700, fontSize: '1.25rem' }}>Projected 5-Year Impact</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Users, value: '500K+', label: 'Farmers onboarded', color: 'text-green-600' },
              { icon: Package, value: '₦50B+', label: 'Produce sold', color: 'text-blue-600' },
              { icon: TrendingUp, value: '35%', label: 'Reduction in food waste', color: 'text-orange-600' },
              { icon: Award, value: '2M+', label: 'Families with better food access', color: 'text-purple-600' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className={`w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mx-auto mb-3 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className={`text-3xl mb-1 ${stat.color}`} style={{ fontWeight: 800 }}>{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-green-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-white mb-10" style={{ fontWeight: 700, fontSize: '1.875rem', letterSpacing: '-0.02em' }}>
            Voices from the Field
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Abuji Musa',
                role: 'Tomato Farmer, Ogun State',
                quote: 'Before FreshChain, I was losing 40% of my tomatoes to spoilage. Now I get alerts 3 days before and sell at the right time. My income doubled in one season.',
                rating: 5,
              },
              {
                name: 'Chidinma Okafor',
                role: 'Consumer, Lagos Island',
                quote: 'I know exactly which farm my food comes from. The freshness scores are real — my vegetables now last twice as long. The subscription box is amazing value.',
                rating: 5,
              },
              {
                name: 'Ibrahim Suleiman',
                role: 'Rider, Kano',
                quote: 'The AI route optimization saves me 2 hours a day. I complete more deliveries and earn more. The earnings analytics helped me understand my peak hours.',
                rating: 5,
              },
            ].map((t, i) => (
              <div key={i} className="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-green-100 text-sm leading-relaxed mb-5 italic">"{t.quote}"</p>
                <div>
                  <div className="text-white" style={{ fontWeight: 600 }}>{t.name}</div>
                  <div className="text-green-300 text-xs">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accessibility / Inclusivity */}
      <section id="access" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-100 mb-6">Built for Everyone</div>
            <h2 className="text-3xl md:text-4xl text-gray-900 mb-6" style={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
              No Smartphone?<br />No Problem.
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              FreshChain is designed for rural Nigeria. Whether you have the latest iPhone or a basic feature phone, you can access all core features. Our Village Agro Agents support farmers without any phone at all.
            </p>

            <div className="space-y-5">
              {[
                { icon: Smartphone, title: 'USSD *123#', desc: 'Full marketplace access on any phone, no internet required. Works on all networks.', color: 'bg-green-50 text-green-700' },
                { icon: MessageSquare, title: 'SMS Commands', desc: 'Send and receive orders, prices, and alerts via SMS text messages.', color: 'bg-blue-50 text-blue-700' },
                { icon: Globe, title: '5 Languages', desc: 'English, Yoruba, Hausa, Igbo, and Pidgin English — pick your comfort language.', color: 'bg-purple-50 text-purple-700' },
                { icon: Users, title: 'Village Agro Agents', desc: 'Local representatives help farmers register, list produce, and access services.', color: 'bg-orange-50 text-orange-700' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="mb-0.5" style={{ fontWeight: 600 }}>{item.title}</div>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* USSD Phone Mockup */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-72 bg-gray-900 rounded-3xl p-4 shadow-2xl">
                <div className="bg-gray-800 rounded-2xl overflow-hidden">
                  <div className="bg-gray-700 px-4 py-2 flex items-center justify-between">
                    <span className="text-xs text-gray-300">MTN Nigeria</span>
                    <span className="text-xs text-gray-300">12:34</span>
                  </div>
                  <div className="bg-green-900 min-h-48 p-4 font-mono">
                    <div className="text-green-300 text-sm whitespace-pre-line leading-relaxed">
                      {`Welcome to FreshChain\n*123#\n\n1. Farmer Menu\n2. Check Prices\n3. Order Status\n4. Contact Agent\n\nReply with option:`}
                    </div>
                  </div>
                  <div className="bg-gray-800 px-4 py-3 flex gap-2">
                    <div className="flex-1 bg-gray-700 rounded px-3 py-2">
                      <span className="text-gray-400 text-sm font-mono">1_</span>
                    </div>
                    <button
                      onClick={() => setUssdOpen(true)}
                      className="bg-green-600 text-white px-4 py-2 rounded text-sm"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-orange-500 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg">
                No Internet Needed
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-20 text-center text-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl mb-6" style={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
            Join the Future of Food in Africa
          </h2>
          <p className="text-gray-400 mb-10 text-lg leading-relaxed">
            Whether you grow it, deliver it, or eat it — FreshChain connects you to a better food system.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => navigate('/signup')}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-xl transition-all shadow-lg"
              style={{ fontWeight: 600 }}
            >
              <Sprout className="w-5 h-5" /> Start as a Farmer
            </button>
            <button
              onClick={() => navigate('/consumer')}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl transition-all shadow-lg"
              style={{ fontWeight: 600 }}
            >
              <ShoppingBag className="w-5 h-5" /> Shop Fresh Produce
            </button>
            <button
              onClick={() => navigate('/rider')}
              className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-xl transition-all shadow-lg"
              style={{ fontWeight: 600 }}
            >
              <TruckIcon className="w-5 h-5" /> Become a Rider
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 bg-green-700 rounded-lg flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-white" />
                </div>
                <span className="text-white" style={{ fontWeight: 700 }}>FreshChain</span>
              </div>
              <p className="text-sm">Building the future of food in Africa</p>
            </div>
            <div className="text-sm text-center md:text-right">
              <p className="text-gray-500 mb-1">© 2026 FreshChain Architecture. All rights reserved.</p>        
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 pt-6 flex flex-wrap gap-4 justify-between items-center text-sm">
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>USSD: *123# | SMS: 20456</span>
            </div>
          </div>
        </div>
      </footer>

      {/* USSD Demo Modal */}
      {ussdOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ fontWeight: 700 }}>USSD *123# Demo</h3>
              <button onClick={() => { setUssdOpen(false); setUssdStep(0); }} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-green-900 rounded-xl p-4 font-mono text-green-300 text-sm mb-4 min-h-36 whitespace-pre-line leading-relaxed">
              {ussdFlow[Math.min(ussdStep, ussdFlow.length - 1)].display}
            </div>
            <div className="flex gap-3">
              {ussdStep < ussdFlow.length - 1 ? (
                <button
                  onClick={() => setUssdStep(ussdStep + 1)}
                  className="flex-1 bg-green-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-green-700"
                >
                  Reply "1" →
                </button>
              ) : (
                <button
                  onClick={() => setUssdStep(0)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-200"
                >
                  Restart Demo
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
