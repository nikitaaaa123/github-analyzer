---

# 🚀 GitHub Profile Analyzer API

A backend service built with **Node.js**, **Express**, and **MySQL** that analyzes GitHub user profiles using the GitHub Public API. The service calculates unique insights such as "Total Stars" and "Top Programming Languages" and stores them in a cloud-hosted MySQL database.

## 🔗 Live Links
- **GitHub Repository:** [https://github.com/nikitaaaa123/github-analyzer](https://github.com/nikitaaaa123/github-analyzer)
- **Live Deployed API:** [https://github-analyzer-7hyk.onrender.com](https://github-analyzer-7hyk.onrender.com)

---

## ✨ Features
- **Profile Analysis:** Automatically fetches data like followers, following, and public repository counts.
- **Custom Insights:** 
    - **Total Stars:** Calculates the total number of stars the user has received across all public repositories.
    - **Top Languages:** Identifies the user's top 3 most used programming languages based on their repositories.
- **Data Persistence:** Stores and updates (Upsert) data in a **MySQL** database (Aiven Cloud).
- **RESTful API:** Provides endpoints to retrieve a list of all analyzed profiles or a specific user's data.

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MySQL (Cloud-hosted via Aiven)
- **API Integration:** GitHub REST API (using Axios)
- **Deployment:** Render (API) & Aiven (Database)
- **Environment Management:** Dotenv

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/analyze/:username` | Fetches GitHub data, calculates insights, and saves to the database. |
| `GET` | `/api/profiles` | Retrieves all analyzed profiles from the database. |
| `GET` | `/api/profiles/:username` | Retrieves a specific user's analysis from the database. |

### Example Request (Postman)
**POST** `https://github-analyzer-7hyk.onrender.com/api/analyze/sarthakjalan05`

---

## 🏗️ Database Schema
The project uses a MySQL table named `profiles`. The schema is as follows:

```sql
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

---

## 🚀 Local Setup Instructions

1. **Clone the repo:**
   ```bash
   git clone https://github.com/nikitaaaa123/github-analyzer.git
   cd github-analyzer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=your_password
   DB_NAME=github_analyzer
   GITHUB_TOKEN=your_github_personal_access_token
   ```

4. **Setup Database:**
   Run the SQL code in `schema.sql` inside your local MySQL Workbench.

5. **Run the server:**
   ```bash
   npm run dev
   ```

---

## 📁 Project Structure
```text
├── config/
│   └── db.js            # MySQL connection with SSL for cloud DB
├── controllers/
│   └── profileController.js # Business logic for GitHub API & DB queries
├── routes/
│   └── profileRoutes.js # API route definitions
├── .env                 # Environment secrets (not uploaded to GitHub)
├── .gitignore           # Ignores node_modules and .env
├── server.js            # Entry point for the application
├── schema.sql           # Database schema export
└── package.json         # Project dependencies and scripts
```

---

## ✅ Submission Checklist
- [x] GitHub repository link
- [x] Live deployed API URL
- [x] README file with setup instructions
- [x] Database schema/export
- [x] Postman collection (Optional)

---

### Author
**Nikita Bhansali**  
*Full Stack Developer Intern Task*
