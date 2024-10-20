# SSL Certificate Expiry Checker
This project provides an automated solution for monitoring SSL certificate expiration of websites. Users can sign up, submit website URLs, and receive email notifications about certificate expiration every two hours.

# Features
* User Authentication: Secure sign-up and login with JWT functionality using PostgreSQL for user data storage.
* Website Monitoring: Users can submit website URLs they want to monitor.
* SSL Certificate Checking: The system checks the SSL certificate expiry for each submitted website every two hours.
* Email Notifications: Users receive automated email alerts when SSL certificates are close to expiration.

# Technologies Used
* Backend: Node.js
* Fronted : React
* Database: PostgreSQL
* SSL Checking: Built-in Node.js library for HTTPS requests
* Email Notifications: Nodemailer
* Task Scheduling: Node-cron for scheduling regular SSL checks

# Installation
1. Clone the repository:
```
git clone https://github.com/eraygokcee/sslCheck.git
cd sslCheck
```
2. Install the dependencies:
```
npm install
```
3. Set up the environment variables:

* DATABASE_URL: PostgreSQL connection string
* EMAIL_USER: Your email address for sending notifications
* EMAIL_PASS: Email password or app-specific password
* JWT_SECRET: Secret key for signing JWT tokens

# Start the application:
```
npm start
```
# Usage
* Sign up or log in to the system.
* Submit website URLs for SSL monitoring.
* The system will check the SSL certificates every two hours and notify users via email if any certificates are nearing expiration.
# Future Improvements
* Add a user dashboard for managing monitored URLs.
* Add functionality for users to customize the notification schedule.
* Integrate multi-language support for the email notifications.
