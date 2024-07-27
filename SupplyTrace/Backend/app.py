from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_restx import Api, Resource
import pandas as pd
import logging
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

# Configure logging
log_dir = 'Backend/logs'
if not os.path.exists(log_dir):
    os.makedirs(log_dir)  # Ensure the logs directory exists
logging.basicConfig(filename=os.path.join(log_dir, 'app.log'), level=logging.INFO,
                    format='%(asctime)s:%(levelname)s:%(message)s')

# Initializing Flask-RESTX API
api = Api(app, version='1.0', title='Company API', description='A simple API for company data')

# Reading data from CSV files
companies_df = pd.read_csv('/app/companies.csv')
locations_df = pd.read_csv('/app/locations.csv')

# Defining the API namespace
ns = api.namespace('companies', description='Company operations')

# API Endpoint: Fetch all companies from CSV files
@ns.route('/')
class CompanyList(Resource):
    def get(self):
        """Fetch all companies"""
        try:
            companies = companies_df.to_dict(orient='records')
            return jsonify(companies)
        except Exception as e:
            app.logger.error(f"Error fetching companies: {e}")
            return {'error': 'Internal Server Error'}, 500

# API Endpoint: Fetch a company by ID CSV Files
@ns.route('/<int:company_id>')
@ns.response(404, 'Company not found')
@ns.response(500, 'Internal Server Error')
class Company(Resource):
    def get(self, company_id):
        """Fetch a company by ID"""
        try:
            company = companies_df[companies_df['company_id'] == company_id]
            if company.empty:
                return {'error': 'Company not found'}, 404
            return company.to_dict(orient='records')[0]
        except Exception as e:
            app.logger.error(f"Error fetching company details: {e}")
            return {'error': 'Internal Server Error'}, 500

# API Endpoint: Fetch all locations for a specific company ID
@ns.route('/<int:company_id>/locations')
@ns.response(404, 'No locations found for this company')
@ns.response(500, 'Internal Server Error')
class CompanyLocations(Resource):
    def get(self, company_id):
        """Fetch all locations for a specific company ID"""
        try:
            locations = locations_df[locations_df['company_id'] == company_id]
            if locations.empty:
                return {'error': 'No locations found for this company'}, 404
            return locations.to_dict(orient='records')
        except Exception as e:
            app.logger.error(f"Error fetching locations: {e}")
            return {'error': 'Internal Server Error'}, 500

# Run the Flask application
if __name__ == '__main__':
    port = int(os.environ.get('FLASK_RUN_PORT', 5001))  # running on port 5001
    app.run(debug=True, host='0.0.0.0', port=port)
