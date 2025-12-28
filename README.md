# 🍔 Grab Bills Tracker

A comprehensive web application for tracking and analyzing your Grab receipts (GrabFood, GrabBike, GrabCar) with automatic Gmail sync, analytics, budgeting, and AI-powered insights.
Show Image
Show Image
Show Image
✨ Features
📧 Automatic Gmail Sync

One-Click Import: Automatically fetches all Grab E-Receipts from your Gmail
Smart Parsing: Extracts order details, amounts, stores, items, and trip information
Duplicate Prevention: Intelligent detection to avoid importing the same receipt twice
Email Labeling: Automatically labels processed emails as "Processed" in Gmail
Multi-Service Support: Handles GrabFood, GrabBike, and GrabCar receipts

📊 Analytics Dashboard

Spending Trends: Visualize your spending patterns over time
Top Stores: See which restaurants or services you use most
Heatmap Calendar: GitHub-style spending intensity visualization
Day/Time Analysis: Discover when you order most frequently
AI Insights: Get personalized recommendations based on your habits
Most Ordered Items: Track your favorite dishes

💰 Budget Tracking

Monthly Budget: Set spending limits and track progress
Real-time Alerts: Get notified when approaching or exceeding budget
Spending Projections: Forecast end-of-month spending based on current trends
Historical Comparison: See how you're doing vs. previous months
Savings Tips: AI-generated recommendations to reduce spending

⭐ Favorites & Lists

Favorite Stores: Star your go-to restaurants and services
Custom Lists: Create organized lists (Work Lunches, Weekend Treats, etc.)
Quick Stats: See order counts and spending for each favorite

🔍 Advanced Filtering & Search

Real-time Search: Find bills by store, date, items, or amount
Multi-Filter Support:

Bill Type (Food, Bike, Car)
Price Range
Date Range
Sort Options


Export Data: Download bills as CSV or JSON

🎨 Modern UI/UX

Futuristic Design: Cyberpunk-inspired interface with glassmorphism
Smooth Animations: Engaging transitions and 3D tilt effects
Responsive Layout: Works perfectly on desktop, tablet, and mobile
Dark Theme: Eye-friendly dark mode with neon accents
Particle Effects: Dynamic background animations

🚀 Getting Started
Prerequisites

A Google account with Grab receipts in Gmail
Modern web browser (Chrome, Firefox, Safari, Edge)
Firebase account (free tier works fine)

Installation

Clone the repository

bashgit clone https://github.com/yourusername/grab-bills-tracker.git
cd grab-bills-tracker

Set up Firebase

Go to Firebase Console
Create a new project
Enable Authentication → Google Sign-In
Enable Firestore Database (Start in production mode, then update rules)
Get your Firebase config credentials


Configure Firebase
Open app-with-auth.js and replace the Firebase config (around line 28):

javascript   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_PROJECT_ID.appspot.com",
     messagingSenderId: "YOUR_SENDER_ID",
     appId: "YOUR_APP_ID",
     measurementId: "YOUR_MEASUREMENT_ID"
   };

Update Firestore Security Rules
In Firebase Console → Firestore Database → Rules:

javascript   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId}/{document=**} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }

Configure Gmail API Permissions
In Firebase Console → Authentication → Settings → Authorized domains:

Add your domain (e.g., localhost for local testing)
Add yourdomain.com for production


Deploy or Run Locally
Option A: Local Development

bash   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
Then open http://localhost:8000
Option B: Deploy to Firebase Hosting
bash   npm install -g firebase-tools
   firebase login
   firebase init hosting
   firebase deploy
