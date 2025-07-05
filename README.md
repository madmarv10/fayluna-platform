# Fayluna Platform

A full-stack blog directory platform built with React frontend and Node.js/Express backend.

## 🚀 Features

- **User Authentication**: Register, login, and profile management
- **Blog Management**: Create, edit, delete, and search blogs
- **Bookmarking**: Save and manage favorite blog posts
- **User Profiles**: Follow/unfollow users, view profiles
- **Analytics**: Track blog performance and user engagement
- **File Upload**: Image upload support with Cloudinary
- **Responsive Design**: Modern UI with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Multer** - File uploads
- **Nodemailer** - Email service

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
```

### Frontend Setup
```bash
cd frontend
npm install
```

## ⚙️ Configuration

### Backend Environment Variables
Create a `.env` file in the `backend` directory:

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/bloghub

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
EMAIL_FROM=BlogHub <noreply@bloghub.com>
```

## 🚀 Running the Application

### Start Backend
```bash
cd backend
node "Fayluna server.js"
```

### Start Frontend
```bash
cd frontend
npm run dev
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Forgot password
- `POST /api/auth/reset-password` - Reset password

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `POST /api/users/:id/follow` - Follow user
- `POST /api/users/:id/unfollow` - Unfollow user
- `GET /api/users/:id/followers` - Get user followers
- `GET /api/users/:id/following` - Get user following
- `GET /api/users/my-profile` - Get current user profile

### Blogs
- `GET /api/blogs` - Get all blogs
- `POST /api/blogs` - Create new blog
- `GET /api/blogs/:id` - Get blog by ID
- `PUT /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog
- `GET /api/blogs/search` - Search blogs

### Bookmarks
- `GET /api/bookmarks` - Get user bookmarks
- `POST /api/bookmarks/:blogId` - Add bookmark
- `DELETE /api/bookmarks/:blogId` - Remove bookmark

### Analytics
- `GET /api/analytics` - Get analytics data
- `POST /api/analytics/view` - Track blog view

### Upload
- `POST /api/upload/image` - Upload image

## 🧪 Testing

Run the test script to verify API endpoints:
```bash
cd backend
node test-api.js
```

## 📁 Project Structure

```
├── backend/
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── middleware/     # Custom middleware
│   │   ├── utils/          # Utility functions
│   │   └── app.js         # Express app setup
│   ├── uploads/           # File uploads
│   └── Fayluna server.js  # Server entry point
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── hooks/         # Custom hooks
│   │   ├── context/       # React context
│   │   └── utils/         # Utility functions
│   └── public/           # Static assets
└── database/             # Database migrations and seeds
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions, please open an issue on GitHub. 