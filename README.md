# Scraping-Task

### Flat Data Scraper

This is a comprehensive solution for scraping, storing, and displaying flat data.

To initiate the project with Docker, execute the command ```docker-compose up```. This command launches several services:

- **Database:** A Postgres database is established for housing the scraped data.
- **Scraper Script:** The script designated for data scraping from the target website commences, storing the harvested data in the Postgres database.
- **Server:** A Node server service begins, facilitating access to the stored data in the database and serving it to the client (front-end) on port 3001.
- **Client:** The React frontend builds and is available on port 80.
- **Nginx:** The Nginx service initiates, serving the entirety of the application on port 8080. 

Now, the application is up and ready, and you can access it on your local machine. (http://localhost:8080)
