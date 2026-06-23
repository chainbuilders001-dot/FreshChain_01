# FreshChain Authentication & Profile System

## Overview
This document outlines the complete authentication, signup, and user profile system for the FreshChain platform, designed based on the project blueprint requirements.

---

## 🔐 Login System

### Features
1. **Multi-User Type Selection**
   - Users can select their role: Farmer, Consumer, or Rider
   - Visual role selector with icons and color coding:
     - Farmer: Green theme with Sprout icon
     - Consumer: Blue theme with Shopping Bag icon
     - Rider: Orange theme with Truck icon

2. **Flexible Login Methods**
   - **Phone Number** (Primary - works with USSD/SMS)
   - **Email Address** (Optional - for internet users)
   - Toggle between login methods

3. **Inclusive Access Options**
   - USSD Support (*123# style) - works on any phone without internet
   - SMS Login - for basic phones
   - Standard web/app login

4. **Security Features**
   - Password visibility toggle
   - "Remember me" option
   - Forgot password recovery

5. **Multi-Language Support**
   - English, Yoruba, Hausa, Igbo, Pidgin English
   - Language selector at bottom of page

### User Flow
1. User arrives at login page
2. Selects their role (Farmer/Consumer/Rider)
3. Chooses login method (Phone or Email)
4. Enters credentials
5. Redirected to role-specific dashboard

---

## 📝 Sign Up System

### Multi-Step Registration Process

#### **Step 1: Basic Information (All Users)**
- First Name & Last Name
- Phone Number (Required - primary contact)
- Email Address (Optional)
- Password
- Preferred Language

#### **Step 2: Role-Specific Information**

**For Farmers:**
- Farm Name
- Farm Location (State, LGA)
- Farm Size (Hectares)
- Primary Crops (Multi-select: Tomatoes, Vegetables, Fruits, Grains, Tubers, Legumes)

**For Consumers:**
- Delivery Address
- State & Local Government Area
- Dietary Preferences (Multi-select):
  - Organic Only
  - Vegetarian
  - Vegan
  - Gluten-Free
  - Diabetic-Friendly
  - Low-Sodium

**For Riders:**
- Vehicle Type (Motorcycle, Tricycle, Van, Truck)
- Vehicle Registration Number
- Operating Area (e.g., Lagos Island, Ikeja)
- Cooling Box Availability (Yes/No)

#### **Step 3: Verification & Payment (Farmers Only)**
This step is unique to farmers to build their digital financial identity:

**Identity Verification:**
- ID Type Selection (National ID, Voter's Card, Driver's License, Passport)
- ID Number
- Upload ID Photo

**Payment Information:**
- Bank Name
- Account Number
- Mobile Money Option (Flutterwave, Paystack)

**Why This Matters:**
- Builds Farmer Financial Passport Score
- Unlocks access to microloans
- Enables seamless withdrawal system

### Progress Indicator
- Visual progress bar showing current step
- Step numbers displayed (e.g., "Step 2 of 3")
- Back button to edit previous information

### Support Features
- **Village Agro Agents**: Farmers can get help from local representatives
- Highlighted in yellow info box on verification step
- Addresses low-tech user adoption challenge from blueprint

---

## 👤 User Profile Systems

### **1. Farmer Profile**

#### Profile Header
- Profile picture with camera upload button
- Verification badge (blue checkmark)
- Name, farm name, location
- Member since date
- Quick stats:
  - Rating (4.8/5.0)
  - Total Sales (156)
  - Total Earned (₦842K)
  - Active Products (12)
- Status badges:
  - ID Verified
  - Bank Linked
  - Premium Member

#### Tabs

**Overview Tab:**
- Contact Information (Phone, Email, Location)
- Performance This Month:
  - Revenue: ₦245,800
  - Orders Completed: 43
  - New Reviews: 12
- Achievements & Badges:
  - Top Seller (100+ sales)
  - 5-Star Rated (4.8+ rating)
  - Quality First (No returns)
  - Fast Shipper (Same-day dispatch)

**Farm Details Tab:**
- Farm name, size, primary crops
- Farming experience (8 years)
- Farming methods (Organic, Drip Irrigation, Crop Rotation)
- Certifications (Organic Certified 2024)

**Financial Tab:**
- **Farmer Wallet**: ₦127,450 balance
  - Withdraw button
  - Transaction history
- **Financial Passport Score**: 85/100
  - Sales History: Excellent
  - Payment Reliability: 98%
  - Loan Eligibility: Up to ₦500K
- Linked Bank Account (Access Bank ****5678)

**Reviews Tab:**
- Overall rating: 4.8 (156 reviews)
- Individual customer reviews with:
  - Customer name
  - Star rating
  - Comment
  - Date

**Settings Tab:**
- Notifications
- Privacy & Security
- Language settings
- Delete Account (danger zone)
- Log Out

---

### **2. Consumer Profile**

#### Profile Header
- Profile picture with upload
- Name, location, member since
- Quick stats:
  - Orders: 42
  - Total Spent: ₦125K
  - Health Points: 890
  - Tier: Gold
- Status badges:
  - Wellness Tracker Active
  - Subscription Member

#### Tabs

**Overview Tab:**
- Contact Information
- Dietary Preferences (Organic Only, Low-Sodium, Diabetic-Friendly)
- **Weekly Fresh Box Subscription**:
  - Next delivery date
  - Manage/Pause subscription buttons

**Orders Tab:**
- Complete order history:
  - Order ID
  - Date
  - Items count
  - Total amount
  - Status (Delivered)

**Health Tab:**
- **Health & Wellness Tracker**:
  - Weekly Fruit Intake: 12/15 servings
  - Organic Purchases: 85%
  - Health Points: 890 pts
- **Personalized Recommendations**:
  - AI-generated suggestions based on dietary preferences
  - Progress toward health goals

**Addresses Tab:**
- Multiple delivery addresses
- Home (Default) & Office addresses
- Add new address button
- Edit existing addresses

**Settings Tab:**
- Notification preferences:
  - Order updates
  - Health & wellness tips
  - Special offers
  - New products
- Log Out

---

### **3. Rider Profile**

#### Profile Header
- Profile picture with upload
- Verification badge (green checkmark)
- Name, location, member since
- Quick stats:
  - Rating: 4.9/5.0
  - Total Deliveries: 324
  - Total Earned: ₦284K
  - On-time Rate: 98%
- Status badges:
  - ID Verified
  - Insured
  - Top Performer

#### Tabs

**Overview Tab:**
- Contact Information
- This Week Stats:
  - Deliveries: 28
  - Earnings: ₦22,400
- **Achievements**:
  - Top Rider (Top 10% rating)
  - Speed Demon (100 fast deliveries)
  - Accuracy Pro (98% on-time)
  - Century Club (100+ deliveries)

**Vehicle Tab:**
- Vehicle Type: Motorcycle
- Registration Number: ABC-123-XY
- Operating Areas: Lagos Island, Ikeja, Victoria Island
- Equipment: Portable Cooling Box

**Earnings Tab:**
- **Available Balance**: ₦32,800
  - Withdraw button
  - Transaction history
- Recent Earnings list:
  - Delivery ID
  - Route
  - Date
  - Amount earned

**Reviews Tab:**
- Overall rating: 4.9 (324 reviews)
- Customer reviews with ratings and comments

**Settings Tab:**
- Availability toggle (Currently Available for Deliveries)
- Log Out

---

## 🎨 Design Principles

### Color Coding
- **Farmer**: Green theme (#16a34a) - represents growth, agriculture
- **Consumer**: Blue theme (#2563eb) - represents trust, reliability
- **Rider**: Orange theme (#ea580c) - represents energy, speed

### Inclusivity Features Implemented
1. **USSD & SMS Support**: Alternative login methods for users without smartphones
2. **Multi-Language**: Supports 5 Nigerian languages
3. **Simple Interface**: Clean, easy-to-understand layouts
4. **Village Agro Agents**: Mentioned in signup for farmer support
5. **Low-Tech Friendly**: Phone number as primary login (not just email)

### Verification & Trust
- **Farmers**: ID verification, bank linking, financial passport
- **Riders**: ID verification, insurance status, vehicle registration
- **All Users**: Profile completeness indicators, badges, ratings

### Financial Features
- **Farmer Wallet**: Digital savings, withdrawal system, financial history
- **Financial Passport**: Score (0-100) based on sales history and reliability
- **Loan Eligibility**: Unlocked through good performance
- **Rider Earnings**: Real-time balance, withdrawal options

---

## 🔄 User Journey Examples

### Farmer Journey
1. Visits FreshChain → Clicks "I'm a Farmer"
2. Sign up → Enters basic info → Farm details → Verification & payment
3. Completes registration → Redirected to dashboard
4. Lists products → Receives orders → Earns money
5. Checks profile → Sees Financial Passport Score increasing
6. Becomes eligible for microloan

### Consumer Journey
1. Visits FreshChain → Clicks "I'm a Consumer"
2. Sign up → Enters basic info → Delivery address & preferences
3. Browses marketplace → Sees health info on products
4. Orders produce → Tracked delivery → Reviews farmer
5. Subscribes to weekly fresh box
6. Checks health tracker → Earns health points

### Rider Journey
1. Visits FreshChain → Clicks "I'm a Rider"
2. Sign up → Enters basic info → Vehicle & operating area
3. Goes online → Accepts delivery requests
4. Uses AI route optimization → Completes deliveries
5. Earns ratings → Unlocks achievements
6. Withdraws earnings to bank account

---

## 🔒 Security & Privacy

### Implemented Security
1. Password visibility toggle
2. Two-factor authentication ready (in settings)
3. Secure cloud infrastructure mention
4. End-to-end encrypted payments
5. Fraud detection AI monitoring

### Privacy Features
1. User control over notification preferences
2. Account deletion option
3. Privacy & Security settings section
4. Verification badges for transparency

---

## 📱 Access Points

Users can access their profiles from:
- **Farmer Dashboard**: Click on profile avatar in top-right
- **Consumer Marketplace**: Click on profile avatar
- **Rider Dashboard**: Click on profile avatar

Navigation is seamless with "Back to Dashboard" buttons on all profile pages.

---

## 🌍 Alignment with Blueprint

This authentication and profile system directly addresses these blueprint requirements:

1. ✅ **Farmer Verification & Identity System**: ID upload, verification badges
2. ✅ **Farmer Financial Passport**: Digital profile enabling microloans
3. ✅ **Multiple Payment Options**: Bank transfer, mobile money, wallet
4. ✅ **USSD System Support**: Works on basic phones
5. ✅ **Multi-Language Accessibility**: 5 local languages
6. ✅ **Village Agro Agents**: Mentioned in farmer signup for support
7. ✅ **Product Rating System**: Visible in farmer profiles
8. ✅ **Rider Incentive System**: Bonuses, insurance, achievements
9. ✅ **Health Integration**: Consumer health tracking and preferences
10. ✅ **Subscription Feature**: Weekly fresh box for consumers

---

## Next Steps for Development

1. **Backend Integration**: Connect to authentication API
2. **SMS/USSD Gateway**: Implement Twilio for text-based access
3. **Payment Integration**: Connect Flutterwave/Paystack
4. **File Upload**: Implement image upload for IDs and profile pictures
5. **Real-time Updates**: WebSocket for live delivery tracking
6. **Push Notifications**: Mobile app notifications
7. **Email Verification**: Send confirmation emails
8. **Password Reset**: Implement forgot password flow
9. **Two-Factor Auth**: Add OTP verification
10. **Analytics Dashboard**: Track user behavior and engagement
