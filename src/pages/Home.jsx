import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Card, CardContent, Typography, Grid, Container } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Home = () => {
  const [patientCount, setPatientCount] = useState(0);
  const [inventoryCount, setInventoryCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const patientsResponse = await axios.get('/api/patients');
        const inventoryResponse = await axios.get('/api/inventory');

        setPatientCount(patientsResponse.data.length);
        setInventoryCount(inventoryResponse.data.length);
      } catch (err) {
        setError('Failed to fetch dashboard data');
      }
    };

    fetchDashboardData();
  }, []);

  // Chart data for patients and inventory
  const chartData = {
    labels: ['Patients', 'Inventory'],
    datasets: [
      {
        label: 'Count',
        data: [patientCount, inventoryCount],
        backgroundColor: ['#007bff', '#28a745'],
        borderColor: ['#007bff', '#28a745'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Patients and Inventory Overview',
      },
    },
  };

  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Patients Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                Patients
              </Typography>
              <Typography variant="h4">{patientCount}</Typography>
              <Typography variant="body2" color="textSecondary">
                Total Patients
              </Typography>
              <Link to="/patients" style={{ textDecoration: 'none', color: '#007bff' }}>
                View Patients
              </Link>
            </CardContent>
          </Card>
        </Grid>

        {/* Inventory Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="success" gutterBottom>
                Inventory
              </Typography>
              <Typography variant="h4">{inventoryCount}</Typography>
              <Typography variant="body2" color="textSecondary">
                Total Inventory Items
              </Typography>
              <Link to="/inventory" style={{ textDecoration: 'none', color: '#28a745' }}>
                View Inventory
              </Link>
            </CardContent>
          </Card>
        </Grid>

        {/* Analytics Chart */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Analytics
              </Typography>
              <Bar data={chartData} options={chartOptions} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;