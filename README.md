This is a simple inventory management app for computer hardware. Users can enter a hardware category, manufacturer, price and track amounts. This will be stored to a SQL database and is password protected. This project follows the Odin Projects Inventory Management Project.

This project demonstrates capability to create Express apps and utilize SQL databases.

The app is created with Express and utilizes pg for database management and ejs for view templates.

The following environment variables are necessary in development mode:

PORT
USER
DATABASE
PASSWORD
DEV
CONNECTION_STRING

Whereas if dev is set to false only:

PASSWORD
DEV
CONNECTION_STRING

are needed.
