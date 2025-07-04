# MERN Web Application

A full-stack **MERN (MongoDB, Express, React, Node.js)** web application where users can:

- Register
- Log in
- Submit articles
- View the frequency of specific letters (**R, I, M, E, S**) visualized as **Bar and Pie charts**

---

## Features

- **User Registration and Login:**  
  Secure user authentication using JWT.

- **Article Submission:**  
  Users can submit articles with a title and content.

- **Letter Frequency Analysis:**  
  Automatically calculates the frequency of letters R, I, M, E, S in article content.

- **Data Visualization:**  
  Displays letter frequency using **Bar and Pie charts** (powered by Chart.js).

- **Dashboard:**  
  Shows previews of all submitted articles.

- **Detailed Article View:**  
  Displays full article content with associated charts.

- **Author Attribution:**  
  Clearly shows which user submitted each article.

- **Responsive UI:**  
  Modern, responsive design with smooth CSS animations.

---

## Setup Instructions

### Backend Setup (Node.js + MongoDB)

```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/articleApp
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:

```bash
npm start
```

Backend runs at: [http://localhost:5000](http://localhost:5000)

---

### Frontend Setup (React)

```bash
cd ../client
npm install
```

Create a `.env` file in the `client` folder:

```env
REACT_APP_API_BASE_URL=http://localhost:5000
```

Start the frontend:

```bash
npm start
```

Frontend runs at: [http://localhost:3000](http://localhost:3000)

---

## API Endpoints

### Auth Routes

| Method | Endpoint             | Description           |
| ------ | -------------------- | --------------------- |
| POST   | `/api/auth/register` | Register a new user   |
| POST   | `/api/auth/login`    | Login and get a token |

### Article Routes

| Method | Endpoint            | Description                       |
| ------ | ------------------- | --------------------------------- |
| GET    | `/api/articles`     | Fetch all articles                |
| GET    | `/api/articles/:id` | Fetch a single article by ID      |
| POST   | `/api/articles`     | Submit an article (auth required) |
| PUT    | `/api/articles/:id` | Edit/update an article (auth)     |
| DELETE | `/api/articles/:id` | Delete an article (auth)          |

---

## Final Notes

- This is a project aimed at practicing full-stack development with a focus on CRUD operations, authentication, and data visualization.
- You can easily extend the project with features like comments, likes, or image uploads.

---
