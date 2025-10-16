# Amazon Listing Optimizer

This is a full-stack web application designed to optimize Amazon product listings using AI. The application scrapes product data using an ASIN, sends it to an AI model via the OpenRouter API for enhancement, and stores the optimization history in a MySQL database. The user can view a side-by-side comparison of the original and AI-optimized content.

## Features

-   **Scrape by ASIN:** Fetches product title, bullets, and description from an Amazon product page.
-   **AI-Powered Optimization:** Generates an improved title, five concise bullet points, a persuasive description, and relevant keywords.
-   **Side-by-Side Comparison:** A clear user interface to compare the original and optimized listing content.
-   **Optimization History:** Stores and retrieves all previous optimizations for a given ASIN.

## Tech Stack

-   **Frontend:** React.js
-   **Backend:** Node.js
-   **Database:** MySQL
-   **AI Service:** OpenRouter API (acting as a gateway to various LLMs)
-   **Dependencies:** `mysql2`, `node-fetch`, `dotenv`, `cors`, `express`

---

## Project Setup

Follow these steps to get the project running locally.

### 1. Prerequisites

-   Node.js (v18 or newer recommended)
-   Git
-   A running MySQL server

### 2. Clone the Repository

```bash
git clone https://github.com/rachitneedcse/SalesDuo_Assignment.git
cd SalesDuo_Assignment