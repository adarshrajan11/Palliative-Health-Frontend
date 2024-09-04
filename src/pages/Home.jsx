import React, { useState, useEffect } from 'react'
import axios from '../services/api'
import { Link } from 'react-router-dom'
import styles from './pagestyles/Home.module.css'

const Home = () => {
  const [patientCount, setPatientCount] = useState(0)
  const [inventoryCount, setInventoryCount] = useState(0)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const patientsResponse = await axios.get('/api/patients')
        const inventoryResponse = await axios.get('/api/inventory')

        setPatientCount(patientsResponse.data.length)
        setInventoryCount(inventoryResponse.data.length)
      } catch (err) {
        setError('Failed to fetch dashboard data')
      }
    }

    fetchDashboardData()
  }, [])

  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div className={styles.container}>
      <div className={styles.dashboard}>
        <h2>Dashboard</h2>

        <div className={styles.section}>
          <h3>Patients</h3>
          <p>Total Patients: {patientCount}</p>
          <Link to='/patients'>View Patients</Link>
        </div>

        <div className={styles.section}>
          <h3>Inventory</h3>
          <p>Total Inventory Items: {inventoryCount}</p>
          <Link to='/inventory'>View Inventory</Link>
        </div>
      </div>
    </div>
  )
}

export default Home