```

## 📖 Usage Guide

### First Time Setup

1. **Sign In**
   - Click "Sign in with Google"
   - Grant Gmail read permissions (to fetch receipts)
   - Grant Gmail modify permissions (to label processed emails)

2. **Sync Your Bills**
   - Click "🔄 Sync Gmail" button
   - Wait for the app to process all your receipts
   - Bills are automatically categorized by type

3. **Explore Your Data**
   - Navigate through tabs: Bills, Analytics, Favorites, Budget
   - Use filters to narrow down results
   - Set a monthly budget to track spending

### Key Features Walkthrough

#### 📋 Bills Tab
- **Month Timeline**: Horizontal scrollable timeline showing all months with orders
- **Search**: Real-time search across stores, dates, and items
- **Filters**: Advanced filtering by type, price, date, and sort options
- **Quick Actions**: Star favorites, view details, export data

#### 📊 Analytics Tab
- **Period Selector**: View data for month, 3 months, 6 months, year, or all time
- **Quick Stats Cards**: Total spending, orders, average, and top store
- **Spending Heatmap**: Calendar view showing order frequency
- **Charts**: Line, doughnut, and bar charts for various metrics
- **AI Insights**: Automatically generated insights about your habits

#### ⭐ Favorites Tab
- **Favorite Stores**: Quick access to your starred restaurants
- **Statistics**: See order counts and spending per favorite
- **Custom Lists**: Organize bills into custom categories

#### 💰 Budget Tab
- **Set Budget**: Define monthly spending limits
- **Progress Bar**: Visual representation of budget usage
- **Alerts**: Warnings when approaching or exceeding budget
- **Projections**: Forecast based on current spending rate
- **Tips**: AI-generated savings recommendations

## 🎯 Supported Bill Types

### 🍽️ GrabFood
- Restaurant name
- Food items with quantities
- Total amount
- Delivery fees and discounts
- Order datetime

### 🏍️ GrabBike
- Trip route (from → to)
- Distance (km)
- Duration (minutes)
- Driver name and rating
- Fare breakdown

### 🚗 GrabCar
- Trip route (from → to)
- Distance (km)
- Duration (minutes)
- Driver name and rating
- Fare breakdown

## 🛠️ Tech Stack

- **Frontend**: Vanilla JavaScript (ES6+)
- **UI Framework**: Custom CSS with Glassmorphism
- **Authentication**: Firebase Authentication
- **Database**: Cloud Firestore
- **Charts**: Chart.js
- **Email Integration**: Gmail API
- **Hosting**: Firebase Hosting (recommended)

## 📁 Project Structure
```
grab-bills-tracker/
├── index.html              # Main HTML file
├── styles.css              # All styles
├── app-with-auth.js        # Main application logic
├── README.md               # This file
└── firebase.json           # Firebase config (if deploying)
🔒 Privacy & Security

Your Data: All data stays in YOUR Firebase project
Email Access: Read-only access to fetch receipts, modify access to label emails
No Third Parties: No data sent to external servers
Open Source: Review the code yourself
Firestore Rules: User-scoped security rules prevent unauthorized access

🐛 Troubleshooting
"Firestore unavailable" error

Ensure you've created a Firestore database in Firebase Console
Check that security rules are properly configured

Gmail sync returns 403 errors

Make sure you've added the gmail.modify scope
Sign out and sign in again to refresh permissions

Bills not appearing after sync

Check browser console for errors
Verify email format matches Grab's receipt format
Ensure emails are from no-reply@grab.com

Charts not rendering

Ensure Chart.js CDN is loaded
Check browser console for JavaScript errors

🚧 Roadmap

 Multi-currency support
 Receipt OCR for manual uploads
 Export to PDF with visualizations
 Spending goals and achievements
 Social sharing of stats
 Mobile app (React Native)
 Browser extension for quick access
 Integration with other food delivery services

🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

Fork the project
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request



Chart.js for beautiful charts
Firebase for backend infrastructure
Google Gmail API for email integration
The open-source community

📧 Contact
iluvsunset - bao.h0146824@gmail.com
Project Link: https://github.com/yourusername/grab-bills-tracker

Made with ❤️ and 🍔 by [iluvsunset]
Track smarter, spend wiser!

