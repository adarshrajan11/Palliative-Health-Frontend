// src/pages/Patients.js

import React, { useState, useEffect } from 'react'
import axios from '../services/api'
import styles from './pagestyles/Patients.module.css'

const Patients = () => {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('/api/patients')
        setPatients(response.data)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch patients')
        setLoading(false)
      }
    }

    fetchPatients()
  }, [])

  if (loading) return <p>Loading patients...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Patient List</h2>
      <ul className={styles.list}>
        {patients.map((patient) => (
          <li key={patient.id} className={styles.listItem}>
            {patient.name} - {patient.age} years old - {patient.condition}
            <p>{patient.homeCareDate}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Patients
