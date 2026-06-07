-- 1. Use the default database provided by Aiven
USE defaultdb;

-- 2. Create the profiles table
CREATE TABLE IF NOT EXISTS profiles (
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

-- 3. Verify the table was created (Optional)
DESCRIBE profiles;