# Backend Dockerfile

# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Ensure the logs directory exists
RUN mkdir -p /app/Backend/logs


# Make port 5001 available to the world outside this container
EXPOSE 5001

# Set environment variables
ENV FLASK_APP=app.py
ENV FLASK_ENV=developmentflask

# Run Flask when the container launches
CMD ["flask", "run", "--host=0.0.0.0", "--port=5001"]
