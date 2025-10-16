CREATE TABLE IF NOT EXISTS optimization (
  id INT AUTO_INCREMENT PRIMARY KEY,
  asin VARCHAR(32) NOT NULL,
  original_title TEXT,
  original_bullets JSON,
  original_description TEXT,
  optimized_title TEXT,
  optimized_bullets JSON,
  optimized_description TEXT,
  optimized_keywords JSON,
  created_at DATETIME,
  INDEX (asin)
);
