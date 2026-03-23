import { pool } from '../config/db';

async function initDB() {
  try {
    console.log("Dropping existing tables for a clean restart...");
    
    // Drop in reverse order of dependencies
    await pool.query("DROP TABLE IF EXISTS refresh_tokens");
    await pool.query("DROP TABLE IF EXISTS video_progress");
    await pool.query("DROP TABLE IF EXISTS enrollments");
    await pool.query("DROP TABLE IF EXISTS videos");
    await pool.query("DROP TABLE IF EXISTS sections");
    await pool.query("DROP TABLE IF EXISTS subjects");
    await pool.query("DROP TABLE IF EXISTS users");

    console.log("Initializing database schema...");

    // 1. Users table (matching auth.ts requirements)
    await pool.query(`
      CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. Subjects table (including category)
    await pool.query(`
      CREATE TABLE subjects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100),
        description TEXT,
        thumbnail_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 3. Sections table
    await pool.query(`
      CREATE TABLE sections (
        id INT AUTO_INCREMENT PRIMARY KEY,
        subject_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        order_index INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
      );
    `);

    // 4. Videos table
    await pool.query(`
      CREATE TABLE videos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        section_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        youtube_url VARCHAR(255) NOT NULL,
        order_index INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (section_id) REFERENCES sections(id) ON DELETE CASCADE
      );
    `);

    // 5. Enrollments table (missing in original initDB)
    await pool.query(`
      CREATE TABLE enrollments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        subject_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
        UNIQUE KEY user_subject_unique (user_id, subject_id)
      );
    `);

    // 6. Video Progress table
    await pool.query(`
      CREATE TABLE video_progress (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        video_id INT NOT NULL,
        is_completed BOOLEAN DEFAULT FALSE,
        last_watched_time INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE,
        UNIQUE KEY user_video_unique (user_id, video_id)
      );
    `);

    // 7. Refresh Tokens table
    await pool.query(`
      CREATE TABLE refresh_tokens (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        token VARCHAR(500) NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    console.log("Database schema initialized successfully.");
  } catch (error) {
    console.error("Error initializing database schema:", error);
  } finally {
    await pool.end();
  }
}

initDB();
