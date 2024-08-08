# E-Commerce Backend

## Description
E-Commerce Backend is an API designed to support the backend operations of an e-commerce site. It uses Express.js and Sequelize to manage interactions with a MySQL database.

Version: 1.0.0  
License: MIT

Dependencies:
- express: ^4.19.2
- sequelize: ^6.37.3
- mysql2: ^2.3.3

## Installation
To set up and run the E-Commerce Backend locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd e-commerce-backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Configure your MySQL database:
    - Ensure MySQL is installed and running.
    - Create a database and configure your environment variables with the database name, MySQL username, and password.

4. Initialize the database schema and seed data:
    ```bash
    mysql -u root -p
    ```
    Enter your MySQL password when prompted:
    ```sql
    source db/schema.sql
    exit
    npm run seed
    ```

5. Start the application:
    ```bash
    node server.js
    ```
    This will start the server and sync Sequelize models with your MySQL database.





## Usage
- Use an API client like Postman to test the routes.
- Access GET routes to view data for categories, products, and tags.
- Utilize POST, PUT, and DELETE routes to manage and manipulate data in your database as shown below.

![Screenshot](assets/Screenshot%202024-08-08%20123716.png)

## Technologies Used
- Node.js
- Express.js
- Sequelize (ORM for MySQL)
- MySQL

## Credits
- Author: Xavier Mendoza

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is licensed under the MIT License - see the LICENSE file for details.
