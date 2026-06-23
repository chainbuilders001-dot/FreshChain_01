import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './app/context/ThemeContext';
import { LandingPage } from './app/components/LandingPage';
import { FarmerDashboard } from './app/components/FarmerDashboard';
import { ConsumerMarketplace } from './app/components/ConsumerMarketplace';
import { RiderDashboard } from './app/components/RiderDashboard';
import { LoginPage, SignUpPage } from './app/components/AuthPages';
import { FarmerProfile, ConsumerProfile, RiderProfile } from './app/components/ProfilePages';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/farmer" element={<FarmerDashboard />} />
          <Route path="/farmer/profile" element={<FarmerProfile />} />
          <Route path="/consumer" element={<ConsumerMarketplace />} />
          <Route path="/consumer/profile" element={<ConsumerProfile />} />
          <Route path="/rider" element={<RiderDashboard />} />
          <Route path="/rider/profile" element={<RiderProfile />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
