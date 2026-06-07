
---

# 🚀 GitHub Profile Analyzer API

A robust backend service built with Node.js, Express, and MySQL that analyzes GitHub user profiles. It fetches data from the GitHub Public API, calculates useful insights (like total stars and top languages), and stores the results for future retrieval.

## 🌟 Features
- **Profile Analysis:** Fetches public data including followers, following, and repo count.
- **Deep Insights:** Aggregates total stars across all public repositories and identifies the user's top 3 most used programming languages.
- **Data Persistence:** Stores analyzed profiles in a MySQL database to avoid redundant API calls.
- **Efficient Updates:** Uses "Upsert" logic to update existing profile data if analyzed again.
- **RESTful Endpoints:** Clean API structure for fetching all profiles or a specific profile from the database.

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **API:** GitHub REST API
- **Tools:** Axios, Dotenv, Cors, Mysql2

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/github-analyzer-api.git
cd github-analyzer-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Database Setup
Create a MySQL database and a table by running the following SQL commands in your MySQL Workbench or CLI:

```sql
CREATE DATABASE github_analyzer;
USE github_analyzer;

CREATE TABLE profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    bio TEXT,
    location VARCHAR(255),
    avatar_url VARCHAR(255),
    public_repos INT,
    followers INT,
    following INT,
    account_created_at DATETIME,
    total_stars INT DEFAULT 0,
    top_languages VARCHAR(255), 
    analysis_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 4. Environment Variables
Create a `.env` file in the root directory and add your credentials:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=github_analyzer
GITHUB_TOKEN=your_github_personal_access_token
```

### 5. Run the Server
```bash
# For development (using nodemon)
npm run dev

# For production
npm start
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/api/analyze/:username` | Fetches data from GitHub, calculates insights, and saves to DB. |
| **GET** | `/api/profiles` | Returns a list of all analyzed profiles stored in the DB. |
| **GET** | `/api/profiles/:username` | Returns data for a specific profile from the DB. |

---

## 📊 Useful Insights Explained
Unlike basic profile fetchers, this API provides:
1.  **Total Stars:** Calculates the sum of all stars received across all public repositories owned by the user.
2.  **Tech Stack:** Scans all repositories to determine the **top 3 most used languages**, helping to understand the user's primary expertise.

---

## 🧪 Testing with Postman
1.  **Analyze a user:** Send a `POST` request to `http://localhost:5000/api/analyze/octocat`.
2.  **View all:** Send a `GET` request to `http://localhost:5000/api/profiles`.
3.  **View one:** Send a `GET` request to `http://localhost:5000/api/profiles/octocat`.

---

## 📝 License
This project is open-source and available under the [MIT License](LICENSE).