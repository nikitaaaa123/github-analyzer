const axios = require('axios');
const db = require('../config/db');

// Helper: Fetch extra insights from user repos
async function getRepoInsights(username) {
    const response = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100`, {
        headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` }
    });
    
    const repos = response.data;
    let totalStars = 0;
    const languages = {};

    repos.forEach(repo => {
        totalStars += repo.stargazers_count;
        if (repo.language) {
            languages[repo.language] = (languages[repo.language] || 0) + 1;
        }
    });

    // Sort languages and take top 3
    const topLangs = Object.keys(languages)
        .sort((a, b) => languages[b] - languages[a])
        .slice(0, 3)
        .join(', ');

    return { totalStars, topLangs };
}

exports.analyzeProfile = async (req, res) => {
    const { username } = req.params;

    try {
        // 1. Fetch Basic Profile
        const userRes = await axios.get(`https://api.github.com/users/${username}`, {
            headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` }
        });
        const d = userRes.data;

        // 2. Fetch Insights (Stars & Languages)
        const insights = await getRepoInsights(username);

        // 3. Save or Update in MySQL
        const query = `
            INSERT INTO profiles (username, name, bio, location, avatar_url, public_repos, followers, following, account_created_at, total_stars, top_languages)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE 
            name=VALUES(name), bio=VALUES(bio), public_repos=VALUES(public_repos), 
            followers=VALUES(followers), total_stars=VALUES(total_stars), top_languages=VALUES(top_languages);
        `;

    const formattedDate = d.created_at.replace('T', ' ').replace('Z', '');

    await db.execute(query, [
        d.login, 
        d.name, 
        d.bio, 
        d.location, 
        d.avatar_url, 
        d.public_repos, 
        d.followers, 
        d.following, 
        formattedDate, // <--- Use the cleaned date here
        insights.totalStars, 
        insights.topLangs
    ]);

        res.status(200).json({ message: "Analysis complete", data: { ...d, ...insights } });

    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.message });
    }
};

exports.getAllProfiles = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM profiles ORDER BY analysis_date DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProfileByUsername = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM profiles WHERE username = ?', [req.params.username]);
        if (rows.length === 0) return res.status(404).json({ message: "Profile not found in database" });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};