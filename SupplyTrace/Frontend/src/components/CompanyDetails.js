import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Container, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { styled } from '@mui/system';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

// Styled components for custom styling
const ShadowText = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontSize: '2rem',
  fontWeight: 'bold',
  margin: `${theme.spacing(6)} 0 ${theme.spacing(0)}`,
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
}));

const MapContainerStyled = styled(MapContainer)(({ theme }) => ({
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.4)',
  height: '400px',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    height: '300px',
  },
}));

// Leaflet marker icon configuration
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Component to fit map bounds based on markers
const FitBounds = ({ bounds }) => {
  const map = useMap();
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds);
    }
  }, [bounds, map]);
  return null;
};

const CompanyDetails = () => {
  const { id } = useParams(); // Extract company ID from URL
  const [company, setCompany] = useState(null); // State for company details
  const [locations, setLocations] = useState([]); // State for company locations
  const [mapBounds, setMapBounds] = useState(null); // State for map bounds
  const [selectedLocation, setSelectedLocation] = useState(null); // State for selected location on the map
  const [error, setError] = useState(null); // State for error handling

  // Fetch company details and locations on component mount
  useEffect(() => {
    axios.get(`http://localhost:5001/companies/${id}`)
      .then(response => setCompany(response.data))
      .catch(error => {
        console.error('Error fetching company details:', error);
        setError(error);
      });

    axios.get(`http://localhost:5001/companies/${id}/locations`)
      .then(response => {
        setLocations(response.data);
        const bounds = L.latLngBounds(response.data.map(loc => [loc.latitude, loc.longitude]));
        setMapBounds(bounds); // Set map bounds based on location data
      })
      .catch(error => {
        console.error('Error fetching locations:', error);
        setError(error);
      });
  }, [id]);

  if (error) return <div>Error loading data. Please check your network connection and try again.</div>;
  if (!company) return <div>Loading...</div>;

  // Prepare data for pie chart visualization
  const locationTypes = locations.reduce((acc, location) => {
    acc[location.type] = (acc[location.type] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(locationTypes).map(([type, count]) => ({
    name: type,
    value: count
  }));

  return (
    <Container style={{ padding: '20px' }}>
      <ShadowText variant="h4" gutterBottom>
        {company.name}
      </ShadowText>
      <Typography variant="h6" align="center" color="textSecondary" paragraph>
        {selectedLocation ? selectedLocation.address : company.address}
      </Typography>

      <Grid container spacing={3} justifyContent="center" style={{ marginBottom: '20px' }}>
        <Grid item xs={12} md={6}>
          <MapContainerStyled center={[company.latitude, company.longitude]} zoom={13}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locations.map(location => (
              <Marker 
                key={location.location_id} 
                position={[location.latitude, location.longitude]}
                eventHandlers={{
                  click: () => setSelectedLocation(location) // Update selected location on marker click
                }}
              >
                <Popup>{location.name}</Popup>
              </Marker>
            ))}
            <FitBounds bounds={mapBounds} />
          </MapContainerStyled>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent style={{ padding: 0, height: '400px', width: '100%', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.4)' }}>
              <Typography variant="h5" gutterBottom textAlign={'center'} paddingTop={2}>
                Location Types Distribution
              </Typography>
              <PieChart width={600} height={300}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Button variant="contained" color="primary" onClick={() => window.history.back()} style={{ display: 'block', margin: '0 auto' }}>
        Back to List
      </Button>
    </Container>
  );
};

export default CompanyDetails;
