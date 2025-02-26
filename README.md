The Mindless Lounge

Table of Contents

Project Overview

Features

Technologies Used

Installation

Usage

API Endpoints

Authentication & Security

Deployment

Future Enhancements

Contributors

License

Project Overview

The Mindless Lounge is a social media platform where users can share their thoughts in real-time and engage with posts from other users on their personalized feed. Designed to be a simple and intuitive way to express oneself without barriers, this application fosters spontaneous and free-flowing digital interactions.

Features

RESTful API: Built with Node.js and Express.js for seamless backend communication.

Modern Front-End: Developed using React to deliver a dynamic and responsive user experience.

Database Integration: Uses PostgreSQL with Sequelize ORM for efficient data handling.

User Authentication: Secure JWT-based authentication for user access management.

Real-Time Feed: Users can see posts from others in an engaging, chronological feed.

Server-Side APIs: Incorporates at least two external APIs to enhance functionality.

Environment Variables: Ensures security by protecting API keys and sensitive data.

Deployment: Live application deployed on Render with full database integration.

Polished UI: A sleek and intuitive user interface designed for seamless navigation.

Fully Responsive: Optimized for multiple screen sizes and devices.

Interactive Experience: Application dynamically responds to user input and interactions.

Technologies Used

Backend: Node.js, Express.js, PostgreSQL, Sequelize ORM

Frontend: React, React Router, CSS Frameworks

Authentication: JSON Web Tokens (JWT)

APIs: Integration of at least two server-side APIs

Version Control: Git, GitHub

Deployment: Render (for both frontend and backend)

Security: Environment variables, encrypted credentials

Installation

Prerequisites

Ensure you have the following installed on your system:

Node.js

PostgreSQL

Git

Setup

Clone the Repository:

git clone https://github.com/pojoto4/mindlessLounge.git

Navigate to Project Directory:

cd the-mindless-lounge

Install Dependencies:

npm install

Setup Environment Variables:Create a .env file and add the required API keys and database credentials.

Run Database Migrations:

npx sequelize db:migrate

Start the Application:

npm start

Usage

Once the application is running, navigate to http://localhost:3000 to access the frontend interface. Users can sign up, log in, post their thoughts, and engage with others through the live feed.

API Endpoints

Method  

Endpoint

Description

GET

/api/posts

Retrieves posts from the database

POST

/api/posts

Adds new posts to the database

POST

/api/auth/login

Authenticates user and returns JWT

POST

/api/auth/signup

Registers a new user

Authentication & Security

JWT Authentication: Secure token-based authentication ensures that only authorized users can access protected resources.

Environment Variables: API keys and database credentials are stored securely in .env files.

Data Protection: Follows industry-standard best practices for secure handling of user information.

Deployment

This application is deployed on Render and can be accessed at:🔗 Live Application🔗 GitHub Repository https://github.com/pojoto4/mindlessLounge

Future Enhancements:

Implement additional user roles and permissions.

Enhance UI with animations and improved accessibility features.

Expand API integrations for greater functionality.

Optimize database queries for improved performance.

Introduce real-time notifications and WebSocket integration.

Contributors

This project was developed by:

Justin 

Shauna 

Joe 

Sydney 

Contributions are welcome! Please follow the contribution guidelines before submitting pull requests.

License

This project is licensed under the MIT License.

For more information, visit our GitHub Repository.

https://github.com/pojoto4/mindlessLounge
