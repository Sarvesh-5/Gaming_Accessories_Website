# 🎮 FlashFlow – Gaming Accessories E-commerce Store

Welcome to **FlashFlow**, your ultimate destination for high-performance gaming gear. This full-stack project is built with ❤️ using **Next.js (Frontend)** and **Django (Backend)**, providing a lightning-fast, visually stunning, and fully functional shopping experience.

---

## 🚀 Tech Stack

| Frontend | Backend | Database | Auth | Payments |
|----------|---------|----------|------|----------|
| Next.js + Tailwind CSS | Django + DRF | MySQL | Firebase Auth + Facebook Login | Stripe |

---

## 🧩 Features

- 🔍 **Advanced Product Search** with category & typo support  
- 🧡 **Wishlist** & 🛒 **Cart** using Zustand (Global State)  
- 💸 **Add to Cart + Checkout** with real-time total and coupon support  
- 📦 **Order Tracking** and **My Orders** history  
- 🧾 **Product Details Page** with:
  - Sticky image gallery
  - Variant support
  - FAQs, Reviews, and Ratings breakdown
  - Recommendations (You Might Also Like)

- 🧠 **AI Chatbot** for smart customer support  
- 📬 **Newsletter Signup**, SEO tags, and responsive design  

---

## 👥 Pages

- Home (`/`)
- All Products (`/products`)
- Product Detail (`/product/[slug]`)
- Wishlist (`/wishlist`)
- Cart (`/cart`)
- Checkout & Address Form
- About Us
- Contact Us
- My Orders (`/my-orders`)
- Admin Panel (for order management)

---

## 🔐 Authentication

- 🔓 Firebase Login with Email/Password
- 🔵 Facebook Login Integration
- 👤 User dropdown in Navbar with Logout

---

## 💳 Payments

Integrated with **Stripe** for secure and fast payment processing. Supports:
- Address Entry
- Order Summary
- Stripe Checkout
- Email Confirmation (on order success)

---

## 🛠️ Setup Instructions

1. Clone the repo  
2. Run backend:
   ```bash
   cd backend
   pip install -r requirements.txt
   python manage.py runserver
   ```

3. Run frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

---

## 🌐 Deployment Ready

- ✅ Gunicorn, CORS, and production DB-ready
- ✅ Images served via Django
- ✅ Environment variables supported

---

## ✨ Credits

Made with 💚 by **Sarvesh Kumar**, **Sreevan Kumar**, **Sanjay**, and **Sathiyaseelan**

---

## 📸 Sneak Peek

![Preview](public/preview.gif)

---

## 📄 License

MIT License