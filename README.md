# 🎮 GG-LOOTBOX – Gaming Accessories E-commerce Store

Welcome to **GG-LOOTBOX**, your ultimate destination for high-performance gaming gear. This full-stack project is built using **Next.js (Frontend)** and **Django (Backend)**, providing a lightning-fast, visually stunning, and fully functional shopping experience.

---

## 🚀 Tech Stack

| Frontend               | Backend       | Database | Auth                             | Integrations         |
|------------------------|---------------|----------|----------------------------------|----------------------|
| Next.js + Tailwind CSS | Django + DRF  | MySQL    | Firebase (Email/Password, Google) | EmailJS              |

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
- 📧 **Email Contact Form – powered by EmailJS**  
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
- 🔵 Google Login Integration  
- 👤 User dropdown in Navbar with Logout  

---

## 📧 Email Support (EmailJS)

Allow users to send messages via contact form without a backend.

### Setup:
- Create `.env.local` in `frontend/`:

```env
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_PUBLIC_KEY=your_public_key
```

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
### ▶️ Project Working Demo  

[![Watch the demo on YouTube](./frontend/public/images/thumbnail.png)](https://youtu.be/essd_1QoMFk)

---

## 📸 Project Preview

### 🏠 Homepage  
![Homepage](./frontend/public/images/homepage.png)

### 🏠 Homepage - Alt Layout  
![Homepage2](./frontend/public/images/homepage2.png)

### 🏠 Homepage Footer  
![Homepage Footer](./frontend/public/images/homepage_footer.png)

### 🛍️ All Products Page  
![Product Page](./frontend/public/images/productpage.png)

### 🔎 Product Detail Page  
![Product Detail](./frontend/public/images/productdetailspage.png)

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

### 🔐 Login Page  
![Login](./frontend/public/images/login.png)

### 🧾 Register Page  
![Register](./frontend/public/images/register.png)

### 🧠 About Page  
![About](./frontend/public/images/aboutpage.png)

### 🛠️ Django Admin Page  
![Django Admin](./frontend/public/images/djangopage.png)

### 📊 Database Structure – View 1  
![Database1](./frontend/public/images/database1.png)

### 📊 Database Structure – View 2  
![Database2](./frontend/public/images/database2.png)

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
