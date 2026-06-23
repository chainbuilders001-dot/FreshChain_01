import { MemoryRouter, Routes, Route } from 'react-router';
import { ThemeProvider } from './context/ThemeContext';
import { LandingPage } from './components/LandingPage';
import { FarmerDashboard } from './components/FarmerDashboard';
import { ConsumerMarketplace } from './components/ConsumerMarketplace';
import { RiderDashboard } from './components/RiderDashboard';
import { LoginPage, SignUpPage } from './components/AuthPages';
import { FarmerProfile, ConsumerProfile, RiderProfile } from './components/ProfilePages';

export default function App() {
  return (
    <ThemeProvider>
      <MemoryRouter>
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
      </MemoryRouter>
    </ThemeProvider>
  );
}
