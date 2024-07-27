import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';

// Styled component for text with shadow
const ShadowText = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontSize: '4rem',
  fontWeight: 'bold',
  margin: `${theme.spacing(6)} 0 ${theme.spacing(4)}`,
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
}));

// Styled component for card to ensure uniform height
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    margin: `${theme.spacing(2)} 0`,
  },
}));

const CompanyList = () => {
  const [companies, setCompanies] = useState([]); // State for storing all companies
  const [filteredCompanies, setFilteredCompanies] = useState([]); // State for storing filtered companies based on search
  const [displayMode, setDisplayMode] = useState('none'); // State for controlling display mode: 'none', 'list', or 'search'
  const [searchQuery, setSearchQuery] = useState(''); // State for storing the search query
  const [searchPerformed, setSearchPerformed] = useState(false); // State to track if a search has been performed
  const [textFieldFocused, setTextFieldFocused] = useState(false); // State to track if the search text field is focused

  // Fetch all companies when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5001/companies')
      .then(response => {
        setCompanies(response.data);
        setFilteredCompanies(response.data);
      })
      .catch(error => console.error('Error fetching companies:', error));
  }, []);

  // Handle search functionality
  const handleSearch = () => {
    if (searchQuery.trim()) {
      const filtered = companies.filter(company =>
        company.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCompanies(filtered);
    } else {
      setFilteredCompanies([]);
    }
    setSearchPerformed(true); // Mark that search has been performed
  };

  // Clear the search query and results
  const handleClear = () => {
    setSearchQuery('');
    setFilteredCompanies([]);
    setSearchPerformed(false); // Reset search status
  };

  // Handle the display mode change between 'list' and 'search'
  const handleDisplayModeChange = (mode) => {
    setDisplayMode(mode);
    if (mode === 'list') {
      setFilteredCompanies(companies);
      setSearchPerformed(false); // Reset search status when switching to list mode
    } else if (mode === 'search') {
      setFilteredCompanies([]); // Clear filtered companies initially
      setSearchPerformed(false); // Reset search status
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <ShadowText variant="h4" gutterBottom>Company Directory</ShadowText>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleDisplayModeChange('list')}
          style={{ marginRight: '10px' }}
        >
          Show Companies List
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleDisplayModeChange('search')}
        >
          Search Companies
        </Button>
      </div>

      {displayMode === 'list' && (
        <div style={{ marginTop: '20px' }}>
          <Grid container spacing={3}>
            {filteredCompanies.map(company => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={company.company_id}>
                <StyledCard>
                  <CardContent style={{ flex: 1 }}>
                    <Typography variant="h6">{company.name}</Typography>
                    <Typography variant="body2" color="textSecondary">{company.address}</Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      component={Link}
                      to={`/company/${company.company_id}`}
                      style={{ marginTop: '10px' }}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </div>
      )}

      {displayMode === 'search' && (
        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField
            label="Search by company name"
            variant="outlined"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onFocus={() => setTextFieldFocused(true)}
            onBlur={() => setTextFieldFocused(false)}
            style={{ marginBottom: '10px', width: '100%', maxWidth: '600px' }}
          />
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              style={{ marginRight: '10px' }}
            >
              Search
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClear}
            >
              Clear
            </Button>
          </div>
          <Grid container spacing={3} style={{ marginTop: '20px' }}>
            {filteredCompanies.length > 0 ? (
              filteredCompanies.map(company => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={company.company_id}>
                  <StyledCard>
                    <CardContent style={{ flex: 1 }}>
                      <Typography variant="h6">{company.name}</Typography>
                      <Typography variant="body2" color="textSecondary">{company.address}</Typography>
                      <Button
                        variant="outlined"
                        color="primary"
                        component={Link}
                        to={`/company/${company.company_id}`}
                        style={{ marginTop: '10px' }}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </StyledCard>
                </Grid>
              ))
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                {searchPerformed && !filteredCompanies.length && (
                  <Typography variant="body1" align="center">No companies found matching your search criteria.</Typography>
                )}
                {textFieldFocused && !searchPerformed && (
                  <Typography variant="body1" align="center">Enter a company name to find companies.</Typography>
                )}
              </div>
            )}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default CompanyList;
