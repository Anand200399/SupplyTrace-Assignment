import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CompanyList from './components/CompanyList';
import CompanyDetails from './components/CompanyDetails';

function App() {
  return (
    // Set up routing for the application
    <Router>
      <Routes>
        {/* Route for the home page displaying the list of companies */}
        <Route path="/" element={<CompanyList />} />
        
        {/* Route for displaying details of a specific company based on its ID */}
        <Route path="/company/:id" element={<CompanyDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
