# **Full-Stack Developer Take-Home Assessment**

This web application designed to display a list of companies and their details, including multiple possible locations. The application consists of a frontend built with React and a backend API built with Flask. This README provides instructions on how to set up, run, and understand the application.

# **Prerequisites**

 **Before setting up the project, ensure that you have the following installed on your machine:**

- Docker (for containerization)
- Docker Compose (for managing multi-container Docker applications)
- Python (for the backend)
- Node.js (for the frontend)


# **Clone the Repository**

To clone the repository, run the following command in your terminal:

    git clone https://github.com/Anand200399/SupplyTrace-Assignment.git


# **Ensure Docker is running. Build and start the containers using Docker Compose:**

    docker-compose build
    docker-compose up

This will start the frontend and backend services as specified in the docker-compose.yml file.

# **To stop the application, run:**

    docker-compose down

# **Application Details**

**Backend**

- Port: 5001
- Description: Provides API endpoints for retrieving company data.
- Access: http://localhost:5001

The backend service is built using Flask and is configured to run in development mode. It serves API endpoints at '/companies',
'/companies/${id}' and '/companies/${id}/locations' to retrieve company information.

**Frontend**

- Port: 3000
- src/: Contains the React application source code.
- components/: Contains React components such as CompanyList and CompanyDetails.
- App.js: The main React component that renders the application.
- Dockerfile: Defines the Docker image for the frontend service.
- package.json: Lists the Node.js packages required for the frontend.


**Leaflet:** Open-source library for interactive maps.

**Docker Configuration**

- docker-compose.yml: Defines the services, networks, and volumes for Docker Compose. It includes configurations for both the frontend and backend services.


# **Code Details**
The code is organized into the following directories:

- **Directory Structure**

       SupplyTrace/
       ├── Backend/
       │   ├── app.py
       │   ├── Dockerfile
       │   └── requirements.txt
       ├── Frontend/
       │   ├── Dockerfile
       │   ├── package.json
       │   ├── src/
       │   └── public/
       ├── docker-compose.yml
       └── README.md

The code is organized into separate directories for the frontend and backend services. The backend service uses Flask and
the frontend service uses React. The code follows best practices for both technologies, including proper error handling and
logging.

**Backend**
- app.py: Contains Flask routes for handling API requests. It connects to the database and serves company data.
- Dockerfile: Defines the environment for the backend service, including Python version, dependencies, and entry point.
requirements.txt: Lists the Python dependencies for the backend service.


**Frontend**
- Dockerfile: Sets up the Node.js environment, installs dependencies, and builds the React application.
- src/: Contains components and hooks used in the React application to fetch and display company data.
- Material UI: React component library for styling, make rich and responsive UI.
- package.json: Lists dependencies for the React application, including React and Material UI.


**Networking:** The frontend and backend services communicate over a Docker network named supplytrace_company-net. Ensure this network is correctly set up in your Docker Compose file.
 

**Volumes:** Logs for the backend are stored in a local directory specified in the docker-compose.yml file.


**Environment Variables:** Both services use environment variables for configuration, such as port numbers and API endpoints.



# **Pie Chart Visualization**

The pie chart visualization is implemented using the React Chart.js library. 
A pie chart has been added to the application to show the distribution of location types. This example is currently a placeholder and does not serve dynamic data.


# **CSV Data Files**

- companies.csv: Contains information about the companies. I have added 10 new companies in this file.
- locations.csv: Contains information about the locations. Each company in 'companies.csv' has 3 locations, resulting in a total of 30 locations.


# **API Documentation Overview**

This API is documented using Swagger UI, which is automatically integrated through Flask-RESTX. Swagger UI provides an interactive interface for exploring and testing the API endpoints.

- Base URL: The base URL for accessing the API is http://localhost:5001/.

**Endpoints:**

- /companies/: Fetch all companies.
- /companies/<int:company_id>: Fetch a company by its ID.
- /companies/<int:company_id>/locations: Fetch all locations for a specific company ID.


**Response Codes:**

- 200 OK: The request was successful.
- 404 Not Found: The requested resource was not found.
- 500 Internal Server Error: An error occurred on the server.

The Swagger UI documentation includes detailed information about each endpoint, available parameters, and possible responses.
