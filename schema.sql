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
    -- Custom Insights --
    total_stars INT DEFAULT 0,
    top_languages VARCHAR(255), 
    analysis_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);