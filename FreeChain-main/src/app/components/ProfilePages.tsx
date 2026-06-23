import { useState } from 'react';
import { useNavigate } from 'react-router';
import { User, Mail, Phone, MapPin, Edit, Camera, Award, Star, TrendingUp, Package, Clock, Heart, CreditCard, Shield, CheckCircle2, Sprout, ShoppingBag, TruckIcon, Settings, Bell, LogOut, Wallet, BarChart3, Calendar, AlertCircle, ChevronRight, Globe } from 'lucide-react';

// Farmer Profile Component
export function FarmerProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-700 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/farmer')}>
            <Sprout className="w-8 h-8" />
            <h1 className="text-2xl font-bold">My Profile</h1>
          </div>
          <button
            onClick={() => navigate('/farmer')}
            className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-800"
          >
            Back to Dashboard
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                AM
              </div>
              <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg border-2 border-green-500 hover:bg-green-50">
                <Camera className="w-5 h-5 text-green-600" />
              </button>
              {/* Verification Badge */}
              <div className="absolute -top-2 -right-2 bg-blue-500 text-white p-2 rounded-full shadow-lg" title="Verified Farmer">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-1">Abuji Musa</h2>
                  <p className="text-gray-600 mb-2">Green Valley Farms</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>Ogun State, Nigeria</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined Jan 2025</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 px-4 py-2 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-green-600">4.8</div>
                  <div className="text-xs text-gray-600 flex items-center justify-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                    Rating
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-blue-600">156</div>
                  <div className="text-xs text-gray-600">Sales</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-purple-600">₦842K</div>
                  <div className="text-xs text-gray-600">Total Earned</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-orange-600">12</div>
                  <div className="text-xs text-gray-600">Products</div>
                </div>
              </div>

              {/* Verification Status */}
              <div className="mt-4 flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ID Verified</span>
                </div>
                <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  <Shield className="w-4 h-4" />
                  <span>Bank Linked</span>
                </div>
                <div className="flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                  <Award className="w-4 h-4" />
                  <span>Premium Member</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-md mb-8">
          <div className="border-b flex gap-8 px-6 overflow-x-auto">
            {['overview', 'farm', 'financial', 'reviews', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 font-semibold border-b-2 capitalize whitespace-nowrap ${
                  activeTab === tab ? 'border-green-600 text-green-600' : 'border-transparent text-gray-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Contact Information */}
                <div>
                  <h3 className="font-bold text-lg mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="text-xs text-gray-500">Phone</div>
                        <div className="font-semibold">+234 801 234 5678</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="text-xs text-gray-500">Email</div>
                        <div className="font-semibold">abuji.musa@example.com</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="text-xs text-gray-500">Location</div>
                        <div className="font-semibold">Ifo LGA, Ogun State</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div>
                  <h3 className="font-bold text-lg mb-4">Performance This Month</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        <span className="font-semibold">Revenue</span>
                      </div>
                      <span className="text-green-600 font-bold">₦245,800</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Package className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold">Orders Completed</span>
                      </div>
                      <span className="text-blue-600 font-bold">43</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Star className="w-5 h-5 text-purple-600" />
                        <span className="font-semibold">New Reviews</span>
                      </div>
                      <span className="text-purple-600 font-bold">12</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="font-bold text-lg mb-4">Achievements & Badges</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: '🏆', name: 'Top Seller', desc: '100+ sales' },
                    { icon: '⭐', name: '5-Star Rated', desc: '4.8+ rating' },
                    { icon: '🌱', name: 'Quality First', desc: 'No returns' },
                    { icon: '⚡', name: 'Fast Shipper', desc: 'Same-day dispatch' },
                  ].map((badge, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-green-50 to-blue-50 p-4 rounded-xl text-center border-2 border-green-200">
                      <div className="text-4xl mb-2">{badge.icon}</div>
                      <div className="font-bold text-sm mb-1">{badge.name}</div>
                      <div className="text-xs text-gray-600">{badge.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Farm Details Tab */}
          {activeTab === 'farm' && (
            <div className="p-6">
              <h3 className="font-bold text-lg mb-4">Farm Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600 font-semibold">Farm Name</label>
                    <input
                      type="text"
                      value="Green Valley Farms"
                      disabled={!isEditing}
                      className="w-full mt-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 font-semibold">Farm Size (Hectares)</label>
                    <input
                      type="number"
                      value="2.5"
                      disabled={!isEditing}
                      className="w-full mt-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 font-semibold">Primary Crops</label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {['Tomatoes', 'Spinach', 'Peppers', 'Bananas'].map((crop) => (
                        <span key={crop} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                          {crop}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600 font-semibold">Farming Experience</label>
                    <input
                      type="text"
                      value="8 years"
                      disabled={!isEditing}
                      className="w-full mt-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 font-semibold">Farming Methods</label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {['Organic', 'Drip Irrigation', 'Crop Rotation'].map((method) => (
                        <span key={method} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                          {method}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 font-semibold">Certifications</label>
                    <div className="mt-2">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                        Organic Certified 2024
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Financial Tab */}
          {activeTab === 'financial' && (
            <div className="p-6">
              <h3 className="font-bold text-lg mb-4">Financial Information</h3>

              {/* Farmer Wallet */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm opacity-90 mb-1">Farmer Wallet Balance</div>
                    <div className="text-4xl font-bold">₦127,450</div>
                  </div>
                  <Wallet className="w-12 h-12 opacity-80" />
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 bg-white text-green-700 py-2 rounded-lg font-semibold hover:bg-green-50">
                    Withdraw
                  </button>
                  <button className="flex-1 border border-white py-2 rounded-lg hover:bg-green-600">
                    History
                  </button>
                </div>
              </div>

              {/* Financial Passport Score */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
                <div className="flex items-start gap-4">
                  <BarChart3 className="w-8 h-8 text-blue-600 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2">Financial Passport Score: 85/100</h4>
                    <p className="text-sm text-gray-700 mb-3">
                      Your digital financial identity unlocks access to microloans and credit.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Sales History</div>
                        <div className="font-bold text-green-600">Excellent</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Payment Reliability</div>
                        <div className="font-bold text-green-600">98%</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Loan Eligibility</div>
                        <div className="font-bold text-blue-600">Up to ₦500K</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bank Account */}
              <div>
                <h4 className="font-semibold mb-3">Linked Bank Account</h4>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-8 h-8 text-green-600" />
                    <div>
                      <div className="font-semibold">Access Bank</div>
                      <div className="text-sm text-gray-600">****5678</div>
                    </div>
                  </div>
                  <button className="text-green-600 hover:text-green-700 font-semibold">Change</button>
                </div>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg">Customer Reviews</h3>
                <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-lg">
                  <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  <span className="font-bold">4.8</span>
                  <span className="text-gray-600">(156 reviews)</span>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { name: 'Mrs. Adeyemi', rating: 5, comment: 'Best tomatoes I\'ve bought! Very fresh and delivered on time.', date: '2 days ago' },
                  { name: 'Chef Michael', rating: 5, comment: 'Excellent quality produce. Will definitely order again.', date: '5 days ago' },
                  { name: 'Amina Hassan', rating: 4, comment: 'Good quality, slightly delayed delivery but worth the wait.', date: '1 week ago' },
                ].map((review, idx) => (
                  <div key={idx} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-semibold">{review.name}</div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-4">Account Settings</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-gray-600" />
                      <span className="font-semibold">Notifications</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                  <button className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-gray-600" />
                      <span className="font-semibold">Privacy & Security</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                  <button className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-gray-600" />
                      <span className="font-semibold">Language: English</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-4">Danger Zone</h3>
                <button className="w-full flex items-center justify-between p-4 border-2 border-red-200 rounded-lg hover:bg-red-50 text-red-600">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-semibold">Delete Account</span>
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <button className="w-full flex items-center justify-center gap-3 p-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
                <LogOut className="w-5 h-5" />
                <span className="font-semibold">Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Consumer Profile Component
export function ConsumerProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/consumer')}>
            <ShoppingBag className="w-8 h-8" />
            <h1 className="text-2xl font-bold">My Profile</h1>
          </div>
          <button
            onClick={() => navigate('/consumer')}
            className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-700"
          >
            Back to Market
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                SA
              </div>
              <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg border-2 border-blue-500">
                <Camera className="w-5 h-5 text-blue-600" />
              </button>
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-1">Sarah Adeyemi</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>Ikeja, Lagos</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Member since Feb 2025</span>
                    </div>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-blue-600">42</div>
                  <div className="text-xs text-gray-600">Orders</div>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-green-600">₦125K</div>
                  <div className="text-xs text-gray-600">Spent</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-purple-600">890</div>
                  <div className="text-xs text-gray-600">Health Points</div>
                </div>
                <div className="bg-pink-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-pink-600">Gold</div>
                  <div className="text-xs text-gray-600">Tier</div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1 bg-pink-100 text-pink-700 px-3 py-1 rounded-full">
                  <Heart className="w-4 h-4" />
                  <span>Wellness Tracker Active</span>
                </div>
                <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  <Package className="w-4 h-4" />
                  <span>Subscription Member</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-md">
          <div className="border-b flex gap-8 px-6 overflow-x-auto">
            {['overview', 'orders', 'health', 'addresses', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 font-semibold border-b-2 capitalize whitespace-nowrap ${
                  activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'overview' && (
            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-lg mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="text-xs text-gray-500">Phone</div>
                        <div className="font-semibold">+234 803 456 7890</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="text-xs text-gray-500">Email</div>
                        <div className="font-semibold">sarah.adeyemi@example.com</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-4">Dietary Preferences</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Organic Only', 'Low-Sodium', 'Diabetic-Friendly'].map((pref) => (
                      <span key={pref} className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm">
                        {pref}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Subscription Box */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-500 p-6 rounded-lg">
                <div className="flex items-start gap-4">
                  <Package className="w-8 h-8 text-green-600 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2">Weekly Fresh Box Subscription</h4>
                    <p className="text-sm text-gray-700 mb-3">Next delivery: Friday, May 16, 2026</p>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        Manage Subscription
                      </button>
                      <button className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50">
                        Pause
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="p-6">
              <h3 className="font-bold text-lg mb-4">Order History</h3>
              <div className="space-y-4">
                {[
                  { id: '#4521', date: 'May 10, 2026', items: '3 items', total: '₦4,200', status: 'Delivered' },
                  { id: '#4512', date: 'May 5, 2026', items: '5 items', total: '₦6,800', status: 'Delivered' },
                  { id: '#4498', date: 'Apr 28, 2026', items: '2 items', total: '₦2,900', status: 'Delivered' },
                ].map((order) => (
                  <div key={order.id} className="border rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow">
                    <div>
                      <div className="font-bold">{order.id}</div>
                      <div className="text-sm text-gray-600">{order.date} • {order.items}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">{order.total}</div>
                      <div className="text-xs text-green-600">{order.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'health' && (
            <div className="p-6 space-y-6">
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 border-l-4 border-pink-500 p-6 rounded-lg">
                <div className="flex items-start gap-4">
                  <Heart className="w-8 h-8 text-pink-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-lg mb-2">Health & Wellness Tracker</h4>
                    <p className="text-sm text-gray-700 mb-4">
                      Track your nutrition goals and earn rewards for healthy purchases!
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-white p-3 rounded-lg">
                        <div className="text-xs text-gray-600 mb-1">Weekly Fruit Intake</div>
                        <div className="font-bold text-pink-600">12/15 servings</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <div className="text-xs text-gray-600 mb-1">Organic Purchases</div>
                        <div className="font-bold text-green-600">85%</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <div className="text-xs text-gray-600 mb-1">Health Points</div>
                        <div className="font-bold text-purple-600">890 pts</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Personalized Recommendations</h4>
                <div className="space-y-2">
                  <div className="p-3 bg-blue-50 rounded-lg text-sm">
                    💡 Based on your diabetic-friendly preference, try our low-GI vegetable bundle
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg text-sm">
                    🥗 You're 3 servings away from your weekly vegetable goal!
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Delivery Addresses</h3>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  + Add Address
                </button>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Home', address: '23 Allen Avenue, Ikeja, Lagos State', default: true },
                  { label: 'Office', address: '14 Broad Street, Victoria Island, Lagos', default: false },
                ].map((addr, idx) => (
                  <div key={idx} className="border rounded-lg p-4 flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                      <div>
                        <div className="font-semibold flex items-center gap-2">
                          {addr.label}
                          {addr.default && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Default</span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">{addr.address}</div>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700">Edit</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-4">Notifications</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Order updates', checked: true },
                    { label: 'Health & wellness tips', checked: true },
                    { label: 'Special offers', checked: false },
                    { label: 'New products', checked: true },
                  ].map((notif, idx) => (
                    <label key={idx} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <span>{notif.label}</span>
                      <input type="checkbox" defaultChecked={notif.checked} className="w-5 h-5 text-blue-600" />
                    </label>
                  ))}
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-3 p-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
                <LogOut className="w-5 h-5" />
                <span className="font-semibold">Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Rider Profile Component
export function RiderProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-orange-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/rider')}>
            <TruckIcon className="w-8 h-8" />
            <h1 className="text-2xl font-bold">My Profile</h1>
          </div>
          <button
            onClick={() => navigate('/rider')}
            className="px-4 py-2 bg-orange-500 rounded-lg hover:bg-orange-700"
          >
            Back to Dashboard
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                IS
              </div>
              <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg border-2 border-orange-500">
                <Camera className="w-5 h-5 text-orange-600" />
              </button>
              <div className="absolute -top-2 -right-2 bg-green-500 text-white p-2 rounded-full shadow-lg" title="Verified Rider">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-1">Ibrahim Suleiman</h2>
                  <p className="text-gray-600 mb-2">Active Rider</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>Lagos Island, Lagos</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined Dec 2024</span>
                    </div>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border-2 border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50">
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="bg-orange-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-orange-600">4.9</div>
                  <div className="text-xs text-gray-600 flex items-center justify-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                    Rating
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-green-600">324</div>
                  <div className="text-xs text-gray-600">Deliveries</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-blue-600">₦284K</div>
                  <div className="text-xs text-gray-600">Total Earned</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-purple-600">98%</div>
                  <div className="text-xs text-gray-600">On-time Rate</div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ID Verified</span>
                </div>
                <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  <Shield className="w-4 h-4" />
                  <span>Insured</span>
                </div>
                <div className="flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                  <Award className="w-4 h-4" />
                  <span>Top Performer</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-md">
          <div className="border-b flex gap-8 px-6 overflow-x-auto">
            {['overview', 'vehicle', 'earnings', 'reviews', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 font-semibold border-b-2 capitalize whitespace-nowrap ${
                  activeTab === tab ? 'border-orange-600 text-orange-600' : 'border-transparent text-gray-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'overview' && (
            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-lg mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="text-xs text-gray-500">Phone</div>
                        <div className="font-semibold">+234 807 123 4567</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="text-xs text-gray-500">Email</div>
                        <div className="font-semibold">ibrahim.s@example.com</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-4">This Week</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Package className="w-5 h-5 text-green-600" />
                        <span className="font-semibold">Deliveries</span>
                      </div>
                      <span className="text-green-600 font-bold">28</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-5 h-5 text-orange-600" />
                        <span className="font-semibold">Earnings</span>
                      </div>
                      <span className="text-orange-600 font-bold">₦22,400</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="font-bold text-lg mb-4">Achievements</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: '🏆', name: 'Top Rider', desc: 'Top 10% rating' },
                    { icon: '⚡', name: 'Speed Demon', desc: '100 fast deliveries' },
                    { icon: '🎯', name: 'Accuracy Pro', desc: '98% on-time' },
                    { icon: '💯', name: 'Century Club', desc: '100+ deliveries' },
                  ].map((badge, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-orange-50 to-yellow-50 p-4 rounded-xl text-center border-2 border-orange-200">
                      <div className="text-4xl mb-2">{badge.icon}</div>
                      <div className="font-bold text-sm mb-1">{badge.name}</div>
                      <div className="text-xs text-gray-600">{badge.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'vehicle' && (
            <div className="p-6">
              <h3 className="font-bold text-lg mb-4">Vehicle Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600 font-semibold">Vehicle Type</label>
                    <input
                      type="text"
                      value="Motorcycle"
                      disabled
                      className="w-full mt-1 px-4 py-2 border-2 border-gray-200 rounded-lg disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 font-semibold">Registration Number</label>
                    <input
                      type="text"
                      value="ABC-123-XY"
                      disabled
                      className="w-full mt-1 px-4 py-2 border-2 border-gray-200 rounded-lg disabled:bg-gray-50"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600 font-semibold">Operating Areas</label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {['Lagos Island', 'Ikeja', 'Victoria Island'].map((area) => (
                        <span key={area} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 font-semibold">Equipment</label>
                    <div className="mt-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        Portable Cooling Box
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'earnings' && (
            <div className="p-6">
              <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm opacity-90 mb-1">Available Balance</div>
                    <div className="text-4xl font-bold">₦32,800</div>
                  </div>
                  <Wallet className="w-12 h-12 opacity-80" />
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 bg-white text-orange-700 py-2 rounded-lg font-semibold hover:bg-orange-50">
                    Withdraw
                  </button>
                  <button className="flex-1 border border-white py-2 rounded-lg hover:bg-orange-600">
                    History
                  </button>
                </div>
              </div>

              <h3 className="font-bold text-lg mb-4">Recent Earnings</h3>
              <div className="space-y-3">
                {[
                  { id: '#4521', date: 'Today', amount: '₦1,200', desc: 'Ikeja → Victoria Island' },
                  { id: '#4520', date: 'Today', amount: '₦1,800', desc: 'Lekki → Ikeja' },
                  { id: '#4519', date: 'Yesterday', amount: '₦2,100', desc: 'VI → Surulere' },
                ].map((earning) => (
                  <div key={earning.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-semibold">{earning.desc}</div>
                      <div className="text-sm text-gray-600">{earning.date} • {earning.id}</div>
                    </div>
                    <div className="font-bold text-green-600">{earning.amount}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg">Customer Reviews</h3>
                <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-lg">
                  <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  <span className="font-bold">4.9</span>
                  <span className="text-gray-600">(324 reviews)</span>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { name: 'Sarah Adeyemi', rating: 5, comment: 'Very fast and professional. Produce arrived in perfect condition!', date: '1 day ago' },
                  { name: 'Mr. Okonkwo', rating: 5, comment: 'Excellent service. Always on time!', date: '3 days ago' },
                  { name: 'Chef Maria', rating: 4, comment: 'Good service, handled the produce with care.', date: '1 week ago' },
                ].map((review, idx) => (
                  <div key={idx} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-semibold">{review.name}</div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-4">Availability</h3>
                <label className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <span className="font-semibold">Currently Available for Deliveries</span>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-orange-600" />
                </label>
              </div>

              <button className="w-full flex items-center justify-center gap-3 p-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
                <LogOut className="w-5 h-5" />
                <span className="font-semibold">Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
