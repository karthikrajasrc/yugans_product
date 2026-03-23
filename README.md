# Yugan's Product - Organic Food E-Commerce Platform

Yugan's Product is a full-stack e-commerce platform specializing in organic food products including multigrains, spices, seeds, and natural products. Built with modern web technologies, it offers a complete shopping experience with user authentication, product management, shopping cart, and integrated payment processing.

## 🌟 Features

### Authentication & User Management

- **Email/Password Registration & Login** with secure password hashing
- **Google OAuth** integration via Firebase
- **Role-based Access Control**: Admin and User roles
- **JWT-based Sessions** with secure cookie storage

### Product Management

- **Admin Dashboard** for complete product inventory management
- **Image Upload** with Cloudinary integration
- **Product Categories**: Multigrains, Masalas, Seeds, and Spices
- **CRUD Operations**: Add, edit, delete, and view products

### Shopping Experience

- **Public Browsing**: Home page with product showcase
- **Authenticated Shopping**: Cart management and order history
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Notifications** with React Hot Toast

### Payment Integration

- **Razorpay Payment Gateway** for secure transactions
- **Cryptographic Verification** of payment signatures
- **Order Processing** with transaction validation

## 🛠️ Tech Stack

### Backend

- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose** ODM
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Cloudinary** for image storage
- **Razorpay** for payments
- **Multer** for file uploads

### Frontend

- **React 19** with **Vite** build tool
- **Firebase** for Google OAuth
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API calls
- **React Hot Toast** for notifications

## 🚀 Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB database
- Firebase project with Google OAuth configured
- Cloudinary account for image storage
- Razorpay account for payments

### Backend Setup

1. Navigate to the Backend directory:

   ```bash
   cd Backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the Backend directory with the following variables:

   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   NODE_ENV=development
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the Frontend directory:

   ```bash
   cd Frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the Frontend directory with the following variables:

   ```
   VITE_API_URL=http://localhost:5000
   VITE_GOOGLE_KEY=your_firebase_web_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 📖 Usage

1. **First User Registration**: The first user to register automatically becomes an Admin
2. **Admin Functions**:
   - Access the Admin panel to manage products
   - Add new products with images
   - Edit or delete existing products
3. **User Functions**:
   - Browse products on the Home page
   - Register/Login to access shopping features
   - Add products to cart
   - Complete purchases via Razorpay integration
   - View order history

## 🔗 API Endpoints

### Authentication

- `POST /auth/register` - Register new user
- `POST /auth/login` - Email/password login
- `POST /auth/googlelogin` - Google OAuth login
- `GET /auth/me` - Get current user (protected)
- `POST /auth/logout` - Logout user (protected)

### Products

- `POST /product/add` - Create product with image upload (Admin only)
- `GET /product/all` - Fetch all products
- `PUT /product/update/:id` - Update product (Admin only)
- `POST /product/delete/:id` - Delete product (Admin only)

### Payments

- `POST /api/payment/create-order` - Create Razorpay order
- `POST /api/payment/verify-payment` - Verify payment transaction

## 🏗️ Project Structure

```
YP/
├── Backend/
│   ├── Controllers/
│   │   ├── authController.js
│   ├── Middlewares/
│   │   ├── auth.js
│   │   └── multer.js
│   ├── Model/
│   │   ├── authModel.js
│   │   └── productModel.js
│   ├── Routers/
│   │   ├── authRouter.js
│   │   ├── Payment.js
│   │   ├── productRouter.js
│   │   └── Razorpay.js
│   ├── app.js
│   ├── cloudinary.js
│   ├── package.json
│   └── server.js
└── Frontend/
    ├── public/
    ├── src/
    │   ├── Auth/
    │   ├── Components/
    │   ├── Images/
    │   ├── Pages/
    │   ├── protectedInstances/
    │   ├── Routes/
    │   ├── App.css
    │   ├── App.jsx
    │   ├── firebaseConfig.js
    │   ├── index.css
    │   └── main.jsx
    ├── eslint.config.js
    ├── package.json
    ├── vite.config.js
    └── README.md
```

## 🔒 Security Features

- **Password Hashing**: Bcrypt with 10-round salt
- **JWT Authentication**: Secure token-based sessions
- **CORS Protection**: Restricted to production domains
- **Payment Verification**: HMAC-SHA256 signature validation
- **File Upload Security**: Restricted file types and Cloudinary storage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For questions or support, please contact the development team.

---

**Built with ❤️ for organic food enthusiasts**
