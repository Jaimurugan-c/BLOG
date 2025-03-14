# BLOG
This page Done By Jai,
      A complete A Blog website.
We can write a blog We can read a blog.

Backend:
# MERN Blog Backend Documentation

## Overview
This backend is built using **Node.js, Express, MongoDB, and Mongoose** to manage blog posts. It provides CRUD operations for blogs and handles authentication using JWT.

---

## Technologies Used
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for Node.js
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **bcryptjs** - Password hashing
- **jsonwebtoken** - User authentication
- **cors** - Enables CORS for frontend communication
- **dotenv** - Manages environment variables

---

## Folder Structure
```
backend/
│-- models/
│   ├── blogModel.js
│   ├── userModel.js
│-- routes/
│   ├── blogRoutes.js
│   ├── userRoutes.js
│-- controllers/
│   ├── blogController.js
│   ├── userController.js
│-- middleware/
│   ├── authMiddleware.js
│-- config/
│   ├── db.js
│-- .env
│-- server.js
│-- package.json
```
---

## Setup and Installation
### 1. Install dependencies:
```sh
npm install
```

### 2. Configure Environment Variables (`.env`)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/blogDB
JWT_SECRET=your_secret_key
```

### 3. Start the Server:
```sh
npm run server
```
---

## Database Connection (`config/db.js`)
```js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
```
---

## API Endpoints
### 1. **Blog Routes (`routes/blogRoutes.js`)**
| Method | Endpoint        | Description             |
|--------|---------------|-------------------------|
| GET    | `/api/blogs`   | Fetch all blogs        |
| POST   | `/api/blogs`   | Create a new blog      |
| GET    | `/api/blogs/:id` | Fetch a blog by ID  |
| PUT    | `/api/blogs/:id` | Update a blog        |
| DELETE | `/api/blogs/:id` | Delete a blog        |

### 2. **User Authentication Routes (`routes/userRoutes.js`)**
| Method | Endpoint        | Description             |
|--------|---------------|-------------------------|
| POST   | `/api/users/register` | Register new user |
| POST   | `/api/users/login`    | Login user & get token |

---

## Example Request & Response
### Create a Blog (`POST /api/blogs`)
#### Request:
```json
{
    "title": "My First Blog",
    "content": "This is a test blog post.",
    "author": "John Doe",
    "image": "https://example.com/image.jpg"
}
```

#### Response:
```json
{
    "_id": "660c5c1f5d5b2a0015a86e3b",
    "title": "My First Blog",
    "content": "This is a test blog post.",
    "author": "John Doe",
    "image": "https://example.com/image.jpg",
    "createdAt": "2025-03-14T12:00:00.000Z"
}
```

---

## Middleware - Authentication (`middleware/authMiddleware.js`)
```js
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import dotenv from 'dotenv';

dotenv.config();

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};
export default protect;
```

---

## **Backend Architecture Diagram**
```plaintext
+--------------------+    +-------------------+    +-----------------+
| Client (Frontend) | -> | Express API (Node)| -> | MongoDB Database|
+--------------------+    +-------------------+    +-----------------+
          ↕                      ↕                     ↕
+--------------------+    +-------------------+    +-----------------+
| React (UI)        | -> | Controllers       | -> | Models (Mongoose)|
+--------------------+    +-------------------+    +-----------------+
```

---

## Next Steps: Setting Up the Frontend
Now that the backend is complete, the next step is to integrate it with the frontend (React + Bootstrap).

---

## Conclusion
- This backend provides APIs for **creating, reading, updating, and deleting (CRUD) blog posts**.
- JWT authentication is implemented for secure user login.
- The database is managed using **MongoDB with Mongoose ODM**.
- The next step is to connect this API to a **React frontend**.

Let me know if you need any modifications! 🚀

