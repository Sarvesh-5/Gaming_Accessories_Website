# 🎮 FlashFlow – Gaming Accessories E-commerce Store

Welcome to **FlashFlow**, your ultimate destination for high-performance gaming gear. This full-stack project is built using **Next.js (Frontend)** and **Django (Backend)**, providing a lightning-fast, visually stunning, and fully functional shopping experience.

---

## 🚀 Tech Stack

| Frontend | Backend | Database | Auth |
|----------|---------|----------|------|
| Next.js + Tailwind CSS | Django + DRF | MySQL | Firebase Auth + Facebook Login |

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

## 📸 Project Preview

### 🏠 Homepage
![Homepage](./frontend/public/images/homepage.png)

### 🏠 Homepage - Alt Layout
![Homepage2](./frontend/public/images/homepage2.png)

### 🛍️ All Products Page
![Product Page](./frontend/public/images/productpage.png)

### 🔎 Product Detail Page
![Product Detail](./frontend/public/images/productdetailpage.png)

### 💖 Wishlist Page
![Wishlist](./frontend/public/images/wishlistpage.png)

### 🛒 Add to Cart Page
![Add to Cart](./frontend/public/images/addtocartpage.png)


### ✅ Checkout Page
![Checkout](./frontend/public/images/checkoutpage.png)

### 🎉 Order Placed Confirmation
![Order Placed](./frontend/public/images/orderplacedpge.png)

### 📦 My Orders
![My Orders](./frontend/public/images/myorders.png)

---

## 🗄️ Database Design

### 📊 Database Structure - View 1
![Database ERD 1](./frontend/public/images/database1.png)

### 📊 Database of products - View 2
![Database ERD 2](./frontend/public/images/database2.png)

---

## 🧰 Django Backend Page

![Django Admin](./frontend/public/images/djangopage.png)

---

## ✨ Credits

Project developed by:
- **Sarvesh Kumar R**
- **Sreevan Kumar S**
- **Sanjay S**
- **Sathiyaseelan J**

---

## 📄 License

MIT License

For more details, see the [LICENSE](LICENSE) file.
