export type UserRole = 'FARMER' | 'CONSUMER' | 'RIDER' | 'ADMIN';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  walletBalance: number;
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
  createdAt: number;
}

export interface Product {
  id: string;
  farmerId: string;
  farmerName: string;
  name: string;
  description: string;
  price: number;
  unit: string; // kg, bunch, bag
  category: string;
  image: string;
  stock: number;
  freshnessScore: number; // AI generated
  traceabilityHash: string; // Blockchain simulation
  harvestDate: number;
  location: string;
  isRescue?: boolean; // Rescue food marketplace
}

export interface Order {
  id: string;
  consumerId: string;
  farmerId: string;
  productId: string;
  quantity: number;
  totalPrice: number;
  status: 'PENDING' | 'PREPARING' | 'IN_TRANSIT' | 'DELIVERED';
  riderId?: string;
  createdAt: number;
  deliveryLocation: string;
}

export interface CropReport {
  id: string;
  farmerId: string;
  imageUrl: string;
  diagnosis: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  recommendations: string[];
  createdAt: number;
}
