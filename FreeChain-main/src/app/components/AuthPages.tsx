import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Leaf, User, Mail, Lock, Phone, MapPin, Camera, ChevronRight, Globe, Smartphone, CreditCard, Shield, Eye, EyeOff, Sprout, ShoppingBag, TruckIcon, CheckCircle2, MessageSquare } from 'lucide-react';

// Login Page Component
export function LoginPage() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'farmer' | 'consumer' | 'rider'>('consumer');
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate based on user type
    if (userType === 'farmer') navigate('/farmer');
    else if (userType === 'consumer') navigate('/consumer');
    else navigate('/rider');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2 cursor-pointer" onClick={() => navigate('/')}>
            <Leaf className="w-12 h-12 text-green-600" />
            <h1 className="text-4xl font-bold text-gray-900">FreshChain</h1>
          </div>
          <p className="text-gray-600">Welcome back! Sign in to continue</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* User Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">I am a:</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setUserType('farmer')}
                className={`p-3 rounded-lg border-2 transition-all ${
                  userType === 'farmer'
                    ? 'border-green-600 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <Sprout className="w-6 h-6 mx-auto mb-1" />
                <div className="text-xs font-semibold">Farmer</div>
              </button>
              <button
                type="button"
                onClick={() => setUserType('consumer')}
                className={`p-3 rounded-lg border-2 transition-all ${
                  userType === 'consumer'
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <ShoppingBag className="w-6 h-6 mx-auto mb-1" />
                <div className="text-xs font-semibold">Consumer</div>
              </button>
              <button
                type="button"
                onClick={() => setUserType('rider')}
                className={`p-3 rounded-lg border-2 transition-all ${
                  userType === 'rider'
                    ? 'border-orange-600 bg-orange-50 text-orange-700'
                    : 'border-gray-200 hover:border-orange-300'
                }`}
              >
                <TruckIcon className="w-6 h-6 mx-auto mb-1" />
                <div className="text-xs font-semibold">Rider</div>
              </button>
            </div>
          </div>

          {/* Login Method Toggle */}
          <div className="flex gap-2 mb-6">
            <button
              type="button"
              onClick={() => setLoginMethod('phone')}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold text-sm transition-all ${
                loginMethod === 'phone'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Phone className="w-4 h-4 inline mr-1" />
              Phone
            </button>
            <button
              type="button"
              onClick={() => setLoginMethod('email')}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold text-sm transition-all ${
                loginMethod === 'email'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Mail className="w-4 h-4 inline mr-1" />
              Email
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {loginMethod === 'phone' ? (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    placeholder="+234 801 234 5678"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                    required
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-green-600 hover:text-green-700 font-semibold">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className={`w-full py-3 rounded-lg text-white font-semibold transition-all ${
                userType === 'farmer'
                  ? 'bg-green-600 hover:bg-green-700'
                  : userType === 'consumer'
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-orange-600 hover:bg-orange-700'
              }`}
            >
              Sign In
            </button>
          </form>

          {/* Alternative Login Methods */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 py-2 px-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
                <Smartphone className="w-5 h-5 text-green-600" />
                <span className="text-sm font-semibold">USSD</span>
              </button>
              <button className="flex items-center justify-center gap-2 py-2 px-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
                <Phone className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-semibold">SMS</span>
              </button>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="text-green-600 hover:text-green-700 font-semibold"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>

        {/* Language Selector */}
        <div className="mt-4 text-center">
          <button className="flex items-center gap-2 mx-auto text-gray-600 hover:text-gray-900">
            <Globe className="w-4 h-4" />
            <span className="text-sm">English • Yoruba • Hausa • Igbo • Pidgin</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Sign Up Page Component
export function SignUpPage() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'farmer' | 'consumer' | 'rider'>('farmer');
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const totalSteps = userType === 'farmer' ? 3 : 2;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Complete registration
      if (userType === 'farmer') navigate('/farmer');
      else if (userType === 'consumer') navigate('/consumer');
      else navigate('/rider');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2 cursor-pointer" onClick={() => navigate('/')}>
            <Leaf className="w-10 h-10 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">FreshChain</h1>
          </div>
          <p className="text-gray-600">Join Africa's inclusive agricultural ecosystem</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* User Type Selection - Step 0 */}
          {step === 0 && (
            <div>
              <h2 className="text-2xl font-bold text-center mb-6">Choose Your Role</h2>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <button
                  onClick={() => {
                    setUserType('farmer');
                    setStep(1);
                  }}
                  className="p-6 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all group"
                >
                  <Sprout className="w-12 h-12 mx-auto mb-3 text-green-600" />
                  <h3 className="font-bold text-lg mb-2">Farmer</h3>
                  <p className="text-sm text-gray-600">Sell your produce directly to consumers</p>
                </button>
                <button
                  onClick={() => {
                    setUserType('consumer');
                    setStep(1);
                  }}
                  className="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
                >
                  <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-blue-600" />
                  <h3 className="font-bold text-lg mb-2">Consumer</h3>
                  <p className="text-sm text-gray-600">Buy fresh produce directly from farmers</p>
                </button>
                <button
                  onClick={() => {
                    setUserType('rider');
                    setStep(1);
                  }}
                  className="p-6 border-2 border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all group"
                >
                  <TruckIcon className="w-12 h-12 mx-auto mb-3 text-orange-600" />
                  <h3 className="font-bold text-lg mb-2">Rider</h3>
                  <p className="text-sm text-gray-600">Deliver fresh produce and earn income</p>
                </button>
              </div>
            </div>
          )}

          {/* Progress Bar */}
          {step > 0 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  Step {step} of {totalSteps}
                </span>
                <span className="text-sm text-gray-600">
                  {userType === 'farmer' ? '👨‍🌾 Farmer' : userType === 'consumer' ? '🛒 Consumer' : '🚚 Rider'}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    userType === 'farmer'
                      ? 'bg-green-600'
                      : userType === 'consumer'
                      ? 'bg-blue-600'
                      : 'bg-orange-600'
                  }`}
                  style={{ width: `${(step / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Step 1: Basic Information */}
          {step === 1 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-2xl font-bold mb-6">Basic Information</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    placeholder="Enter first name"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    placeholder="Enter last name"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    placeholder="+234 801 234 5678"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">This will be your primary contact method</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address (Optional)</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Language *</label>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none" required>
                  <option>English</option>
                  <option>Yoruba</option>
                  <option>Hausa</option>
                  <option>Igbo</option>
                  <option>Pidgin English</option>
                </select>
              </div>

              <button
                type="submit"
                className={`w-full py-3 rounded-lg text-white font-semibold transition-all flex items-center justify-center gap-2 ${
                  userType === 'farmer'
                    ? 'bg-green-600 hover:bg-green-700'
                    : userType === 'consumer'
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-orange-600 hover:bg-orange-700'
                }`}
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </button>
            </form>
          )}

          {/* Step 2: Role-Specific Information */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-2xl font-bold mb-6">
                {userType === 'farmer' ? 'Farm Details' : userType === 'consumer' ? 'Delivery Information' : 'Rider Details'}
              </h2>

              {userType === 'farmer' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Farm Name *</label>
                    <input
                      type="text"
                      placeholder="e.g., Green Valley Farms"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Farm Location *</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="State, Local Government Area"
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Farm Size (Hectares)</label>
                    <input
                      type="number"
                      placeholder="e.g., 2.5"
                      step="0.1"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Primary Crops (Select all that apply)</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Tomatoes', 'Vegetables', 'Fruits', 'Grains', 'Tubers', 'Legumes'].map((crop) => (
                        <label key={crop} className="flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input type="checkbox" className="w-4 h-4 text-green-600" />
                          <span className="text-sm">{crop}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {userType === 'consumer' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Address *</label>
                    <textarea
                      placeholder="Enter your full delivery address"
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                      required
                    ></textarea>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">State *</label>
                      <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none" required>
                        <option value="">Select state</option>
                        <option>Lagos</option>
                        <option>Ogun</option>
                        <option>Kano</option>
                        <option>Rivers</option>
                        <option>Enugu</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Local Government Area *</label>
                      <input
                        type="text"
                        placeholder="Enter LGA"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Dietary Preferences (Optional)</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Organic Only', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Diabetic-Friendly', 'Low-Sodium'].map((pref) => (
                        <label key={pref} className="flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input type="checkbox" className="w-4 h-4 text-blue-600" />
                          <span className="text-sm">{pref}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {userType === 'rider' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Vehicle Type *</label>
                    <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none" required>
                      <option value="">Select vehicle type</option>
                      <option>Motorcycle</option>
                      <option>Tricycle (Keke)</option>
                      <option>Van</option>
                      <option>Truck</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Vehicle Registration Number *</label>
                    <input
                      type="text"
                      placeholder="e.g., ABC-123-XY"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Operating Area *</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="e.g., Lagos Island, Ikeja, Victoria Island"
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Do you have a cooling box?</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input type="radio" name="coolingBox" value="yes" className="w-4 h-4 text-orange-600" />
                        <span>Yes</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="coolingBox" value="no" className="w-4 h-4 text-orange-600" />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                </>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="flex-1 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className={`flex-1 py-3 rounded-lg text-white font-semibold transition-all flex items-center justify-center gap-2 ${
                    userType === 'farmer'
                      ? 'bg-green-600 hover:bg-green-700'
                      : userType === 'consumer'
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-orange-600 hover:bg-orange-700'
                  }`}
                >
                  {userType === 'farmer' ? 'Continue' : 'Complete Registration'}
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Farmer Verification (Farmers only) */}
          {step === 3 && userType === 'farmer' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-2xl font-bold mb-2">Verification & Payment</h2>
              <p className="text-gray-600 mb-6">This helps us verify your identity and set up your farmer wallet</p>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Identity Verification</h3>
                    <p className="text-sm text-blue-800">
                      This builds your digital financial identity and unlocks access to microloans and premium features.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">ID Type *</label>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none" required>
                  <option value="">Select ID type</option>
                  <option>National ID Card</option>
                  <option>Voter's Card</option>
                  <option>Driver's License</option>
                  <option>International Passport</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">ID Number *</label>
                <input
                  type="text"
                  placeholder="Enter your ID number"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Upload ID Photo *</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-all cursor-pointer">
                  <Camera className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                  <input type="file" className="hidden" accept="image/*" />
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Payment Information</h3>
                <p className="text-sm text-gray-600 mb-3">Choose how you'd like to receive payments</p>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Bank Name *</label>
                  <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none mb-3" required>
                    <option value="">Select bank</option>
                    <option>Access Bank</option>
                    <option>GTBank</option>
                    <option>First Bank</option>
                    <option>Zenith Bank</option>
                    <option>UBA</option>
                  </select>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">Account Number *</label>
                  <input
                    type="text"
                    placeholder="0123456789"
                    maxLength={10}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none mb-3"
                    required
                  />

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <input type="checkbox" className="w-4 h-4 text-green-600" />
                    <span>Also accept mobile money (Flutterwave, Paystack)</span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Need Help?</h4>
                <p className="text-sm text-gray-700">
                  Contact your local <strong>Village Agro Agent</strong> for assistance with registration and verification.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="flex-1 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold transition-all flex items-center justify-center gap-2"
                >
                  Complete Registration
                  <CheckCircle2 className="w-5 h-5" />
                </button>
              </div>
            </form>
          )}

          {/* Already have account link */}
          {step > 0 && (
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="text-green-600 hover:text-green-700 font-semibold"
                >
                  Sign in
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
